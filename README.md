<p align="center">
  <a href="https://redroom.es/"><img src="assets/img/redroom-logo.png" alt="Red Room®" width="280"></a>
</p>

# Comprobador de reclamos ambientales

**Directiva (UE) 2024/825 · Herramienta abierta de [Red Room®](https://redroom.es/)**

El comprobador revisa un texto en español y señala las expresiones ambientales que la Directiva (UE) 2024/825 prohíbe o limita, como «ecológico», «neutro en carbono», «100 % sostenible», «cero emisiones en 2040» o los sellos propios. Para cada una indica el motivo, una alternativa basada en datos y el artículo de la norma que la regula.

**Úsalo en el navegador:** <https://red-room-marketing.github.io/marketingetico/>

El texto se analiza en el propio navegador. No se guarda ni se envía a ningún servidor.

## Índice

- [Por qué importa ahora](#por-qué-importa-ahora)
- [Para quién es útil](#para-quién-es-útil)
- [Qué revisa](#qué-revisa)
- [Cómo se usa](#cómo-se-usa)
- [Limitaciones](#limitaciones)
- [Créditos y licencia](#créditos-y-licencia)
- [Contribuir](#contribuir)

## Por qué importa ahora

La Directiva (UE) 2024/825 se aplica desde el **27 de septiembre de 2026** a cualquier empresa que se dirija a consumidores, sea cual sea su tamaño.

1. **Lista negra, sin análisis caso a caso.** Las nuevas prácticas se consideran desleales en cualquier circunstancia. No hay que demostrar que una frase ha engañado a alguien: basta con haberla usado.
2. **Las expresiones más habituales dejan de valer.** «Ecológico», «sostenible», «respetuoso con el medio ambiente» o «neutro en carbono» aparecen en webs, envases, catálogos y presentaciones comerciales. Sin un respaldo concreto, ya no son lícitas.
3. **La compensación ya no sirve como argumento.** Comprar créditos de carbono no permite afirmar que un producto es neutro o que reduce emisiones. Solo pueden comunicarse las reducciones reales y medidas.
4. **Cualquiera puede reclamar.** Competidores, asociaciones de consumidores y autoridades de consumo pueden impugnar una afirmación ambiental que no se pueda probar. La Ley de Competencia Desleal ya lo permitía antes de la transposición.
5. **Afecta a todos los canales.** La web, la etiqueta, la publicidad, el material de venta y las redes sociales de la marca y de quienes hablan en su nombre.
6. **Callar tampoco protege.** Dejar de comunicar, el llamado *greenhushing*, deja sin argumentos a quien sí ha reducido su impacto. La salida es sustituir los adjetivos por datos verificables.

La explicación completa, con una tabla de alternativas, está en el artículo [Directiva 2024/825: las afirmaciones ambientales que ya no puedes usar en tu publicidad](https://redroom.es/directiva-2024-825-afirmaciones-ambientales/).

## Para quién es útil

| Perfil | Para qué |
|---|---|
| Agencias de marketing y comunicación | Revisar los mensajes de clientes de alimentación, moda, cosmética, energía, movilidad, construcción o turismo. |
| Departamentos de marketing y comunicación | Revisar la web, las fichas de producto, los envases, las campañas y las notas de prensa antes de publicarlas. |
| Responsables de sostenibilidad y ESG | Comprobar que lo que se comunica coincide con lo que se puede demostrar. |
| Dirección de empresas de sectores con impacto | Conocer el riesgo de los mensajes de la marca y decidir qué revisar primero. |
| Portavoces y directivos en redes | Revisar lo que publican en LinkedIn u otras redes como representantes de la marca. |
| Prensa, consultoría y formación | Analizar anuncios y declaraciones de empresas, asesorar a clientes y explicar la norma con ejemplos. |

## Qué revisa

| Tipo | Ejemplos | Base legal |
|---|---|---|
| Afirmaciones genéricas | «ecológico», «verde», «sostenible» | Directiva 2005/29/CE, anexo I, punto 4 bis |
| Neutralidad por compensación | «neutro en carbono», «positivo para el clima» | Anexo I, punto 4 quater |
| Beneficio parcial como total | «somos una marca sostenible» | Anexo I, punto 4 ter |
| Compromisos de futuro | «cero emisiones en 2040» | Artículo 6, apartado 2, letra d) |
| Sellos propios | «nuestro sello verde» | Anexo I, punto 2 bis |
| Requisitos legales como ventaja | «sin CFC» | Anexo I, punto 10 bis |

Todos estos puntos los añade la Directiva (UE) 2024/825 a la Directiva 2005/29/CE de prácticas comerciales desleales.

Cada aviso tiene un nivel de riesgo:

- **Alto:** la expresión encaja en una práctica prohibida, salvo que se cumplan requisitos estrictos.
- **Medio:** depende del contexto. Puede ser lícita si se concreta y se demuestra, o ser un falso positivo, como «verde» referido a un color.

## Cómo se usa

### En el navegador

Abre <https://red-room-marketing.github.io/marketingetico/>, pega el texto y revisa los avisos.

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
| `--estricto` | Termina con error también si hay avisos de riesgo medio. |

Si encuentra algún aviso de riesgo alto, termina con código 1. Así puede usarse en integración continua para revisar los textos de una web antes de publicarlos.

### Como librería

```js
const { comprobar, resumen } = require('./src/comprobador.js');
const datos = require('./datos/reclamos.json');

const avisos = comprobar('Envase ecológico y 100 % sostenible', datos);
console.log(resumen(avisos)); // { total: 2, alto: 2, medio: 0 }
```

### Contenido del repositorio

| Ruta | Contenido |
|---|---|
| [`datos/reclamos.json`](datos/reclamos.json) | Expresiones, patrones, categoría, riesgo, motivo, alternativa y base legal. |
| [`datos/reclamos.csv`](datos/reclamos.csv) | Los mismos datos en CSV. |
| [`src/comprobador.js`](src/comprobador.js) | Motor de detección sin dependencias, para Node.js y navegador. |
| [`bin/comprobar.js`](bin/comprobar.js) | Herramienta de línea de comandos. |
| [`index.html`](index.html) | Página web del comprobador. |

## Limitaciones

- Es una lista orientativa y **no sustituye al asesoramiento jurídico**.
- Busca expresiones y no interpreta el contexto. Puede dar falsos positivos y no detecta todas las afirmaciones engañosas.
- Que no aparezca ningún aviso no significa que un texto sea lícito. Cada dato ambiental debe poder demostrarse.
- La transposición de la directiva en cada Estado miembro puede añadir requisitos propios.

## Créditos y licencia

Es un proyecto abierto. Puedes usar el comprobador, copiar los datos, adaptarlos e integrarlos en tus propias herramientas, también con fines comerciales.

> **Mención obligatoria.** En cualquier uso, copia o adaptación hay que citar a Red Room® como autor, con un enlace a [redroom.es](https://redroom.es/). Por ejemplo:
>
> *Fuente: «Comprobador de reclamos ambientales», de Red Room® (https://redroom.es). Licencia CC BY 4.0.*

| Parte | Licencia |
|---|---|
| Datos (`datos/`) y textos explicativos | [CC BY 4.0](LICENCIA-DATOS.md) |
| Código (`src/`, `bin/`, `scripts/`, `test/`, `index.html`) | [MIT](LICENSE). El aviso de autoría, que incluye a Red Room® y redroom.es, debe conservarse en todas las copias. |
| Logotipo e ilustraciones (`assets/img/`) | Propiedad de Red Room®. No forman parte de las licencias abiertas. |
| Fuentes (`assets/fuentes/`) | Roboto Condensed y Lora, con licencia [SIL Open Font License 1.1](assets/fuentes/). |

Si lo usas en un artículo, una formación o un proyecto, nos gustará saberlo: escríbenos desde [redroom.es](https://redroom.es/contacto/).

## Contribuir

Puedes proponer expresiones nuevas, exclusiones o correcciones. Consulta [CONTRIBUIR.md](CONTRIBUIR.md).

```bash
npm test      # pruebas y comprobación de que el CSV está al día
npm run csv   # regenera datos/reclamos.csv a partir del JSON
```
