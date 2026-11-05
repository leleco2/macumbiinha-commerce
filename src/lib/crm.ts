/** Public, read-only CRM bridge. Never put administrator credentials in the storefront. */
export const CRM_BASE_URL = 'https://macumbiinha-crm.maodeouro-nexa.workers.dev';

export type PublicCatalogItem = {
  sku: string; name: string; category: string; retail_cents: number;
  available: boolean; quantity: number;
};
export type PublicConfig = {form_enabled: boolean; site_key: string; version?: string};
let catalogCache: Map<string,PublicCatalogItem> | null = null;
let lastCatalogFetch=0;
let pendingCatalog: Promise<Map<string,PublicCatalogItem>> | null=null;
const CACHE_TTL=60_000;

export async function fetchPublishedCatalog(): Promise<Map<string,PublicCatalogItem>> {
  if(catalogCache && Date.now()-lastCatalogFetch<CACHE_TTL)return catalogCache;
  if(pendingCatalog)return pendingCatalog;
  pendingCatalog=(async()=>{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),6000);
    try {
      const response=await fetch(CRM_BASE_URL+'/api/public/catalog',{mode:'cors',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('CRM indisponível');
      const data=await response.json() as {items?:PublicCatalogItem[]};
      if(!Array.isArray(data.items))throw new Error('Catálogo inválido');
      catalogCache=new Map(data.items.filter(x=>typeof x.sku==='string').map(x=>[x.sku.toUpperCase(),x]));
      lastCatalogFetch=Date.now();
      return catalogCache;
    }finally{clearTimeout(timer);pendingCatalog=null}
  })();
  return pendingCatalog;
}
export const toCrmSku=(productId:string)=>productId.toUpperCase();
export const brl=(cents:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
