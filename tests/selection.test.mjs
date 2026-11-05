import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeSelection, addToSelection, sanitizeFavorites, toggleSavedItem, MAX_QUANTITY } from '../src/lib/selection.ts';

const allowed = ['seda-a', 'case-b', 'kit-c'];

test('recupera apenas itens válidos do armazenamento local', () => {
  const items = sanitizeSelection([
    { id: 'seda-a', qty: 2 }, { id: 'seda-a', qty: 3 },
    { id: 'inventado', qty: 2 }, { id: 'case-b', qty: 0 },
    { id: 'kit-c', qty: 5000 }, null, { id: 'kit-c', qty: 2 }
  ], allowed);
  assert.deepEqual(items, [{ id: 'seda-a', qty: 5 }, { id: 'kit-c', qty: MAX_QUANTITY }]);
  assert.deepEqual(sanitizeSelection({ id: 'seda-a', qty: 1 }, allowed), []);
});

test('quantidades são somadas com limite por produto', () => {
  const first = addToSelection([], 'seda-a', 4);
  assert.deepEqual(first, [{ id: 'seda-a', qty: 4 }]);
  assert.deepEqual(addToSelection(first, 'seda-a', 999), [{ id: 'seda-a', qty: 999 }]);
  assert.deepEqual(addToSelection(first, 'case-b', 2), [{ id: 'seda-a', qty: 4 }, { id: 'case-b', qty: 2 }]);
  assert.deepEqual(addToSelection(first, 'seda-a', -1), first);
});

test('favoritos são únicos, válidos e podem ser alternados', () => {
  const saved = sanitizeFavorites(['seda-a', 'seda-a', 'inexistente', 'case-b', 123], allowed);
  assert.deepEqual(saved, ['seda-a', 'case-b']);
  assert.deepEqual(toggleSavedItem(saved, 'seda-a'), ['case-b']);
  assert.deepEqual(toggleSavedItem(saved, 'kit-c'), ['seda-a', 'case-b', 'kit-c']);
});


test('variações da mesma seda ficam separadas no carrinho e no armazenamento',()=>{
 const first=addToSelection([], 'seda-a', 2, 'SEDA-KS');
 const second=addToSelection(first, 'seda-a', 3, 'SEDA-SLIM');
 assert.equal(second.length,2);
 assert.deepEqual(addToSelection(second,'seda-a',1,'SEDA-KS'),[
  {id:'seda-a',qty:3,variantSku:'SEDA-KS'},
  {id:'seda-a',qty:3,variantSku:'SEDA-SLIM'}
 ]);
 assert.deepEqual(sanitizeSelection(second,allowed),second);
 assert.deepEqual(sanitizeSelection([{id:'seda-a',qty:2,variantSku:'sku invalido'}],allowed),[]);
});
