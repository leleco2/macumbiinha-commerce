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

## Integração com o CRM (fonte principal de dados)

**O catálogo publicado é gerenciado no CRM**, não diretamente neste arquivo. O navegador consulta `https://macumbiinha-crm.maodeouro-nexa.workers.dev/api/public/catalog`, que informa os produtos, fotos, preços, publicação e disponibilidade. A resposta é atualizada periodicamente. Produtos cadastrados depois do build usam a página dinâmica estática `/item/?sku=...`.

- No CRM, acesse **Loja online** para cadastrar/editar, publicar/ocultar, anexar fotos, ajustar preços e registrar movimentações de estoque.
- As 34 referências que já apareciam na loja foram importadas para o D1, **sem supor preços ou quantidades**. Com preço igual a zero, a interface mostra "Sob consulta". Com estoque zero, mostra indisponibilidade.
- O catálogo está em modo de orçamento/atendimento; adicionar à seleção não cobra nem reserva produtos.
- Os textos principais e o WhatsApp podem ser ajustados no CRM, em **Loja online → Configurações**.
- Se o CRM estiver temporariamente indisponível, o site avisa que os dados podem estar desatualizados. A cópia estática antiga é usada somente como fallback de disponibilidade visual.
- Os dados de custo/fornecedores e notas fiscais são privados no CRM e nunca são enviados ao catálogo público.

O arquivo `src/data/products.ts` serve de referência legada e fallback para páginas já geradas; alterações de catálogo devem ocorrer no CRM.

## Publicação

O site é compilado por `.github/workflows/publish-cloudflare-bundle.yml`. A **publicação em produção** é acionada a partir do repositório `leleco2/macumbiinha-crm`, workflow `.github/workflows/deploy-storefront.yml`, que utiliza o segredo `CLOUDFLARE_API_TOKEN` com a permissão **Cloudflare Pages: Edit** para a mesma conta. Os builds do site e as publicações da loja são operações separadas. O domínio continua `https://macumbiinha.pages.dev`.

## Limites atuais

Não há checkout de pagamento automatizado nem emissão fiscal pela SEFAZ. O CRM permite arquivar notas PDF/XML de forma privada, mas não autoriza, transmite ou cancela NF-e. Estoque é movimentado no CRM, e pedidos confirmados no ERP usam os gatilhos já existentes. A cotação pelo site não reserva estoque.
