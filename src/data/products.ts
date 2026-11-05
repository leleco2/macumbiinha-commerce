export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string; // Exemplo: /produtos/foto.webp (arquivo em public/produtos)
  tags: string[];
  featured?: boolean;
  forWholesale?: boolean; // true = better for atacado
};

export const categories = [
  { id: "sedas", name: "Sedas & Blunts", icon: "📜" },
  { id: "piteiras", name: "Piteiras", icon: "🚬" },
  { id: "dichavadores", name: "Dichavadores", icon: "⚙️" },
  { id: "isqueiros", name: "Isqueiros", icon: "🔥" },
  { id: "cases", name: "Cases & Tabaqueiras", icon: "💼" },
  { id: "kits", name: "Kits Prontos", icon: "🎁" },
  { id: "acessorios", name: "Acessórios", icon: "🛠️" },
];

export const products: Product[] = [
  // SEDAS
  {
    id: "seda-sadhu-black",
    name: "Seda Sadhu Black Longa Large",
    category: "sedas",
    description: "Seda preta premium de alta qualidade, queima lenta e uniforme. Ideal para quem busca experiência diferenciada.",
    tags: ["King Size", "Premium", "Black"],
    featured: true,
  },
  {
    id: "seda-ocb-bamboo",
    name: "Seda OCB Bamboo Slim King Size",
    category: "sedas",
    description: "Feita com fibra de bambu, ultrafina e resistente. Uma das preferidas do mercado.",
    tags: ["Orgânica", "Slim", "Bamboo"],
  },
  {
    id: "seda-elements",
    name: "Seda Elements King Size Slim",
    category: "sedas",
    description: "Clássica e confiável. Papel de arroz com queima perfeita.",
    tags: ["Clássica", "Slim"],
  },
  {
    id: "blunt-grollz",
    name: "Blunt Cone G-Rollz Organic",
    category: "sedas",
    description: "Cones pré-enrolados de alta qualidade, com design exclusivo.",
    tags: ["Pré-enrolado", "Organic"],
    forWholesale: true,
  },
  {
    id: "seda-papelito",
    name: "Seda Papelito King Size Slim",
    category: "sedas",
    description: "Marca brasileira consolidada, excelente custo-benefício.",
    tags: ["Nacional", "Slim"],
    forWholesale: true,
  },

  // PITEIRAS
  {
    id: "piteira-vidro-noname",
    name: "Piteira de Vidro NoName Longa",
    category: "piteiras",
    description: "Piteira de vidro longa com designs variados (personagens, abstratos e full print).",
    tags: ["Vidro", "Longa", "Decorada"],
    featured: true,
  },
  {
    id: "piteira-sadhu-mega",
    name: "Piteira Sadhu Mega Large",
    category: "piteiras",
    description: "Piteira de papel extra longa, ideal para quem prefere filtro tradicional premium.",
    tags: ["Papel", "Mega Large"],
    forWholesale: true,
  },
  {
    id: "piteira-vidro-paradize",
    name: "Piteira de Vidro Paradize Longa",
    category: "piteiras",
    description: "Vidro de qualidade com bocal diferenciado e acabamento premium.",
    tags: ["Vidro", "Premium"],
  },
  {
    id: "piteira-papelito",
    name: "Piteira Papelito Mega Longa Dupla",
    category: "piteiras",
    description: "Piteira dupla hiper longa, excelente para revenda.",
    tags: ["Papel", "Dupla", "Longa"],
    forWholesale: true,
  },

  // DICHAVADORES
  {
    id: "dichavador-4partes",
    name: "Dichavador de Metal 4 Partes",
    category: "dichavadores",
    description: "Dichavador robusto de zinco/alumínio com 4 compartimentos e peneira.",
    tags: ["Metal", "4 Partes"],
    featured: true,
  },
  {
    id: "dichavador-acrilico",
    name: "Dichavador de Acrílico 2 Partes",
    category: "dichavadores",
    description: "Modelo econômico e eficiente, ideal para uso diário e revenda.",
    tags: ["Acrílico", "Econômico"],
    forWholesale: true,
  },
  {
    id: "dichavador-eletronico",
    name: "Dichavador Elétrico",
    category: "dichavadores",
    description: "Praticidade máxima. Ideal para quem busca comodidade.",
    tags: ["Elétrico", "Prático"],
  },

  // ISQUEIROS
  {
    id: "isqueiro-macarico",
    name: "Isqueiro Maçarico Recarregável",
    category: "isqueiros",
    description: "Chama azul intensa, resistente ao vento e recarregável.",
    tags: ["Maçarico", "Recarregável"],
    featured: true,
  },
  {
    id: "isqueiro-gti",
    name: "Isqueiro GTi Mini",
    category: "isqueiros",
    description: "Compacto, confiável e com ótimo custo para revenda.",
    tags: ["Mini", "Clássico"],
    forWholesale: true,
  },
  {
    id: "isqueiro-sadhu",
    name: "Isqueiro Maçarico Sadhu",
    category: "isqueiros",
    description: "Linha premium com design diferenciado e alta performance.",
    tags: ["Premium", "Maçarico"],
  },

  // CASES
  {
    id: "case-sadhu-slim",
    name: "Case Impermeável Sadhu Slim",
    category: "cases",
    description: "Case resistente à água, perfeita para levar sedas e acessórios com segurança.",
    tags: ["Impermeável", "Slim"],
    featured: true,
  },
  {
    id: "case-puff-life",
    name: "Case Puff Life Slim",
    category: "cases",
    description: "Design moderno e funcional, uma das mais pedidas.",
    tags: ["Premium", "Funcional"],
  },
  {
    id: "case-to-na-be",
    name: "Case G To Na Bê",
    category: "cases",
    description: "Modelo versátil e com ótimo preço para revenda.",
    tags: ["Versátil"],
    forWholesale: true,
  },

  // KITS
  {
    id: "kit-completo",
    name: "Kit Completão Case + Tesoura + Cuia",
    category: "kits",
    description: "Kit completo pronto para uso ou presente. Inclui case, tesoura e cuia.",
    tags: ["Completo", "Presente"],
    featured: true,
  },
  {
    id: "kit-spliff",
    name: "Kit Spliff Sadhu (Seda + Piteira + Tesoura + Cuia)",
    category: "kits",
    description: "Tudo que você precisa em um único kit bem montado.",
    tags: ["Essencial"],
    forWholesale: true,
  },
  {
    id: "kit-tabacaria",
    name: "Kit Tabacaria Premier",
    category: "kits",
    description: "Seleção de itens essenciais para quem está montando a primeira sessão.",
    tags: ["Iniciante"],
  },

  // ACESSÓRIOS
  {
    id: "cuia-silicone",
    name: "Cuia de Silicone",
    category: "acessorios",
    description: "Resistente, fácil de limpar e disponível em várias cores.",
    tags: ["Silicone", "Prático"],
  },
  {
    id: "cinzeiro-silicone",
    name: "Cinzeiro de Silicone",
    category: "acessorios",
    description: "Não queima, fácil de limpar e com designs modernos.",
    tags: ["Silicone", "Seguro"],
  },
  {
    id: "bandeja-metal",
    name: "Bandeja de Metal",
    category: "acessorios",
    description: "Bandeja resistente com área para cigarro e designs exclusivos.",
    tags: ["Metal", "Prática"],
  },
  {
    id: "tesoura-metal",
    name: "Tesoura de Metal Dobrável",
    category: "acessorios",
    description: "Afiação precisa e design compacto. Essencial em qualquer kit.",
    tags: ["Metal", "Dobrável"],
    forWholesale: true,
  },
  {
    id: "seda-zomo-brown",
    name: "Seda Zomo Brown King Size",
    category: "sedas",
    description: "Seda marrom natural de alta qualidade, queima lenta e sabor neutro.",
    tags: ["Brown", "Natural", "King Size"],
    forWholesale: true,
  },
  {
    id: "seda-bem-bolado",
    name: "Seda Bem Bolado King Size Slim",
    category: "sedas",
    description: "Uma das marcas mais populares do Brasil. Excelente para revenda.",
    tags: ["Nacional", "Slim", "Popular"],
    forWholesale: true,
  },
  {
    id: "piteira-raw",
    name: "Piteira Pré-Enrolada RAW Masterpiece",
    category: "piteiras",
    description: "Piteiras pré-enroladas da marca RAW, prontas para uso.",
    tags: ["RAW", "Pré-enrolada"],
  },
  {
    id: "dichavador-bem-bolado",
    name: "Dichavador Bem Bolado 4 Partes",
    category: "dichavadores",
    description: "Dichavador de alumínio de alta qualidade com 4 partes e peneira fina.",
    tags: ["Alumínio", "4 Partes", "Premium"],
    featured: true,
  },
  {
    id: "isqueiro-raw",
    name: "Isqueiro RAW Phoenix",
    category: "isqueiros",
    description: "Isqueiro oficial da marca RAW, design exclusivo e confiável.",
    tags: ["RAW", "Exclusivo"],
  },
  {
    id: "case-sessaozada",
    name: "Case Sessãozada Classic",
    category: "cases",
    description: "Case clássico e resistente, perfeito para o dia a dia.",
    tags: ["Clássico", "Resistente"],
  },
  {
    id: "kit-rosa",
    name: "Kit Rosa Menininha",
    category: "kits",
    description: "Kit especial com visual rosa, ideal para presente.",
    tags: ["Presente", "Especial"],
  },
  {
    id: "slick-silicone",
    name: "Slick de Silicone 5ml / 10ml",
    category: "acessorios",
    description: "Container de silicone para extratos e concentrados. Diversas cores.",
    tags: ["Silicone", "Container"],
    forWholesale: true,
  },
  {
    id: "bolador",
    name: "Bolador de Cigarro",
    category: "acessorios",
    description: "Máquina para enrolar cigarros de forma rápida e uniforme.",
    tags: ["Prático", "Utilidade"],
  },
];
