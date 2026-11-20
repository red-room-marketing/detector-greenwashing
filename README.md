<p align="center">
  <a href="https://redroom.es/"><img src="assets/img/redroom-logo.png" alt="Red Room®" width="280"></a>
</p>

# Detector de greenwashing

**Directiva (UE) 2024/825 · Herramienta gratuita y abierta de [Red Room®](https://redroom.es/)**

Desde el 27 de septiembre de 2026, llamar «ecológico», «sostenible» o «neutro en carbono» a un producto sin poder demostrarlo es una práctica desleal. Pega tu texto y el detector te dice qué frases sobran, por qué y cómo decirlo con datos.

**Pruébalo:** <https://red-room-marketing.github.io/marketingetico/>

Tu texto no sale de tu navegador: no se guarda ni se envía a ningún servidor.

## Índice

- [Por qué ahora](#por-qué-ahora)
- [Para quién es](#para-quién-es)
- [Qué detecta](#qué-detecta)
- [Cómo se usa](#cómo-se-usa)
- [Limitaciones](#limitaciones)
- [Créditos y licencia](#créditos-y-licencia)
- [Contribuir](#contribuir)

## Por qué ahora

La Directiva (UE) 2024/825 se aplica desde el **27 de septiembre de 2026** a cualquier empresa que venda a consumidores, sea cual sea su tamaño. Esto es lo que cambia:

1. **Ya no hace falta demostrar el engaño.** Las nuevas prácticas entran en la lista negra de la normativa de competencia desleal. Basta con usar la frase.
2. **Adiós a «eco», «verde» y «sostenible».** Si no concretas el beneficio y no puedes demostrarlo, no puedes decirlo.
3. **Compensar no es reducir.** Comprar créditos de carbono ya no permite anunciar un producto «neutro en carbono». Solo cuentan las reducciones reales.
4. **Tu competencia puede reclamar.** Competidores, asociaciones de consumidores y autoridades de consumo pueden actuar contra una afirmación que no puedas probar. La Ley de Competencia Desleal ya lo permite hoy.
5. **Cuenta todo lo que publicas.** La web, el envase, la publicidad, el material comercial y las redes sociales de la marca y de quien habla en su nombre.
6. **Callar no es la solución.** Dejar de comunicar (*greenhushing*) regala el terreno a quien exagera. La salida es cambiar adjetivos por datos.

Todo el detalle, con una tabla de frases y alternativas, en el artículo [Directiva 2024/825: las afirmaciones ambientales que ya no puedes usar en tu publicidad](https://redroom.es/directiva-2024-825-afirmaciones-ambientales/).

## Para quién es

Para quien firma lo que se publica.

| Perfil | Para qué |
|---|---|
| Agencias de marketing y comunicación | Revisar una campaña antes de entregarla a un cliente de alimentación, moda, cosmética, energía, movilidad, construcción o turismo. |
| Departamentos de marketing y comunicación | Revisar la web, las fichas de producto, los envases, las campañas y las notas de prensa antes de publicarlas. |
| Sostenibilidad y ESG | Que lo que la empresa cuenta fuera coincida con lo que puede demostrar. |
| Dirección de empresas con impacto ambiental | Saber qué mensajes de la marca son un riesgo y cuáles revisar primero. |
| Portavoces y directivos en LinkedIn | Revisar lo que publican como cara visible de la marca. |
| Prensa, consultoría y formación | Analizar anuncios, asesorar a clientes o explicar la norma con ejemplos reales. |

## Qué detecta

Seis tipos de greenwashing que la directiva prohíbe o limita:

| Tipo | Ejemplos | Base legal |
|---|---|---|
| Afirmaciones genéricas | «ecológico», «verde», «sostenible» | Directiva 2005/29/CE, anexo I, punto 4 bis |
| Neutralidad por compensación | «neutro en carbono», «positivo para el clima» | Anexo I, punto 4 quater |
| La parte por el todo | «somos una marca sostenible» | Anexo I, punto 4 ter |
| Promesas de futuro | «cero emisiones en 2040» | Artículo 6, apartado 2, letra d) |
| Sellos propios | «nuestro sello verde» | Anexo I, punto 2 bis |
| Presumir de lo obligatorio | «sin CFC» | Anexo I, punto 10 bis |

Todos estos puntos los añade la Directiva (UE) 2024/825 a la Directiva 2005/29/CE de prácticas comerciales desleales.

Cada frase detectada tiene un nivel de riesgo:

- **Alto:** encaja en una práctica prohibida, salvo que se cumplan requisitos estrictos.
- **Medio:** depende del contexto. Puede ser lícita si se concreta y se demuestra, o ser un falso positivo, como «verde» referido a un color.

## Cómo se usa

### En el navegador

Abre <https://red-room-marketing.github.io/marketingetico/> y pega tu texto. El resultado aparece mientras escribes.

### En la línea de comandos

Necesita Node.js 18 o posterior.

```bash
git clone https://github.com/red-room-marketing/marketingetico.git
cd marketingetico
node bin/comprobar.js mi-web.html textos/envase.txt
echo "Nuestro café es neutro en carbono" | node bin/comprobar.js
```

| Opción | Efecto |
|---|---|
| `--json` | Devuelve el resultado en JSON. |
| `--estricto` | Termina con error también si hay frases de riesgo medio. |

Si encuentra alguna frase de riesgo alto, termina con código 1. Así puedes usarlo en integración continua para revisar los textos de una web antes de publicarlos.

### Como librería

```js
const { comprobar, resumen } = require('./src/comprobador.js');
const datos = require('./datos/afirmaciones.json');

const avisos = comprobar('Envase ecológico y 100 % sostenible', datos);
console.log(resumen(avisos)); // { total: 2, alto: 2, medio: 0 }
```

### Qué hay en el repositorio

| Ruta | Contenido |
|---|---|
| [`datos/afirmaciones.json`](datos/afirmaciones.json) | Frases, patrones, tipo, riesgo, motivo, alternativa y base legal. |
| [`datos/afirmaciones.csv`](datos/afirmaciones.csv) | Los mismos datos en CSV. |
| [`src/comprobador.js`](src/comprobador.js) | Motor de detección sin dependencias, para Node.js y navegador. |
| [`bin/comprobar.js`](bin/comprobar.js) | Herramienta de línea de comandos. |
| [`index.html`](index.html) | La web del detector. |

## Limitaciones

- Es una herramienta orientativa y **no sustituye al asesoramiento jurídico**.
- Detecta expresiones, no interpreta el contexto. Puede equivocarse en los dos sentidos.
- Que no detecte nada no significa que un texto sea legal: cada dato ambiental tiene que poder demostrarse.
- La transposición de la directiva en cada país puede añadir requisitos propios.

## Créditos y licencia

Abierto, con una condición. Úsalo, cópialo, adáptalo o intégralo en tus herramientas, también con fines comerciales.

> **La condición:** cita a Red Room® como autor, con un enlace a [redroom.es](https://redroom.es/), en cualquier uso, copia o adaptación. Así:
>
> *Fuente: «Detector de greenwashing», de Red Room® (https://redroom.es). Licencia CC BY 4.0.*

| Parte | Licencia |
|---|---|
| Datos (`datos/`) y textos explicativos | [CC BY 4.0](LICENCIA-DATOS.md) |
| Código (`src/`, `bin/`, `scripts/`, `test/`, `index.html`) | [MIT](LICENSE). El aviso de autoría, que incluye a Red Room® y redroom.es, debe conservarse en todas las copias. |
| Logotipo e ilustraciones (`assets/img/`) | Propiedad de Red Room®. No forman parte de las licencias abiertas. |
| Fuentes (`assets/fuentes/`) | Roboto Condensed y Lora, con licencia [SIL Open Font License 1.1](assets/fuentes/). |

¿Lo usas en un artículo, una formación o un proyecto? Cuéntanoslo desde [redroom.es](https://redroom.es/contacto/).

## Contribuir

¿Echas en falta una frase o has encontrado un falso positivo? Consulta [CONTRIBUIR.md](CONTRIBUIR.md).

```bash
npm test      # pruebas y comprobación de que el CSV está al día
npm run csv   # regenera datos/afirmaciones.csv a partir del JSON
```
