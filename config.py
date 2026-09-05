# Lista de hosts o IPs a monitorear (routers, gateways, servidores, etc.)
HOSTS = [
    "8.8.8.8",        # Google DNS (ejemplo)
    "1.1.1.1",        # Cloudflare DNS (ejemplo)
    "192.168.1.1",    # Ejemplo de gateway local, cámbialo por tu red
]

# Intervalo entre rondas de chequeo (en segundos)
INTERVAL_SECONDS = 30

# Archivo donde se guarda el historial
LOG_FILE = "network_log.txt"
