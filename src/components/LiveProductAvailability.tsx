'use client';
import {useEffect,useState} from 'react';
import {fetchPublishedCatalog,toCrmSku,brl,type PublicCatalogItem} from '@/lib/crm';

export default function LiveProductAvailability({productId,mode,compact=false}:{
 productId:string;mode:'varejo'|'atacado';compact?:boolean
}) {
 const [product,setProduct]=useState<PublicCatalogItem|null>(null);
 useEffect(()=>{
   let active=true;
   fetchPublishedCatalog().then(items=>{if(active)setProduct(items.get(toCrmSku(productId))||null)}).catch(()=>{});
   return()=>{active=false};
 },[productId]);
 if(!product)return null; // No false 'out of stock' while the ERP catalog is unconfigured/unavailable.
 return <div className={`crm-availability ${compact?'is-compact':''}`} aria-live="polite">
   <span className={product.available?'is-available':'is-unavailable'}>
     <i aria-hidden="true"/>{product.available?'Disponível no estoque':'Indisponível no momento'}
   </span>
   {!compact&&mode==='varejo'&&product.retail_cents>0&&<strong>{brl(product.retail_cents)}</strong>}
   {!compact&&<small>Informação atualizada pelo CRM. Confirme disponibilidade antes da compra.</small>}
 </div>;
}
