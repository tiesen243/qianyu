#include <Arduino_JSON.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include "config.h"

WiFiClient client, *stream;
HTTPClient http;
int httpCode;
JSONVar body;

void handleData(String data);

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

  http.begin(client, API_URL + "/api/v1/sse");
  http.addHeader("Accept", "text/event-stream");
  http.setTimeout(20000);
  httpCode = http.GET();

  if (httpCode > 0) {
    stream = http.getStreamPtr();
    Serial.println("SSE connected!");
  } else Serial.printf("SSE HTTP error: %d\n", httpCode);
}

void loop() {
  if (http.connected() && stream->available()) {
    String line = stream->readStringUntil('\n');
    line.trim();

    if (line.startsWith("data:")) {
      String data = line.substring(5);
      data.trim();

      if (data != "keep-alive") handleData(data);
    }
  }
}

void handleData(String data) {
  if (data == "LED_ON")
    digitalWrite(LED_BUILTIN, LOW);
  else if (data == "LED_OFF")
    digitalWrite(LED_BUILTIN, HIGH);
}
