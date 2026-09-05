# Port Scanner (educativo)

Escáner de puertos TCP básico escrito en Python, hecho como ejercicio de
aprendizaje sobre redes, sockets y fundamentos de ciberseguridad.

## ⚠️ Uso responsable
Este proyecto es solo para fines educativos. Úsalo únicamente en:
- Equipos/redes de tu propiedad, o
- Entornos donde tengas autorización explícita para realizar pruebas.

Escanear redes de terceros sin permiso puede ser ilegal.

## Requisitos
- Python 3.8+ (usa solo librerías estándar).

## Uso
```bash
python scanner.py <host> <puerto_inicio> <puerto_fin>
```

Ejemplo (escanear tu propia máquina):
```bash
python scanner.py 127.0.0.1 1 1024
```

## Cómo funciona
Intenta abrir una conexión TCP a cada puerto en el rango indicado. Si la
conexión se establece, el puerto se marca como abierto.

## Ideas para extender
- Agregar detección básica de servicio (banner grabbing) en puertos abiertos.
- Exportar resultados a un archivo CSV o JSON.
- Escaneo multihilo para mayor velocidad en rangos grandes.

## Sobre este proyecto
Ejercicio práctico orientado a mostrar fundamentos de ciberseguridad y
redes en un portafolio técnico.
