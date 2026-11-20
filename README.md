# Comprobador de reclamos ambientales (Directiva 2024/825)

Herramienta abierta y en español que detecta en un texto las afirmaciones ambientales que la **Directiva (UE) 2024/825** prohíbe o restringe: «ecológico», «verde», «sostenible», «neutro en carbono», «100 % sostenible», «cero emisiones en 2040», sellos propios… Para cada una explica por qué es un problema, propone una alternativa defendible y cita la base legal.

**Pruébala en el navegador:** <https://nachomegran.github.io/marketingetico/>

El texto se revisa en tu navegador y no se envía a ningún servidor.

Creada por [Red Room®](https://redroom.es/), agencia de marketing ético.

## Por qué existe

Desde el **27 de septiembre de 2026**, la Directiva (UE) 2024/825, conocida como directiva de empoderamiento de los consumidores para la transición ecológica, añade a la lista negra de prácticas comerciales desleales:

- Las **afirmaciones ambientales genéricas** («respetuoso con el medio ambiente», «ecológico», «verde») sin un comportamiento medioambiental excelente reconocido.
- Las afirmaciones de **neutralidad o impacto reducido en emisiones basadas en la compensación** (créditos de carbono).
- Atribuir al **producto o a la empresa entera** un beneficio que afecta solo a una parte.
- Los **sellos de sostenibilidad** que no proceden de un sistema de certificación ni de una autoridad pública.
- Presentar como ventaja propia un **requisito legal** común a todos los productos.

Además, los **compromisos de futuro** («neutros en 2030») solo son lícitos con un plan detallado, objetivos verificables y supervisión de un experto independiente.

La explicación completa, con una tabla de alternativas, está en el artículo [Directiva 2024/825: las afirmaciones ambientales que ya no puedes usar en tu publicidad](https://redroom.es/directiva-2024-825-afirmaciones-ambientales/).

## Qué contiene

| Ruta | Contenido |
|---|---|
| [`datos/reclamos.json`](datos/reclamos.json) | Lista de reclamos: patrones, categoría, riesgo, motivo, alternativa y base legal |
| [`datos/reclamos.csv`](datos/reclamos.csv) | Los mismos datos en CSV, para hojas de cálculo |
| [`src/comprobador.js`](src/comprobador.js) | Motor de detección sin dependencias, para Node.js y navegador |
| [`bin/comprobar.js`](bin/comprobar.js) | Herramienta de línea de comandos |
| [`index.html`](index.html) | Página web del comprobador |

## Uso

### En el navegador

Abre <https://nachomegran.github.io/marketingetico/>, pega el texto y revisa los avisos.

### En la línea de comandos

Necesita Node.js 18 o posterior.

```bash
git clone https://github.com/NachoMeGran/marketingetico.git
cd marketingetico
node bin/comprobar.js mi-web.html textos/envase.txt
echo "Nuestro café es neutro en carbono" | node bin/comprobar.js
```

Opciones:

- `--json`: salida en JSON.
- `--estricto`: termina con error también si hay avisos de riesgo medio.

Termina con código 1 si encuentra algún aviso de riesgo alto, así que puede usarse en integración continua para revisar los textos de una web antes de publicarlos.

### Como librería

```js
const { comprobar, resumen } = require('./src/comprobador.js');
const datos = require('./datos/reclamos.json');

const avisos = comprobar('Envase ecológico y 100 % sostenible', datos);
// [{ id: 'ecologico', riesgo: 'alto', texto: 'ecológico', motivo: '…', alternativa: '…', base: '…', inicio, fin }, …]
console.log(resumen(avisos)); // { total: 2, alto: 2, medio: 0 }
```

## Niveles de riesgo

- **Alto:** la expresión encaja en una práctica prohibida salvo que se cumplan requisitos estrictos.
- **Medio:** depende del contexto. Puede ser lícita si se concreta y se demuestra, o un falso positivo (por ejemplo, «verde» como color).

## Limitaciones

- Es una lista orientativa: **no sustituye al asesoramiento jurídico**.
- Busca expresiones, no interpreta el contexto. Puede dar falsos positivos y no detecta todas las afirmaciones engañosas.
- Que no aparezca ningún aviso no significa que un texto sea lícito: cada dato ambiental debe poder demostrarse.
- La transposición de la directiva en cada Estado miembro puede añadir requisitos propios.

## Contribuir

Las propuestas de nuevas expresiones, exclusiones o correcciones son bienvenidas. Lee [CONTRIBUIR.md](CONTRIBUIR.md).

```bash
npm test      # pruebas y comprobación de que el CSV está al día
npm run csv   # regenera datos/reclamos.csv a partir del JSON
```

## Licencia y cómo citar

- **Código:** [MIT](LICENSE).
- **Datos** (`datos/`) y textos explicativos: [CC BY 4.0](LICENCIA-DATOS.md). Puedes usarlos, adaptarlos y publicarlos, también con fines comerciales, siempre que cites la fuente:

> Fuente: «Comprobador de reclamos ambientales (Directiva 2024/825)», Red Room® (https://redroom.es), CC BY 4.0.

Si lo usas en un artículo, una formación o un proyecto, nos encantará saberlo.
