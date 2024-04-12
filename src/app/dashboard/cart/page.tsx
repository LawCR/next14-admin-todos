import { Product, products } from "@/features/products/data/products";
import { ItemCard, SummaryCard } from "@/features/shopping-cart";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Carrito de Compras",
  description: "Página de carrito de compras",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: {[key: string]: number}): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default function CartPage() {

  const cookiesStore = cookies()
  const cart = JSON.parse(cookiesStore.get('cart')?.value || '{}') as { [key: string]: number }
  const productsInCart = getProductsInCart(cart)
  
  const totalToPay = productsInCart.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity
  }, 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Carrito de Compras</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          {
            productsInCart.map(({ product, quantity }) => (
              <ItemCard key={product.id} product={product} quantity={quantity} />
            ))
          }
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <SummaryCard title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">S/. {totalToPay.toFixed(2)}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: S/.{(totalToPay * 0.15).toFixed(2)}
            </span>
          </SummaryCard>
        </div>
      </div>
    </div>
  );
}