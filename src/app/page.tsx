"use client";

import { useState, useEffect } from "react";
import { products, categories } from "@/data/products";
import { ShoppingBag, Search, User, Menu, X, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";


type Mode = "varejo" | "atacado" | null;

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Check localStorage on mount
  useEffect(() => {
    const verified = localStorage.getItem("macumbiinha_age");
    const savedMode = localStorage.getItem("macumbiinha_mode") as Mode;
    if (verified === "true") setAgeVerified(true);
    if (savedMode) setMode(savedMode);
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem("macumbiinha_age", "true");
    setAgeVerified(true);
  };

  const handleModeSelect = (selected: Mode) => {
    if (selected) {
      localStorage.setItem("macumbiinha_mode", selected);
      setMode(selected);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // AGE GATE
  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">18+</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Macumbiinha</h1>
          <p className="text-neutral-400 mb-8">
            Este site contém produtos destinados exclusivamente a maiores de 18 anos.
            <br />
            Você confirma ter 18 anos ou mais?
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAgeConfirm}
              className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Sim, tenho 18+
            </button>
            <button
              onClick={() => (window.location.href = "https://www.google.com")}
              className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODE SELECTOR
  if (!mode) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Macumbi<span className="text-brand-500">inha</span>
            </h1>
            <p className="text-neutral-400">Como você deseja navegar?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleModeSelect("varejo")}
              className="group bg-neutral-900 border border-neutral-800 hover:border-brand-600 rounded-2xl p-8 text-left transition-all hover:shadow-lg hover:shadow-brand-900/20"
            >
              <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors">
                <User className="w-6 h-6 text-brand-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Cliente Final</h2>
              <p className="text-neutral-400 text-sm mb-4">
                Compre para uso pessoal. Navegue pelos produtos unitários e kits prontos.
              </p>
              <span className="inline-flex items-center text-brand-500 text-sm font-medium">
                Entrar como cliente <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </button>

            <button
              onClick={() => handleModeSelect("atacado")}
              className="group bg-neutral-900 border border-neutral-800 hover:border-brand-600 rounded-2xl p-8 text-left transition-all hover:shadow-lg hover:shadow-brand-900/20"
            >
              <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors">
                <ShoppingBag className="w-6 h-6 text-brand-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Lojista / Revendedor</h2>
              <p className="text-neutral-400 text-sm mb-4">
                Compre para revenda. Destaque em caixas, kits e condições especiais.
              </p>
              <span className="inline-flex items-center text-brand-500 text-sm font-medium">
                Entrar como lojista <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN STORE
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 text-neutral-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <a href="/" className="text-xl font-bold tracking-tight">
                Macumbi<span className="text-brand-500">inha</span>
              </a>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1.5 text-xs">
                <span className={`w-2 h-2 rounded-full ${mode === "atacado" ? "bg-amber-500" : "bg-brand-500"}`} />
                <span className="text-neutral-300">
                  {mode === "atacado" ? "Modo Atacado" : "Modo Varejo"}
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("macumbiinha_mode");
                    setMode(null);
                  }}
                  className="text-neutral-500 hover:text-white ml-1"
                >
                  trocar
                </button>
              </div>
              <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
                <ShoppingBag size={22} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-600"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-brand-950 border border-neutral-800 p-8 md:p-12">
            <div className="relative z-10 max-w-xl">
              <span className="inline-block text-brand-400 text-sm font-medium mb-3 tracking-wide uppercase">
                {mode === "atacado" ? "Atacado & Revenda" : "Tabacaria Premium"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {mode === "atacado"
                  ? "Abasteça sua loja com qualidade"
                  : "Tudo para a sua sessão"}
              </h1>
              <p className="text-neutral-400 mb-6">
                {mode === "atacado"
                  ? "Seleção pensada para lojistas e revendedores. Caixas, kits e condições especiais."
                  : "Sedas, piteiras, dichavadores, isqueiros e acessórios selecionados com cuidado."}
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Ver catálogo
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-brand-600/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Categorias</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-brand-500 hover:text-brand-400"
              >
                Limpar filtro
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name
                : "Todos os produtos"}
              <span className="text-neutral-500 font-normal ml-2 text-sm">
                ({filteredProducts.length})
              </span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              Nenhum produto encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produto/${product.id}`}
                  className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all hover:shadow-lg hover:shadow-black/40 block"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[4/3] bg-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                      <span className="text-4xl opacity-40">
                        {categories.find((c) => c.id === product.category)?.icon || "📦"}
                      </span>
                    </div>
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        Destaque
                      </span>
                    )}
                    {mode === "atacado" && product.forWholesale && (
                      <span className="absolute top-3 right-3 bg-amber-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        Atacado
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] text-brand-500 font-medium uppercase tracking-wider mb-1">
                      {categories.find((c) => c.id === product.category)?.name}
                    </p>
                    <h3 className="text-white font-medium text-sm leading-snug mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-neutral-500 text-xs line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-full bg-neutral-800 group-hover:bg-brand-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors text-center">
                      {mode === "atacado" ? "Solicitar orçamento" : "Ver detalhes"}
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Macumbi<span className="text-brand-500">inha</span>
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Tabacaria premium com atendimento tanto para cliente final quanto para lojistas e revendedores.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Categorias</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelectedCategory(c.id)}
                      className="hover:text-brand-400 transition-colors"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Informações</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li>Venda proibida para menores de 18 anos</li>
                <li>Atendimento via WhatsApp</li>
                <li>Envios para todo o Brasil</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-neutral-800 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Macumbiinha. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/5511999999999?text=${encodeURIComponent(
          mode === "atacado"
            ? "Olá! Sou lojista e gostaria de saber mais sobre o atacado da Macumbiinha."
            : "Olá! Gostaria de saber mais sobre os produtos da Macumbiinha."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 transition-all hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </div>
  );
}

