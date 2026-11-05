/** Public, read-only CRM bridge. Never put administrator credentials in the storefront. */
export const CRM_BASE_URL = 'https://macumbiinha-crm.maodeouro-nexa.workers.dev';

export type PublicCatalogVariant = {
 id: string; sku: string; label: string; quantity: number; available: boolean;
 retail_cents: number; wholesale_cents: number; image_url?: string; gallery?: string[];
};
export type PublicCatalogItem = {
  id: string; slug: string; sku: string; name: string; category: string; description: string;
  tags: string[]; image_url: string; featured: boolean; for_wholesale: boolean;
  retail_cents: number; wholesale_cents: number; available: boolean; quantity: number;
  gallery?: string[]; variants?: PublicCatalogVariant[];
  updated_at?: string;
};
export type PublicSiteSettings = { announcement: string; hero_title: string; hero_subtitle: string; whatsapp: string };
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

export async function fetchSiteSettings(): Promise<PublicSiteSettings> {
 const response=await fetch(CRM_BASE_URL+'/api/public/site',{mode:'cors',cache:'no-store'});
 if(!response.ok)throw new Error('Configurações da loja indisponíveis');
 const data=await response.json() as {settings?:Partial<PublicSiteSettings>};
 return {
  announcement:String(data.settings?.announcement||''),
  hero_title:String(data.settings?.hero_title||''),
  hero_subtitle:String(data.settings?.hero_subtitle||''),
  whatsapp:String(data.settings?.whatsapp||'')
 };
}
