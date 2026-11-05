/** Accent-insensitive catalog search shared by quick search and category pages. */
export type SearchableProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: readonly string[];
};

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}

export function searchCatalog<T extends SearchableProduct>(
  items: readonly T[],
  query: string,
  categoryLabels: Record<string,string> = {}
): T[] {
  const normalized=normalizeSearch(query);
  if(!normalized)return [...items];
  const words=normalized.split(/\s+/).filter(Boolean);
  return items
    .map((product,order)=>{
      const name=normalizeSearch(product.name);
      const tags=normalizeSearch(product.tags.join(' '));
      const category=normalizeSearch(categoryLabels[product.category]||product.category);
      const description=normalizeSearch(product.description);
      const searchable=[name,tags,category,description].join(' ');
      if(!words.every(word=>searchable.includes(word)))return null;
      const score=(name===normalized?200:0)+(name.startsWith(normalized)?90:0)+
        (name.includes(normalized)?45:0)+
        words.reduce((sum,word)=>sum+(name.includes(word)?12:0)+(tags.includes(word)?6:0)+(category.includes(word)?3:0),0);
      return {product,score,order};
    })
    .filter((result):result is {product:T;score:number;order:number}=>result!==null)
    .sort((a,b)=>b.score-a.score||a.order-b.order)
    .map(entry=>entry.product);
}
