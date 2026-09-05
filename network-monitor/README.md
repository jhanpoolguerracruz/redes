# Network Monitor

Herramienta simple en Python para monitorear la disponibilidad de hosts en una red
(routers, gateways, servidores, DNS, etc.) mediante ping periódico.

## Características
- Ping automático a una lista configurable de hosts.
- Registro con marca de tiempo en consola y en archivo de log.
- Configuración simple en `config.py` (hosts a monitorear e intervalo).

## Requisitos
- Python 3.8+
- No requiere librerías externas (usa el comando `ping` del sistema operativo).

## Uso
```bash
python monitor.py
```

Edita `config.py` para agregar tus propios hosts/IPs y ajustar el intervalo de chequeo.

## Ideas para extender
- Enviar una alerta (correo, Telegram, WhatsApp) cuando un host se caiga.
- Guardar resultados en una base de datos para graficar disponibilidad histórica.
- Agregar chequeo de puertos específicos además del ping.

## Sobre este proyecto
Herramienta pensada como ejercicio práctico de monitoreo de red / infraestructura,
útil para portafolio de perfiles de telecomunicaciones y soporte de redes.
