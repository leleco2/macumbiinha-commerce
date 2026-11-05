export const store = {
  name: 'Macumbiinha',
  whatsapp: '', // Preencha com DDI + DDD + número, somente dígitos.
  email: '',
  companyName: '',
  cnpj: '',
  address: '',
};
export const categoryDetails: Record<string, {title:string; description:string; color:string}> = {
  sedas: {title:'O detalhe faz a diferença.', description:'Explore papéis, formatos e acabamentos. Encontre a opção que combina com a sua preferência.', color:'#e8e3ca'},
  piteiras: {title:'Pequenos detalhes. Outras possibilidades.', description:'Papel ou vidro, formatos clássicos ou diferenciados. Conheça as opções do catálogo.', color:'#e6ddea'},
  dichavadores: {title:'Design que trabalha com você.', description:'Modelos, materiais e compartimentos para comparar com calma.', color:'#d9e2d4'},
  isqueiros: {title:'Personalidade em cada detalhe.', description:'Dos compactos aos maçaricos, descubra os modelos e seus acabamentos.', color:'#eedcce'},
  cases: {title:'Tudo no seu lugar.', description:'Cases e tabaqueiras para organizar e transportar seus acessórios.', color:'#d9e3df'},
  kits: {title:'Uma escolha. Várias possibilidades.', description:'Combinações de acessórios para conhecer, escolher ou presentear.', color:'#e9dfd3'},
  acessorios: {title:'Complete a sua seleção.', description:'Bandejas, cuias, tesouras e outros acessórios para o seu dia a dia.', color:'#dce1ed'},
};
export const faqs = [
  ['Como funciona o catálogo?', 'Explore as categorias, abra os detalhes e adicione os itens à sua seleção. Os preços e a disponibilidade precisam ser confirmados com a loja; este site ainda não recebe pagamentos.'],
  ['Como alternar entre varejo e atacado?', 'Use o seletor no topo de qualquer página. No atacado, você pode filtrar os itens indicados para revenda. Sua seleção de produtos é mantida ao trocar de perfil.'],
  ['Existe pedido mínimo para atacado?', 'As condições comerciais, quantidades mínimas e preços por volume precisam ser confirmados com a equipe antes do pedido. Nenhum desconto é aplicado automaticamente neste catálogo.'],
  ['Como consulto frete, prazo e disponibilidade?', 'Essas informações dependem dos itens, da quantidade e do endereço de entrega. Confirme todas as condições com a loja antes de efetuar qualquer pagamento.'],
  ['As imagens são dos produtos reais?', 'As ilustrações representam as categorias e não substituem fotos dos modelos reais. Confirme cores, medidas e acabamento antes de fechar um pedido.'],
];
