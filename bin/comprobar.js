#!/usr/bin/env node
/*
 * Uso:
 *   node bin/comprobar.js archivo.txt [otro.html ...]
 *   cat texto.txt | node bin/comprobar.js
 * Opciones:
 *   --json     Salida en JSON
 *   --estricto Termina con código 1 también si hay avisos de riesgo medio
 * Termina con código 1 si encuentra algún aviso de riesgo alto (útil en integración continua).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { comprobar, resumen } = require('../src/comprobador.js');
const datos = require('../datos/afirmaciones.json');

const args = process.argv.slice(2);
const json = args.includes('--json');
const estricto = args.includes('--estricto');
const archivos = args.filter((a) => !a.startsWith('--'));

function limpiarHtml(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ');
}

function posicion(texto, indice) {
  const antes = texto.slice(0, indice).split('\n');
  return { linea: antes.length, columna: antes[antes.length - 1].length + 1 };
}

function revisar(nombre, contenido) {
  const texto = /\.html?$/i.test(nombre) ? limpiarHtml(contenido) : contenido;
  return comprobar(texto, datos).map((a) => ({ archivo: nombre, ...posicion(texto, a.inicio), ...a }));
}

function salir(avisos) {
  if (json) {
    process.stdout.write(JSON.stringify({ resumen: resumen(avisos), avisos }, null, 2) + '\n');
  } else {
    for (const a of avisos) {
      console.log(`${a.archivo}:${a.linea}:${a.columna}  [${a.riesgo}] «${a.texto}»  ${a.categoriaNombre}`);
      console.log(`    ${a.motivo}`);
      console.log(`    Alternativa: ${a.alternativa}\n`);
    }
    const r = resumen(avisos);
    console.log(`${r.total} ${r.total === 1 ? 'frase a revisar' : 'frases a revisar'}: ${r.alto} de riesgo alto y ${r.medio} de riesgo medio.`);
    console.log('Detector de greenwashing de Red Room® (redroom.es). Herramienta orientativa: no sustituye al asesoramiento jurídico.');
  }
  const r = resumen(avisos);
  process.exitCode = r.alto > 0 || (estricto && r.medio > 0) ? 1 : 0;
}

if (archivos.length) {
  salir(archivos.flatMap((f) => revisar(path.basename(f), fs.readFileSync(f, 'utf8'))));
} else {
  let entrada = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => (entrada += c));
  process.stdin.on('end', () => salir(revisar('entrada', entrada)));
}
