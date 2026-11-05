import { products } from "@/data/products";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductClient id={id} />;
}
