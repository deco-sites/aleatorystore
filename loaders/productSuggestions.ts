import { Product } from "apps/commerce/types.ts";
import { AppContext } from "../apps/deco/vtex.ts";

export interface Props {
  product: Product;
}

export default async function ProductSuggestions({ product }: Props, _req: Request, ctx: AppContext) {
  const suggestions = await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader({
    id: product.productID,
    crossSelling: "suggestions",
  });

  return suggestions;
}