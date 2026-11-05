import type { Metadata } from "next";
import "./globals.css";

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
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="antialiased bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
