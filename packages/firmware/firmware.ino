#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

#include "config.h"

WiFiClientSecure client;
WiFiClient *stream;
HTTPClient http;
int httpCode, attempts;

void handleData(String data);
bool connectSSE();

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  delay(2000);

  pinMode(LED_BUILTIN, OUTPUT);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected!");
  
  client.setInsecure();
  connectSSE();
}

void loop() {
  if (http.connected()) {
    if (stream && stream->available()) {
      String line = stream->readStringUntil('\n');
      line.trim();

      if (line.startsWith("data:")) {
        String data = line.substring(5);
        data.trim();

        if (data != "keep-alive") handleData(data);
      }
    }
  } else {
    Serial.println("SSE connection lost. Reconnecting...");
    
    while (attempts < 3 && !connectSSE()) {
      attempts++;
      delay(5000); // wait 5 seconds between attempts
    }
    
    if (attempts >= 3) {
      Serial.println("Failed to reconnect 3 times. Restarting ESP...");
      ESP.restart();
    }
  }
}

void handleData(String data) {
  if (data == "LED_ON")
    digitalWrite(LED_BUILTIN, LOW);
  else if (data == "LED_OFF")
    digitalWrite(LED_BUILTIN, HIGH);
}

bool connectSSE() {
  http.end();

  Serial.println("Connecting to SSE...");
  http.begin(client, API_URL + "/api/v1/sse");
  http.addHeader("Accept", "text/event-stream");
  http.addHeader("Cache-Control", "no-cache");
  http.addHeader("Connection", "keep-alive");
  http.setTimeout(35000);
  httpCode = http.GET();

  if (httpCode > 0) {
    stream = http.getStreamPtr();
    Serial.println("SSE connected!");
    return true;
  }
  
  Serial.printf("SSE HTTP error: %d\n", httpCode);
  return false;
}
