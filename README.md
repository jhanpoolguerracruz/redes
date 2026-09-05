# Subnet Calculator

Calculadora de subredes IPv4 construida con **HTML, CSS y JavaScript puro** (sin frameworks ni librerías externas).

## ¿Qué hace?

A partir de una dirección IP y un prefijo CIDR (ej. `192.168.1.0 /24`), calcula:

- Dirección de red
- Máscara de subred
- Wildcard mask
- Dirección de broadcast
- Primer y último host utilizable
- Cantidad de hosts utilizables
- Clase de la dirección (A, B, C, D, E)

También incluye una visualización binaria de los 32 bits de la dirección IP, diferenciando los bits de red y los bits de host según el prefijo CIDR seleccionado.

## Motivación

Este proyecto combina conocimientos de **redes y telecomunicaciones** con **desarrollo web**, aplicando en código un cálculo que normalmente se hace manualmente en el día a día de soporte y configuración de redes (NOC, ISP, redes corporativas).

## Tecnologías

- HTML5
- CSS3 (diseño responsive, sin frameworks)
- JavaScript (vanilla, manipulación de bits con operadores bitwise)

## Cómo usarlo

Solo abre `index.html` en cualquier navegador. No requiere instalación ni build.

```bash
git clone https://github.com/TU_USUARIO/subnet-calculator.git
cd subnet-calculator
open index.html   # o doble clic en el archivo
```

## Autor

Jhan Pool Guerra — Especialista en Infraestructura de Redes
