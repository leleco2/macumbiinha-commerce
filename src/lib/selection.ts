export type SelectionItem = { id: string; qty: number; variantSku?: string };
export const MAX_QUANTITY = 999;
const validSku = (value:unknown):value is string=>typeof value==='string'&&/^[A-Z0-9][A-Z0-9._-]{1,69}$/.test(value);
const selectionKey=(item:Pick<SelectionItem,'id'|'variantSku'>)=>item.id+'::'+(item.variantSku||'');

export function sanitizeSelection(value: unknown, validIds: readonly string[]): SelectionItem[] {
 if(!Array.isArray(value))return [];
 const allowed=new Set(validIds),quantities=new Map<string,SelectionItem>();
 for(const entry of value){
  if(!entry||typeof entry!=='object')continue;
  const {id,qty,variantSku}=entry as {id?:unknown;qty?:unknown;variantSku?:unknown};
  if(typeof id!=='string'||!allowed.has(id)||typeof qty!=='number'||!Number.isInteger(qty)||qty<1)continue;
  if(variantSku!==undefined&&!validSku(variantSku))continue;
  const item:SelectionItem={id,qty:Math.min(MAX_QUANTITY,qty),...(variantSku?{variantSku}:{})};
  const key=selectionKey(item),prior=quantities.get(key);
  if(prior)item.qty=Math.min(MAX_QUANTITY,prior.qty+item.qty);
  quantities.set(key,item);
 }
 return Array.from(quantities.values());
}

export function addToSelection(items:readonly SelectionItem[],id:string,quantity=1,variantSku?:string):SelectionItem[]{
 if(!id||!Number.isInteger(quantity)||quantity<1)return [...items];
 if(variantSku!==undefined&&!validSku(variantSku))return [...items];
 const amount=Math.min(MAX_QUANTITY,quantity),key=selectionKey({id,variantSku});
 const index=items.findIndex(item=>selectionKey(item)===key);
 if(index===-1)return [...items,{id,qty:amount,...(variantSku?{variantSku}:{})}];
 return items.map(item=>selectionKey(item)===key?{...item,qty:Math.min(MAX_QUANTITY,item.qty+amount)}:item);
}

export function sanitizeFavorites(value: unknown, validIds: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  return Array.from(new Set(value.filter((id): id is string => typeof id === 'string' && allowed.has(id))));
}

export function toggleSavedItem(favorites: readonly string[], id: string): string[] {
  return favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
}
