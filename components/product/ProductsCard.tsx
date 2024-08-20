import { Product } from "apps/commerce/types.ts";
import { Device } from "deco/utils/userAgent.ts";
import { useUI } from "../../sdk/useUI.ts";
import ProductCard from "./ProductCard.tsx";

export default function ProductsCard(
  { products, device }: { products: Product[]; device: Device },
) {
  const { displayGridLayout } = useUI();

  if (!products) return null;

  return (
    <div
      class={device === "mobile"
        ? `grid grid-cols-${displayGridLayout} gap-4`
        : ""}
    >
      {products?.map((product, index) => (
        <ProductCard
          key={`product-card-${product.productID}`}
          product={product}
          preload={index === 0}
          index={index}
        />
      ))};
    </div>
  );
}
