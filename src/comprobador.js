/*
 * Comprobador de reclamos ambientales (Directiva (UE) 2024/825)
 * Red Room® · https://redroom.es · Código con licencia MIT
 *
 * Funciona en Node.js (CommonJS) y en el navegador (window.ComprobadorReclamos).
 * No tiene dependencias.
 */
(function (raiz, fabrica) {
  if (typeof module === 'object' && module.exports) module.exports = fabrica();
  else raiz.ComprobadorReclamos = fabrica();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LIMITE_ANTES = '(?<![\\p{L}\\p{N}])';
  const LIMITE_DESPUES = '(?![\\p{L}\\p{N}])';
  const CONTEXTO = 30;
  const PESO_RIESGO = { alto: 2, medio: 1 };

  /**
   * Pasa el texto a minúsculas y sin tildes, y guarda para cada carácter
   * resultante su posición en el texto original.
   */
  function normalizar(texto) {
    let salida = '';
    const posiciones = [];
    let i = 0;
    for (const caracter of texto) {
      let n = caracter.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
      if (/[   ]/.test(n)) n = ' ';
      for (const c of n) {
        salida += c;
        posiciones.push(i);
      }
      i += caracter.length;
    }
    posiciones.push(texto.length);
    return { texto: salida, posiciones };
  }

  /** Prepara las expresiones regulares de cada reclamo. */
  function compilar(datos) {
    return datos.reclamos.map((r) => ({
      ...r,
      categoriaNombre: datos.categorias[r.categoria].nombre,
      base: datos.categorias[r.categoria].base,
      regex: r.patrones.map((p) => new RegExp(LIMITE_ANTES + '(?:' + p + ')' + LIMITE_DESPUES, 'gu')),
      excluirRegex: (r.excluir || []).map((p) => new RegExp(p, 'u')),
    }));
  }

  /**
   * Busca reclamos en un texto.
   * @param {string} texto Texto que se quiere revisar.
   * @param {object} datos Contenido de datos/reclamos.json.
   * @returns {Array<object>} Avisos ordenados por posición.
   */
  function comprobar(texto, datos) {
    const reglas = compilar(datos);
    const norm = normalizar(String(texto || ''));
    const avisos = [];

    for (const regla of reglas) {
      for (const regex of regla.regex) {
        regex.lastIndex = 0;
        let m;
        while ((m = regex.exec(norm.texto)) !== null) {
          if (m[0].length === 0) { regex.lastIndex++; continue; }
          const ini = m.index;
          const fin = ini + m[0].length;
          const entorno = norm.texto.slice(Math.max(0, ini - CONTEXTO), fin + CONTEXTO);
          if (regla.excluirRegex.some((x) => x.test(entorno))) continue;
          const inicio = norm.posiciones[ini];
          const final = norm.posiciones[fin];
          avisos.push({
            id: regla.id,
            categoria: regla.categoria,
            categoriaNombre: regla.categoriaNombre,
            riesgo: regla.riesgo,
            texto: String(texto).slice(inicio, final),
            inicio,
            fin: final,
            motivo: regla.motivo,
            alternativa: regla.alternativa,
            base: regla.base,
          });
        }
      }
    }

    // Si un aviso queda dentro de otro más largo, se conserva solo el más largo
    // (o, a igual longitud, el de mayor riesgo).
    avisos.sort((a, b) => a.inicio - b.inicio || (b.fin - b.inicio) - (a.fin - a.inicio) || PESO_RIESGO[b.riesgo] - PESO_RIESGO[a.riesgo]);
    const resultado = [];
    for (const a of avisos) {
      const contenedor = resultado.find((r) => r.inicio <= a.inicio && r.fin >= a.fin);
      if (!contenedor) resultado.push(a);
    }
    return resultado;
  }

  /** Resumen por nivel de riesgo. */
  function resumen(avisos) {
    return {
      total: avisos.length,
      alto: avisos.filter((a) => a.riesgo === 'alto').length,
      medio: avisos.filter((a) => a.riesgo === 'medio').length,
    };
  }

  return { comprobar, resumen, normalizar };
});
