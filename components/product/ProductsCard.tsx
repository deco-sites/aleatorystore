import { Device } from "@deco/deco/utils";
import { Product } from "apps/commerce/types.ts";
import { useUI } from "site/sdk/useUI.ts";
import ProductCard from "site/components/product/ProductCard.tsx";

export interface Props {
  products: Product[];
  device: Device;
}

const styles = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function ProductsCard({ products, device }: Props) {
  const { mobileDisplayGrid, desktopDisplayGrid } = useUI();
  if (!products) {
    return null;
  }
  const displayGrid =
    styles[
      device === "mobile"
        ? mobileDisplayGrid.value
        : desktopDisplayGrid.value
    ];
  return (
    <div
      id="result-grid"
      class={`grid ${displayGrid} gap-4`}
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
