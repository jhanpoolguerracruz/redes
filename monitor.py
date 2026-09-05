"""
Network Monitor
----------------
Hace ping periódico a una lista de hosts/IPs (routers, servidores, gateways)
y genera un log con el estado (arriba/abajo) y el tiempo de respuesta.
Útil para monitoreo básico de disponibilidad en redes.

Uso:
    python monitor.py

Configura la lista de hosts y el intervalo en config.py
"""

import subprocess
import platform
import time
from datetime import datetime
from config import HOSTS, INTERVAL_SECONDS, LOG_FILE


def ping_host(host: str) -> tuple[bool, str]:
    """Hace ping a un host y devuelve (esta_arriba, detalle)."""
    param = "-n" if platform.system().lower() == "windows" else "-c"
    command = ["ping", param, "1", "-w", "2000", host] if platform.system().lower() == "windows" \
        else ["ping", param, "1", "-W", "2", host]

    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=5)
        is_up = result.returncode == 0
        detail = "OK" if is_up else "Sin respuesta"
        return is_up, detail
    except Exception as e:
        return False, str(e)


def log_line(line: str):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    full_line = f"[{timestamp}] {line}"
    print(full_line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(full_line + "\n")


def main():
    log_line("=== Iniciando monitoreo de red ===")
    log_line(f"Hosts monitoreados: {', '.join(HOSTS)}")

    try:
        while True:
            for host in HOSTS:
                is_up, detail = ping_host(host)
                estado = "ACTIVO" if is_up else "CAÍDO"
                log_line(f"{host:<20} -> {estado} ({detail})")
            time.sleep(INTERVAL_SECONDS)
    except KeyboardInterrupt:
        log_line("=== Monitoreo detenido por el usuario ===")


if __name__ == "__main__":
    main()
