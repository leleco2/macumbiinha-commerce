# Macumbiinha

Catálogo em Next.js 15, React 19 e TypeScript, exportado estaticamente para Cloudflare Pages.

- Site: https://macumbiinha.pages.dev
- Repositório: https://github.com/leleco2/macumbiinha-commerce

## Desenvolvimento

```sh
npm ci
npm run dev
npm run build
```

O build gera `out/`. O script de desenvolvimento aceita os parâmetros do ambiente de prévia e os adapta ao Next.js.

## Estrutura

- `/`: apresentação da marca, categorias, destaques, kits, atacado e dúvidas.
- `/catalogo/`: busca, ordenação e paginação (8 itens por página).
- `/categoria/[slug]/`: páginas próprias para as sete categorias.
- `/produto/[id]/`: detalhes, seleção e produtos relacionados.
- `/sobre/`, `/atacado/`, `/atendimento/`, `/informacoes/`, `/privacidade/`: informações institucionais.

O seletor varejo/atacado persiste no navegador. A seleção aceita quantidades e pode ser copiada; não é checkout e não reserva estoque.

## Produtos e fotos

Edite `src/data/products.ts`. Coloque fotos reais em `public/produtos/` e defina `image: "/produtos/nome.webp"` no produto. Sem foto, o site exibe uma ilustração identificada como representativa da categoria.

## Dados da empresa

Preencha `src/data/store.ts` com WhatsApp (DDI + DDD + número), e-mail, razão social, CNPJ e endereço verificados. Sem WhatsApp, o site não envia visitantes para números de exemplo. Revise as informações comerciais e de privacidade antes de habilitar vendas.

## Atendimento pelo WhatsApp

O canal configurado é **+55 21 96719-9869**, em `src/data/store.ts`. O catálogo abre `wa.me` com mensagem pré-preenchida conforme o perfil ativo:

- **Varejo:** atendimento, preços, disponibilidade e entrega.
- **Atacado:** consulta sobre revenda, preços por quantidade, pedido mínimo e condições de entrega.
- **Seleção:** inclui os nomes e quantidades escolhidos.
- **Produto:** inclui o nome do produto exibido.

O link está disponível na página inicial, página de produto, seleção, área de atacado, atendimento, rodapé e botão flutuante responsivo. O site não dispara mensagens automaticamente: o visitante revisa e envia pelo próprio WhatsApp.

As mensagens e a montagem do link ficam em `src/lib/whatsapp.ts`. Execute `npm test` para os testes de mensagem e `npm run build` para validar a exportação estática.

## Publicação

Projeto Cloudflare Pages `macumbiinha`, conta da loja, branch `main`, diretório `out/`.
A publicação usa upload direto. A integração Git da conta retornou erro 8000011; commits no GitHub não geram deploy automático.

## Limites atuais

Não há pagamento, controle de estoque, login de cliente ou painel administrativo. Preços, frete, condições de atacado e políticas operacionais precisam ser fornecidos pela loja. Nenhuma informação comercial foi inventada para preencher esses campos.
