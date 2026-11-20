'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { comprobar, resumen, normalizar } = require('../src/comprobador.js');
const datos = require('../datos/afirmaciones.json');

const ids = (t) => comprobar(t, datos).map((a) => a.id);

test('los datos son coherentes', () => {
  const vistos = new Set();
  for (const r of datos.afirmaciones) {
    assert.ok(!vistos.has(r.id), `id duplicado: ${r.id}`);
    vistos.add(r.id);
    assert.ok(datos.categorias[r.categoria], `categoría desconocida en ${r.id}`);
    assert.ok(['alto', 'medio'].includes(r.riesgo), `riesgo no válido en ${r.id}`);
    for (const p of [...r.patrones, ...(r.excluir || [])]) assert.doesNotThrow(() => new RegExp(p, 'u'), `patrón no válido en ${r.id}: ${p}`);
    assert.ok(r.motivo && r.alternativa, `faltan textos en ${r.id}`);
  }
});

test('detecta afirmaciones genéricas con y sin tildes', () => {
  assert.deepEqual(ids('Un producto ecológico'), ['ecologico']);
  assert.deepEqual(ids('Un producto ECOLOGICO'), ['ecologico']);
  assert.deepEqual(ids('Este envase es respetuoso con el medio ambiente'), ['respetuoso_medio_ambiente']);
  assert.deepEqual(ids('Somos respetuosos con el medio ambiente'), ['empresa_entera', 'respetuoso_medio_ambiente']);
  assert.deepEqual(ids('Envase eco-friendly'), ['amigo_naturaleza']);
});

test('devuelve el fragmento exacto del texto original', () => {
  const [a] = comprobar('Café «neutro en carbono» desde hoy', datos);
  assert.equal(a.texto, 'neutro en carbono');
  assert.equal(a.riesgo, 'alto');
});

test('respeta los límites de palabra', () => {
  assert.deepEqual(ids('Las verduras del huerto'), []);
  assert.deepEqual(ids('Un tema ecologicista'), []);
});

test('ignora los usos que no son afirmaciones', () => {
  assert.deepEqual(ids('El sofá es de color verde'), []);
  assert.deepEqual(ids('Los objetivos de desarrollo sostenible'), []);
  assert.deepEqual(ids('La huella ecológica del sector'), []);
  assert.deepEqual(ids('Cumple la etiqueta ecológica de la UE'), []);
});

test('prioriza la coincidencia más larga', () => {
  assert.deepEqual(ids('Somos una marca sostenible'), ['empresa_entera']);
  assert.deepEqual(ids('Seremos cero emisiones en 2040'), ['compromiso_futuro']);
  assert.deepEqual(ids('Un envase 100 % sostenible'), ['cien_por_cien']);
});

test('detecta compensación, futuro, sellos y requisitos legales', () => {
  assert.ok(ids('compramos créditos de carbono').includes('compensacion'));
  assert.ok(ids('net zero para 2035').includes('compromiso_futuro'));
  assert.ok(ids('con nuestro sello verde').includes('sello_propio'));
  assert.ok(ids('aerosol sin CFC').includes('sin_cfc'));
});

test('admite espacios de no separación y textos vacíos', () => {
  assert.deepEqual(ids('100 % ecológico'), ['cien_por_cien']);
  assert.deepEqual(comprobar('', datos), []);
  assert.deepEqual(comprobar(undefined, datos), []);
});

test('normalizar conserva las posiciones originales', () => {
  const n = normalizar('Ñandú ecológico');
  assert.equal(n.texto, 'nandu ecologico');
  assert.equal(n.posiciones.length, n.texto.length + 1);
});

test('resumen cuenta por riesgo', () => {
  const r = resumen(comprobar('Producto ecológico y biodegradable', datos));
  assert.deepEqual(r, { total: 2, alto: 1, medio: 1 });
});
