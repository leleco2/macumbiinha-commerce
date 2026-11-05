import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/components/Shop";

export const metadata: Metadata = {
  title: "Macumbiinha | Tabacaria Premium",
  description:
    "Tabacaria Macumbiinha - Varejo e Atacado. Sedas, piteiras, dichavadores, isqueiros, cases e acessórios de qualidade.",
  keywords: ["tabacaria", "sedas", "piteiras", "dichavador", "isqueiro", "atacado", "varejo"],
  robots: "index, follow",
  openGraph: {
    title: "Macumbiinha | Tabacaria Premium",
    description: "Varejo e Atacado de produtos de tabacaria.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#283e2c" />
      </head>
      <body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><ShopProvider>{children}</ShopProvider></body>
    </html>
  );
}
