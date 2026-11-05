import type {Metadata} from 'next';
import QuoteRequestForm from '@/components/QuoteRequestForm';
export const metadata:Metadata={title:'Solicitar orçamento | Macumbiinha',description:'Envie sua seleção de acessórios para atendimento na Macumbiinha. Consulte disponibilidade, preço e entrega.',robots:{index:false,follow:true}};
export default function Solicitar(){return <QuoteRequestForm/>}
