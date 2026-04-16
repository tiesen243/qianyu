import gc
import time

import machine  # pyright: ignore[reportMissingModuleSource]
import network  # pyright: ignore[reportMissingModuleSource]
import urequests  # pyright: ignore[reportMissingModuleSource]

WIFI_SSID = ""
WIFI_PASSWORD = ""
API_URL = "http://qianyu-api-prod.tiesen.workers.dev"

# Setup LED (NodeMCU chân 2 là LED_BUILTIN, Active Low)
led = machine.Pin(2, machine.Pin.OUT)
led.value(1)  # Tắt LED


def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Connecting to WiFi...", end="")
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)  # pyright: ignore[reportUnknownMemberType]
        while not wlan.isconnected():
            print(".", end="")
            time.sleep(0.5)

    print("\nWiFi Connected! IP:", wlan.ifconfig())  # pyright: ignore[reportUnknownMemberType, reportUnknownArgumentType]


def handle_data(data: str) -> None:
    """Xử lý nội dung nhận được từ SSE"""
    msg = data.strip()
    print("Event Data:", msg)

    if msg == "LED_ON":
        led.value(0)  # Bật
    elif msg == "LED_OFF":
        led.value(1)  # Tắt


def start_sse():
    while True:
        _ = gc.collect()
        print(
            "\n[SSE] Connecting to Stream (Free RAM: {} bytes)".format(gc.mem_free())  # pyright: ignore[reportUnknownMemberType, reportUnknownArgumentType, reportAttributeAccessIssue]
        )

        resp = None
        try:
            headers = {
                "Accept": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
            resp = urequests.get(  # pyright: ignore[reportUnknownVariableType, reportUnknownMemberType]
                API_URL + "/api/v1/sse", headers=headers, stream=True, timeout=60
            )

            if resp.status_code == 200:  # pyright: ignore[reportUnknownMemberType]
                print("[SSE] Connection Established!")

                while True:
                    line: str | bytes = resp.raw.readline()  # pyright: ignore[reportUnknownMemberType, reportUnknownVariableType]
                    if not line:
                        print("[SSE] Connection closed by server.")
                        break

                    if isinstance(line, bytes):
                        line = line.decode("utf-8").strip()

                    if isinstance(line, str) and line.startswith("data:"):
                        content = line[5:].strip()
                        if content and content != "keep-alive":
                            handle_data(content)

                    _ = gc.collect()
            else:
                print("[SSE] Server rejected connection. Status:", resp.status_code)  # pyright: ignore[reportUnknownMemberType, reportUnknownArgumentType]

        except Exception as e:
            print("[SSE] Error during streaming:", e)

        finally:
            if resp:
                resp.close()

        print("[SSE] Reconnecting in 5 seconds...")
        time.sleep(5)


def main():
    connect_wifi()
    # Nghỉ một chút để Network Stack ổn định
    time.sleep(2)
    start_sse()


if __name__ == "__main__":
    main()
