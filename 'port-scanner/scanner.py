"""
Port Scanner (educativo)
-------------------------
Escanea un rango de puertos TCP en un host para identificar cuáles están
abiertos. Pensado como ejercicio de aprendizaje sobre sockets y redes.

IMPORTANTE: Úsalo solo contra equipos/redes de tu propiedad o con permiso
explícito. Escanear redes ajenas sin autorización puede ser ilegal.

Uso:
    python scanner.py <host> <puerto_inicio> <puerto_fin>

Ejemplo:
    python scanner.py 127.0.0.1 1 1024
"""

import socket
import sys
from datetime import datetime


def scan_port(host: str, port: int, timeout: float = 0.5) -> bool:
    """Devuelve True si el puerto TCP está abierto."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(timeout)
        result = sock.connect_ex((host, port))
        return result == 0


def main():
    if len(sys.argv) != 4:
        print("Uso: python scanner.py <host> <puerto_inicio> <puerto_fin>")
        sys.exit(1)

    host = sys.argv[1]
    start_port = int(sys.argv[2])
    end_port = int(sys.argv[3])

    print(f"Escaneando {host} desde el puerto {start_port} hasta {end_port}...")
    print(f"Inicio: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    open_ports = []
    for port in range(start_port, end_port + 1):
        if scan_port(host, port):
            print(f"Puerto {port}: ABIERTO")
            open_ports.append(port)

    print(f"\nEscaneo completo. Puertos abiertos: {open_ports if open_ports else 'ninguno'}")


if __name__ == "__main__":
    main()
