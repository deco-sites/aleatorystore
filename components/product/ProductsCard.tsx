import { Device } from "@deco/deco/utils";
import { Product } from "apps/commerce/types.ts";
import { useUI } from "site/sdk/useUI.ts";
import ProductCard from "site/components/product/ProductCard.tsx";

export interface Props {
  products: Product[];
  device: Device;
}

export default function ProductsCard({ products, device }: Props) {
  const { displayGridLayout } = useUI();
  if (!products) {
    return null;
  }
  return (
    <div
      id="result-grid"
      class={device === "mobile"
        ? `grid grid-cols-${displayGridLayout} gap-4`
        : "grid grid-cols-4 gap-4"}
    >
      {products?.map((product, index) => (
        <ProductCard
          key={`product-card-${product.productID}`}
          product={product}
          preload={index === 0}
          index={index}
        />
      ))}
    </div>
  );
}
