# Cómo contribuir

Gracias por ayudar a mejorar el detector.

## Proponer una frase nueva o una corrección

Abre una incidencia (issue) con:

1. La frase y uno o dos ejemplos reales de uso.
2. Por qué encaja en la Directiva (UE) 2024/825 y en qué punto: afirmación genérica, compensación, alcance, futuro, sello o requisito legal.
3. Si conoces falsos positivos, los contextos en los que no debería avisar.

## Enviar un cambio

1. Edita `datos/afirmaciones.json`. Los patrones se escriben en minúsculas y **sin tildes**, porque el texto se normaliza antes de buscar.
2. Añade una prueba en `test/comprobador.test.js` con un caso que deba avisar y otro que no.
3. Ejecuta `npm run csv` para regenerar el CSV y `npm test` para comprobar que todo pasa.

Los textos (motivo y alternativa) siguen las normas del castellano de España, en tono claro y sin tecnicismos innecesarios. Las alternativas deben ser defendibles solo si los datos son ciertos y pueden documentarse.

Al contribuir aceptas que tu aportación se publique con las mismas licencias del proyecto: MIT para el código y CC BY 4.0 para los datos.
