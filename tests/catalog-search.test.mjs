import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearch,searchCatalog} from '../src/lib/catalogSearch.ts';

const sample=[
 {id:'a',name:'Piteira de Vidro',category:'piteiras',description:'Vidro resistente, tamanho longo',tags:['Longa','Vidro']},
 {id:'b',name:'Kit Rosa Especial',category:'kits',description:'Case com acessórios',tags:['Presente']},
 {id:'c',name:'Dichavador de Metal',category:'dichavadores',description:'Alumínio e quatro partes',tags:['4 partes']},
 {id:'d',name:'Piteira de Papel',category:'piteiras',description:'Filtro prático e compacto',tags:['Papel']},
];

test('busca ignora acentos e a caixa do texto',()=>{
 assert.equal(normalizeSearch('  AcessÓrios  '),'acessorios');
 assert.deepEqual(searchCatalog(sample,'VIDRO').map(x=>x.id),['a']);
});

test('busca combina termos em ordem diferente sem exigir frase exata',()=>{
 assert.deepEqual(searchCatalog(sample,'rosa kit').map(x=>x.id),['b']);
 assert.deepEqual(searchCatalog(sample,'aluminio 4').map(x=>x.id),['c']);
});

test('busca por categoria e ordena nome exato primeiro',()=>{
 assert.deepEqual(searchCatalog(sample,'piteiras',{piteiras:'Piteiras de vidro e papel'}).map(x=>x.id),['a','d']);
 assert.deepEqual(searchCatalog(sample,'sem resultados'),[]);
 assert.equal(searchCatalog(sample,'').length,4);
});
