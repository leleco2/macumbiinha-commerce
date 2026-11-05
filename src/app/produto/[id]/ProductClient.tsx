"use client";

import { useRouter } from "next/navigation";
import { products, categories } from "@/data/products";
import { ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "varejo" | "atacado" | null;

export default function ProductPage({ id }: { id: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("macumbiinha_mode") as Mode;
    if (savedMode) setMode(savedMode);
  }, []);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h1>
          <button
            onClick={() => router.push("/")}
            className="text-brand-500 hover:text-brand-400"
          >
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappNumber = "5511999999999"; // Substitua pelo número real
  const whatsappMessage =
    mode === "atacado"
      ? `Olá! Sou lojista e gostaria de solicitar orçamento do produto: ${product.name}`
      : `Olá! Tenho interesse no produto: ${product.name}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header simples */}
      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Voltar</span>
          </button>
          <a href="/" className="text-lg font-bold">
            Macumbi<span className="text-brand-500">inha</span>
          </a>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Image area */}
          <div className="aspect-square bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <span className="text-8xl opacity-30">{category?.icon || "📦"}</span>
            {product.featured && (
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase">
                Destaque
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-brand-500 text-sm font-medium uppercase tracking-wider mb-2">
              {category?.name}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-neutral-400 leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {mode === "atacado" && product.forWholesale && (
              <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-4 mb-6">
                <p className="text-amber-400 text-sm font-medium">
                  ✓ Produto indicado para revenda / atacado
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium py-3.5 px-6 rounded-xl transition-colors"
              >
                <MessageCircle size={20} />
                {mode === "atacado" ? "Solicitar orçamento" : "Falar no WhatsApp"}
              </a>
              <button className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3.5 px-6 rounded-xl transition-colors">
                <ShoppingBag size={20} />
                {mode === "atacado" ? "Adicionar à lista" : "Adicionar ao carrinho"}
              </button>
            </div>

            <p className="text-neutral-600 text-xs mt-4">
              * Preços e condições sob consulta. Atendimento exclusivo via WhatsApp.
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <a
                  key={p.id}
                  href={`/produto/${p.id}`}
                  className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all"
                >
                  <div className="aspect-[4/3] bg-neutral-800 flex items-center justify-center">
                    <span className="text-4xl opacity-40">
                      {categories.find((c) => c.id === p.category)?.icon}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium group-hover:text-brand-400 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
