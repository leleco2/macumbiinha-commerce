export type SelectionItem = { id: string; qty: number };
export const MAX_QUANTITY = 999;

export function sanitizeSelection(value: unknown, validIds: readonly string[]): SelectionItem[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  const quantities = new Map<string, number>();
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const { id, qty } = item as { id?: unknown; qty?: unknown };
    if (typeof id !== 'string' || !allowed.has(id) || typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1) continue;
    quantities.set(id, Math.min(MAX_QUANTITY, (quantities.get(id) || 0) + qty));
  }
  return Array.from(quantities, ([id, qty]) => ({ id, qty }));
}

export function addToSelection(items: readonly SelectionItem[], id: string, quantity = 1): SelectionItem[] {
  if (!id || !Number.isInteger(quantity) || quantity < 1) return [...items];
  const amount = Math.min(MAX_QUANTITY, quantity);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return [...items, { id, qty: amount }];
  return items.map(item => item.id === id ? { ...item, qty: Math.min(MAX_QUANTITY, item.qty + amount) } : item);
}

export function sanitizeFavorites(value: unknown, validIds: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  return Array.from(new Set(value.filter((id): id is string => typeof id === 'string' && allowed.has(id))));
}

export function toggleSavedItem(favorites: readonly string[], id: string): string[] {
  return favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
}
