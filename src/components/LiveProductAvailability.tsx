'use client';
import {useEffect,useState} from 'react';
import {fetchPublishedCatalog,toCrmSku,brl,type PublicCatalogItem} from '@/lib/crm';

export default function LiveProductAvailability({productId,sku,mode,compact=false}:{
 productId:string;sku?:string;mode:'varejo'|'atacado';compact?:boolean
}) {
 const [product,setProduct]=useState<PublicCatalogItem|null>(null);
 useEffect(()=>{
   let active=true;
   fetchPublishedCatalog().then(items=>{if(active)setProduct(items.get(sku||toCrmSku(productId))||null)}).catch(()=>{});
   return()=>{active=false};
 },[productId,sku]);
 if(!product)return null; // No false 'out of stock' while the ERP catalog is unconfigured/unavailable.
 return <div className={`crm-availability ${compact?'is-compact':''}`} aria-live="polite">
   <span className={product.available?'is-available':'is-unavailable'}>
     <i aria-hidden="true"/>{product.available?'Disponível no estoque':'Indisponível no momento'}
   </span>
   {!compact&&(mode==='varejo'?product.retail_cents>0:product.wholesale_cents>0)&&<strong>{brl(mode==='varejo'?product.retail_cents:product.wholesale_cents)}</strong>}
   {!compact&&<small>Informação atualizada pelo CRM. Confirme disponibilidade antes da compra.</small>}
 </div>;
}
