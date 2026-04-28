import { generateProductMetadata } from "@/lib/generate-product-metadata";
import type { Metadata } from "next";
import { ProductDetailClient } from "./product-detail-client";

// Dynamic metadata generation
async function getProductData(productId: string) {
  try {
    const response = await fetch("http://localhost:3000/products.json", {
      cache: "force-cache",
    });
    const data = await response.json();
    const productIndex = parseInt(productId.split("-")[1]);
    return data.products[productIndex];
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProductData(params.id);

  if (!product) {
    return {
      title: "Producto no encontrado | Aurentric Security",
      description: "El producto que buscas no existe",
    };
  }

  return generateProductMetadata(product, params.id);
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
