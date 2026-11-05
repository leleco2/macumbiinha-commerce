import type {Product} from '@/data/products';
import {products as legacyProducts,categories} from '@/data/products';
import type {PublicCatalogItem} from './crm';

const knownCategories=new Set(categories.map(c=>c.id));
/** A CRM publication is authoritative; legacy metadata is only used as a missing-photo fallback. */
export function crmToProducts(items:readonly PublicCatalogItem[]):Product[]{
 const existing=new Map(legacyProducts.map(p=>[p.id.toUpperCase(),p]));
 const seen=new Set<string>();
 return items.filter(item=>item&&typeof item.sku==='string'&&typeof item.name==='string')
 .map(item=>{
  const slug=/^[a-z0-9][a-z0-9._-]{1,79}$/.test(item.slug||'')?item.slug:item.sku.toLowerCase();
  if(seen.has(slug))return null;
  seen.add(slug);
  const old=existing.get(item.sku.toUpperCase());
  const image=/^https:\/\//.test(item.image_url||'')?item.image_url:old?.image;
  const category=knownCategories.has(item.category)?item.category:'acessorios';
  return {
   id:slug,sku:item.sku,name:item.name,category,description:item.description||old?.description||'',
   image,tags:Array.isArray(item.tags)?item.tags.slice(0,8):old?.tags||[],
   featured:!!item.featured,forWholesale:!!item.for_wholesale,
   retail_cents:Number(item.retail_cents)||0,wholesale_cents:Number(item.wholesale_cents)||0,
   quantity:Number(item.quantity)||0,available:!!item.available,source:'crm' as const
  };
 }).filter((p):p is Product=>p!==null);
}
const legacyIds=new Set(legacyProducts.map(x=>x.id));
export function productHref(product:Pick<Product,'id'>):string{
 return legacyIds.has(product.id)?'/produto/'+encodeURIComponent(product.id)+'/':'/item/?sku='+encodeURIComponent(product.id);
}
export function visiblePrice(product:Product,mode:'varejo'|'atacado'):number{
 return mode==='atacado'?(product.wholesale_cents||0):(product.retail_cents||0);
}
