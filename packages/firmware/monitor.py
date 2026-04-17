from typing import ClassVar, cast, override

import serial
from textual import work
from textual.app import App, ComposeResult
from textual.containers import Container, Horizontal, Vertical
from textual.widgets import Button, Footer, Header, Input, RichLog


class SerialMonitorApp(App[None]):
    TITLE: str | None = "Serial Monitor Pro"

    CSS: ClassVar[str] = """
    #connection_bar {
        height: auto;
        background: $boost;
        padding: 1 5 1 0;
    }

    .input_box {
        width: 1fr;
        margin-right: 1;
        height: 3;
    }

    #btn_connect {
        margin-right: 1;
        background: #3f5ec2;
        color: #eff6ff;
        width: 20;
        height: 3;
        text-style: bold;
        border: none;
    }

    #btn_disconnect {
        background: #df2225;
        color: #eff6ff;
        width: 20;
        height: 3;
        text-style: bold;
        border: none;
    }

    #log_container {
        height: 1fr;
        border: tall #3f5ec2;
        background: $surface;
    }

    #serial_log {
        height: 1fr;
        padding: 0 1;
    }

    #command_input {
        margin: 0 4 0 0;
        height: 3;
        border: solid #3f5ec2;
    }
    """

    BINDINGS = [  # pyright: ignore[reportUnannotatedClassAttribute]
        ("q", "quit", "Exit"),
        ("c", "clear", "Clear Log"),
        ("d", "toggle_dark", "Mode"),
    ]

    def __init__(self):
        super().__init__()
        self.serial_port: serial.Serial | None = None
        self.keep_reading: bool = False

    @override
    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)

        with Horizontal(id="connection_bar"):
            yield Input(placeholder="Port", id="port_input", classes="input_box")
            yield Input(
                placeholder="Baudrate",
                id="baud_input",
                classes="input_box",
                value="115200",
            )
            yield Button("CONNECT", id="btn_connect")
            yield Button("DISCONNECT", id="btn_disconnect", disabled=True)

        with Vertical(id="main_container"):
            with Container(id="log_container"):
                yield RichLog(highlight=True, markup=True, id="serial_log")
            yield Input(
                placeholder="Connect first to send commands...",
                id="command_input",
                disabled=True,
            )

        yield Footer()

    def on_mount(self) -> None:
        self.serial_output = self.query_one("#serial_log")  # pyright: ignore[reportUnannotatedClassAttribute, reportUninitializedInstanceVariable]
        self.serial_port = None
        self.keep_reading = False

    async def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "btn_connect":
            await self.connect_serial()
        elif event.button.id == "btn_disconnect":
            self.disconnect_serial()

    async def connect_serial(self) -> None:
        port = self.query_one("#port_input").value  # pyright: ignore[reportUnknownMemberType, reportUnknownVariableType, reportAttributeAccessIssue]
        baud = self.query_one("#baud_input").value  # pyright: ignore[reportUnknownMemberType, reportUnknownVariableType, reportAttributeAccessIssue]

        try:
            self.serial_port = serial.Serial(
                cast(str, port), cast(int, baud), timeout=0.1
            )
            self.keep_reading = True

            # Cập nhật trạng thái UI
            self.query_one("#port_input").disabled = True
            self.query_one("#baud_input").disabled = True
            self.query_one("#btn_connect").disabled = True

            cmd_in = self.query_one("#command_input")
            cmd_in.disabled = False
            cmd_in.placeholder = "Enter command here..."  # pyright: ignore[reportAttributeAccessIssue]
            self.query_one("#btn_disconnect").disabled = False

            self.serial_output.write("[bold #3f5ec2]SYSTEM:[/] Connected to " + port)  # pyright: ignore[reportUnknownMemberType, reportAttributeAccessIssue]
            _ = self.read_data()
        except Exception as e:
            self.serial_output.write(f"[bold #df2225]Error: {e}[/]")  # pyright: ignore[reportUnknownMemberType, reportAttributeAccessIssue]

    def disconnect_serial(self) -> None:
        self.keep_reading = False
        if self.serial_port and self.serial_port.is_open:
            self.serial_port.close()

        self.query_one("#port_input").disabled = False
        self.query_one("#baud_input").disabled = False
        self.query_one("#btn_connect").disabled = False

        cmd_in = self.query_one("#command_input")
        cmd_in.disabled = True
        cmd_in.value = ""  # pyright: ignore[reportAttributeAccessIssue]
        cmd_in.placeholder = "Connect first to send commands..."  # pyright: ignore[reportAttributeAccessIssue]

        self.query_one("#btn_disconnect").disabled = True
        self.serial_output.write("[bold #888888]SYSTEM: Disconnected.[/]")  # pyright: ignore[reportUnknownMemberType, reportAttributeAccessIssue]

    @work(thread=True)
    def read_data(self) -> None:
        while self.keep_reading:
            if self.serial_port and self.serial_port.is_open:
                try:
                    if self.serial_port.in_waiting > 0:
                        line = (
                            self.serial_port.readline()
                            .decode("utf-8", errors="replace")
                            .strip()
                        )
                        if line:
                            self.call_from_thread(
                                self.serial_output.write,  # pyright: ignore[reportUnknownMemberType, reportUnknownArgumentType, reportAttributeAccessIssue]
                                f"[bold #3f5ec2]RX ←[/] {line}",
                            )
                except Exception:
                    break

    async def on_input_submitted(self, event: Input.Submitted) -> None:
        if event.input.id == "command_input" and self.serial_port:
            cmd = event.value
            if cmd:
                _ = self.serial_port.write(f"{cmd}\n".encode())
                self.serial_output.write(f"[bold #6a7ccd]TX →[/] {cmd}")  # pyright: ignore[reportUnknownMemberType, reportAttributeAccessIssue]
                event.input.value = ""

    def action_clear(self) -> None:
        self.serial_output.clear()  # pyright: ignore[reportUnknownMemberType, reportAttributeAccessIssue]


if __name__ == "__main__":
    app = SerialMonitorApp()
    app.run()
