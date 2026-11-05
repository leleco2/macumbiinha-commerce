export type ShoppingMode = 'varejo' | 'atacado';

export type WhatsAppSelectionItem = {
  name: string;
  quantity: number;
};

export type WhatsAppMessageOptions = {
  items?: readonly WhatsAppSelectionItem[];
  productName?: string;
};

const cleanName = (value: string) => value.replace(/\s+/g, ' ').trim().slice(0, 160);

export function createWhatsAppMessage(
  mode: ShoppingMode,
  options: WhatsAppMessageOptions = {},
): string {
  const isWholesale = mode === 'atacado';
  const intro = isWholesale
    ? 'Olá, equipe Macumbiinha! Vim pelo site, na seção de atacado, e gostaria de conhecer as condições para revenda.'
    : 'Olá, equipe Macumbiinha! Vim pelo site, na seção de varejo, e gostaria de receber atendimento.';

  const items = (options.items ?? [])
    .filter(item => item && typeof item.name === 'string' && Number.isInteger(item.quantity) && item.quantity > 0)
    .slice(0, 80)
    .map(item => `- ${item.quantity} x ${cleanName(item.name)}`)
    .filter(line => line.length > 6);

  const productName = options.productName ? cleanName(options.productName) : '';
  const detail = items.length
    ? `Minha seleção:\n${items.join('\n')}\n\n`
    : productName
      ? `Tenho interesse neste produto: ${productName}.\n\n`
      : '';

  const request = isWholesale
    ? 'Podem informar tabela de preços, pedido mínimo, disponibilidade e condições de entrega?'
    : 'Podem confirmar preços, disponibilidade e opções de entrega?';

  return `${intro}\n\n${detail}${request}`;
}

export function createWhatsAppUrl(
  phone: string,
  mode: ShoppingMode,
  options: WhatsAppMessageOptions = {},
): string {
  const digits = phone.replace(/\D/g, '');
  if (!/^\d{12,15}$/.test(digits)) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(createWhatsAppMessage(mode, options))}`;
}
