import type { Metadata } from "next";
import "./globals.css";
import "./refinement.css";
import { ShopProvider } from "@/components/Shop";

export const metadata: Metadata = {
  title: "Macumbiinha | Acessórios para varejo e atacado",
  description:
    "Explore o catálogo da Macumbiinha: sedas, piteiras, dichavadores, isqueiros, cases e kits. Monte sua seleção e consulte a loja pelo WhatsApp.",
  keywords: ["tabacaria", "sedas", "piteiras", "dichavador", "isqueiro", "atacado", "varejo"],
  robots: "index, follow",
  metadataBase: new URL("https://macumbiinha.pages.dev"),
  alternates: {canonical: "/"},
  openGraph: {
    title: "Macumbiinha | Acessórios para varejo e atacado",
    description: "Catálogo de acessórios com varejo, atacado e atendimento pelo WhatsApp.",
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
        <meta name="theme-color" content="#233e2e" />
      </head>
      <body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><ShopProvider>{children}</ShopProvider></body>
    </html>
  );
}
