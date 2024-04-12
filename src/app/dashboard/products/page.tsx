import { ProductCard } from "@/features/products";
import { products } from "@/features/products/data/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description: "Página de productos",
};

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
}