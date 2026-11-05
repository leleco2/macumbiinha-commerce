import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createWhatsAppMessage,createWhatsAppUrl} from '../src/lib/whatsapp.ts';

const phone = '5521967199869';

test('varejo: mensagem identifica perfil e consulta valores', () => {
  const message = createWhatsAppMessage('varejo');
  assert.match(message, /seção de varejo/);
  assert.match(message, /preços, disponibilidade/);
  assert.doesNotMatch(message, /pedido mínimo/);
});

test('atacado: mensagem identifica perfil e pede condições comerciais', () => {
  const message = createWhatsAppMessage('atacado');
  assert.match(message, /seção de atacado/);
  assert.match(message, /pedido mínimo/);
  assert.match(message, /revenda/);
});

test('seleção inclui nomes e quantidades sem perder o contexto', () => {
  const message = createWhatsAppMessage('atacado', {
    items: [{name: 'Produto de teste', quantity: 3}, {name: 'Segundo produto', quantity: 1}],
  });
  assert.match(message, /3 x Produto de teste/);
  assert.match(message, /1 x Segundo produto/);
  assert.match(message, /seção de atacado/);
});

test('detalhe do produto acompanha o perfil escolhido', () => {
  const message = createWhatsAppMessage('varejo', {productName: 'Produto de teste'});
  assert.match(message, /Tenho interesse neste produto: Produto de teste/);
});

test('link codifica a mensagem e usa número completo do WhatsApp', () => {
  const url = createWhatsAppUrl(phone, 'varejo', {productName:'Produto & teste'});
  const parsed = new URL(url);
  assert.equal(parsed.origin, 'https://wa.me');
  assert.equal(parsed.pathname, '/' + phone);
  assert.match(parsed.searchParams.get('text'), /Produto & teste/);
});

test('número inválido nunca gera destino de contato', () => {
  assert.equal(createWhatsAppUrl('', 'atacado'), '');
  assert.equal(createWhatsAppUrl('021-99', 'varejo'), '');
});
