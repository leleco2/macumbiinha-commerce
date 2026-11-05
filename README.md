# Macumbiinha — Tabacaria Premium

E-commerce profissional com suporte a **Varejo** e **Atacado/Revenda**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React

## Funcionalidades incluídas

- Age Gate (18+)
- Seletor de perfil (Cliente Final / Lojista)
- Catálogo com categorias e busca
- Página de detalhe do produto
- Botão flutuante e integração WhatsApp
- Design dark + verde esmeralda
- Totalmente responsivo
- Pronto para evoluir com CRM, estoque e pagamentos

## Como rodar localmente

```bash
cd macumbiinha
npm install
npm run dev
```

Abra http://localhost:3000

## Publicação

- Repositório: https://github.com/leleco2/macumbiinha-commerce
- Site: https://macumbiinha.pages.dev
- Build: `npm ci && npm run build`
- Diretório publicado: `out`

As páginas de produtos são geradas estaticamente a partir de `src/data/products.ts`.
O projeto Cloudflare Pages usa upload direto. A integração Git da conta retornou erro 8000011; novos commits não publicam automaticamente.
Para atualizar, execute o build e publique `out` no projeto `macumbiinha`.

## Personalizações importantes

- **Número do WhatsApp**: Altere em `src/app/page.tsx` e `src/app/produto/[id]/page.tsx` (procure por 5511999999999)
- **Logo**: Substitua o texto pelo seu logo quando tiver
- **Produtos**: Edite `src/data/products.ts`
- **Cores**: Ajuste em `tailwind.config.ts` (brand)

## Próximos passos sugeridos

1. Colocar imagens reais dos produtos
2. Conectar com sistema de estoque / CRM
3. Área logada de revendedor
4. Integração de pagamento
5. SEO e analytics
