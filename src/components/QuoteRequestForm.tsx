'use client';

import {useEffect,useRef,useState,type FormEvent} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,CheckCircle2,MessageCircle,ShieldCheck} from 'lucide-react';
import {useShop} from '@/components/Shop';

import {store} from '@/data/store';
import {createWhatsAppUrl} from '@/lib/whatsapp';
import {CRM_BASE_URL,type PublicConfig} from '@/lib/crm';

type TurnstileAPI={
 render:(container:HTMLElement,settings:{sitekey:string;action:string;callback:(value:string)=>void;'expired-callback':()=>void;'error-callback':()=>void})=>string;
 remove:(widget:string)=>void;
 reset:(widget:string)=>void;
};
type WindowWithTurnstile=Window&{turnstile?:TurnstileAPI};

export default function QuoteRequestForm(){
 const {mode,items,catalog:products,siteSettings}=useShop();
 const [config,setConfig]=useState<PublicConfig|null>(null);
 const [state,setState]=useState<'loading'|'ready'|'offline'|'sending'|'sent'>('loading');
 const [token,setToken]=useState('');
 const [error,setError]=useState('');
 const [consent,setConsent]=useState(false);
 const [name,setName]=useState('');
 const [phone,setPhone]=useState('');
 const [email,setEmail]=useState('');
 const [message,setMessage]=useState('');
 const widgetNode=useRef<HTMLDivElement|null>(null);
 const widgetId=useRef<string|null>(null);
 const requestId=useRef<string>('');
 useEffect(()=>{
   const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),7000);
   fetch(CRM_BASE_URL+'/api/public/config',{mode:'cors',cache:'no-store',signal:controller.signal})
     .then(async result=>{if(!result.ok)throw Error('CRM offline');return result.json() as Promise<PublicConfig>})
     .then(data=>{if(controller.signal.aborted)return;setConfig(data);setState(data.form_enabled&&!!data.site_key?'ready':'offline')})
     .catch(()=>{if(!controller.signal.aborted)setState('offline')})
     .finally(()=>clearTimeout(timer));
   return()=>{controller.abort();clearTimeout(timer)};
 },[]);
 useEffect(()=>{
   if(state!=='ready'||!config?.site_key||!widgetNode.current)return;
   let disposed=false;
   const mount=()=>{
     const api=(window as WindowWithTurnstile).turnstile;
     if(disposed||!api||!widgetNode.current||widgetId.current)return;
     widgetId.current=api.render(widgetNode.current,{
       sitekey:config.site_key,action:'crm_request',callback:(value)=>setToken(value),
       'expired-callback':()=>setToken(''),
       'error-callback':()=>{setToken('');setError('Não foi possível validar a segurança. Recarregue a página.')}
     });
   };
   const existing=document.querySelector<HTMLScriptElement>('script[data-crm-turnstile]');
   const script=existing||document.createElement('script');
   if(!existing){
     script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
     script.async=true;script.defer=true;script.dataset.crmTurnstile='true';
     document.head.append(script);
   }
   script.addEventListener('load',mount);
   mount();
   return()=>{disposed=true;script.removeEventListener('load',mount);
     const api=(window as WindowWithTurnstile).turnstile;
     if(widgetId.current&&api){api.remove(widgetId.current);widgetId.current=null;}
   };
 },[config?.site_key,state]);
 const choice=items.map(item=>({item,product:products.find(p=>p.id===item.id)})).filter(x=>x.product);
 const submit=async(e:FormEvent<HTMLFormElement>)=>{
   e.preventDefault();if(state!=='ready'||!token||!consent)return;
   setState('sending');setError('');
   if(!requestId.current)requestId.current=crypto.randomUUID();
   try{
     const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
     let result:Response;
     try{result=await fetch(CRM_BASE_URL+'/api/public/lead',{
       method:'POST',mode:'cors',headers:{'Content-Type':'application/json'},signal:controller.signal,
       body:JSON.stringify({request_id:requestId.current,name:name.trim(),phone:phone.trim(),email:email.trim(),segment:mode,
         message:message.trim(),items:choice.map(({item,product})=>({sku:product!.sku||item.id.toUpperCase(),quantity:item.qty})),consent:true,turnstile_token:token})
     })}finally{clearTimeout(timer)}
     const data=await result.json() as {error?:string};
     if(!result.ok)throw new Error(data.error||'Não foi possível enviar a solicitação.');
     setState('sent');
   }catch(cause){
     setError(cause instanceof Error?cause.message:'Não foi possível enviar. Use o WhatsApp.');
     setToken('');setState('ready');
     const api=(window as WindowWithTurnstile).turnstile;
     if(widgetId.current&&api)api.reset(widgetId.current);
   }
 };
 return <main id="conteudo" className="wrap crm-request-page">
   <nav className="breadcrumb" aria-label="Localização"><Link href="/">Início</Link><ArrowRight size={13}/><span>Solicitar orçamento</span></nav>
   <div className="crm-request-grid">
    <section className="crm-request-intro">
     <span className="eyebrow">MACUMBIINHA / ATENDIMENTO</span>
     <h1>Pronto para dar o <em>próximo passo?</em></h1>
     <p>Compartilhe sua seleção com a equipe. Confirmaremos produtos, preços, estoque e entrega antes de qualquer pagamento.</p>
     <div className="crm-request-summary"><span className="eyebrow">SUA SELEÇÃO · {mode.toUpperCase()}</span>
       {choice.length?choice.map(({item,product})=><div className="crm-request-item" key={item.id}><span>{product!.name}</span><strong>{item.qty} un.</strong></div>):<p>Você ainda não selecionou produtos. Pode enviar uma mensagem geral ou <Link href="/catalogo/">explorar o catálogo</Link>.</p>}
     </div>
     <Link className="text-link" href="/catalogo/"><ArrowLeft size={16}/> Voltar ao catálogo</Link>
    </section>
    <section className="crm-request-panel" aria-label="Formulário de atendimento">
     {state==='sent'?<div className="crm-request-feedback"><CheckCircle2 size={47}/><h2>Solicitação recebida.</h2><p>Registramos seu interesse no atendimento da Macumbiinha. O envio não confirma um pedido, não reserva estoque e não realiza pagamento.</p><Link href="/" className="button">Voltar à loja <ArrowRight size={16}/></Link></div>:<>
       <span className="eyebrow">ATENDIMENTO PERSONALIZADO</span>
       <h2>Conte o que você procura.</h2>
       {state==='loading'&&<p className="crm-bridge-note">Verificando a conexão segura com nosso sistema...</p>}
       {state==='offline'&&<div className="crm-bridge-offline"><ShieldCheck size={26}/><h3>Formulário online ainda não ativado.</h3><p>O atendimento continua disponível pelo WhatsApp enquanto configuramos a integração segura.</p><a className="button" href={createWhatsAppUrl(siteSettings.whatsapp||store.whatsapp,mode,{items:choice.map(({item,product})=>({name:product!.name,quantity:item.qty}))})} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> Conversar pelo WhatsApp</a></div>}
       {(state==='ready'||state==='sending')&&<form className="crm-request-form" onSubmit={submit}>
        <label>Seu nome <span>*</span><input type="text" value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={120} autoComplete="name" placeholder="Como podemos chamar você?"/></label>
        <div className="crm-request-fields">
         <label>WhatsApp <span>*</span><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required minLength={8} maxLength={24} autoComplete="tel" placeholder="(21) 99999-9999"/></label>
         <label>E-mail (opcional)<input type="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={160} autoComplete="email" placeholder="voce@exemplo.com"/></label>
        </div>
        <label>O que você gostaria de saber?<textarea value={message} onChange={e=>setMessage(e.target.value)} maxLength={1000} rows={4} placeholder="Dúvidas sobre modelos, quantidades, frete..."/></label>
        <label className="crm-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>Autorizo que a Macumbiinha use meus dados para responder esta solicitação. Não estou realizando uma compra nem autorizando mensagens de marketing.</span></label>
        <div ref={widgetNode} className="crm-turnstile" aria-label="Verificação de segurança"/>
        {error&&<p className="crm-request-error" role="alert">{error}</p>}
        <button className="button crm-submit" type="submit" disabled={!token||!consent||state==='sending'}>{state==='sending'?'Enviando solicitação...':'Enviar para atendimento'}<ArrowRight size={17}/></button>
        <p className="crm-request-disclaimer">Seus dados serão enviados ao CRM da Macumbiinha. A seleção não reserva estoque nem gera cobrança.</p>
       </form>}
     </>}
    </section>
   </div>
 </main>;
}
