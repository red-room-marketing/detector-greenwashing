// Genera datos/afirmaciones.csv a partir de datos/afirmaciones.json
'use strict';
const fs = require('fs');
const path = require('path');
const datos = require('../datos/afirmaciones.json');
const celda = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const cabecera = ['id', 'categoria', 'categoria_nombre', 'riesgo', 'expresion', 'patrones', 'excluir', 'motivo', 'alternativa', 'base_legal'];
const filas = datos.afirmaciones.map((r) => [
  r.id, r.categoria, datos.categorias[r.categoria].nombre, r.riesgo, r.expresion,
  r.patrones.join(' | '), (r.excluir || []).join(' | '), r.motivo, r.alternativa, datos.categorias[r.categoria].base,
]);
const csv = [cabecera, ...filas].map((f) => f.map(celda).join(',')).join('\n') + '\n';
const destino = path.join(__dirname, '..', 'datos', 'afirmaciones.csv');
if (process.argv.includes('--comprobar')) {
  if (!fs.existsSync(destino) || fs.readFileSync(destino, 'utf8') !== csv) {
    console.error('datos/afirmaciones.csv no está al día: ejecuta «npm run csv».');
    process.exit(1);
  }
} else {
  fs.writeFileSync(destino, csv);
  console.log(`Escrito ${destino} (${filas.length} filas).`);
}
