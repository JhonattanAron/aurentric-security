"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart, type Product } from "@/lib/cart-context";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ProductData {
  product_name: string;
  category: string;
  price_usd?: number;
  pricing?: {
    full_price_usd: number;
  };
  description: string;
  features?: string[];
  installation?: {
    included: boolean;
  };
}

export function ProductosClient() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();

        const loadedProducts: Product[] = data.products.map(
          (item: ProductData, index: number) => ({
            id: `product-${index}`,
            name: item.product_name,
            brand: item.category,
            price: item.price_usd || item.pricing?.full_price_usd || 0,
            image: `/product-${index}.jpg`,
            category: item.category,
            description: item.description,
          }),
        );

        setProducts(loadedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando productos...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const uniqueCategories = [
    "Todos",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Catálogo de Productos
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Equipos de seguridad de las mejores marcas del mercado
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {uniqueCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent hover:bg-secondary"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <Link key={product.id} href={`/productos/${product.id}`}>
                  <Card className="group h-full overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-secondary">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="mb-1 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-primary text-primary"
                          />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">
                          (4.8)
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {product.brand}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Ver</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
