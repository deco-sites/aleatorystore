import { Product, ProductLeaf } from "apps/commerce/types.ts";

export const useProductField = (product: Product | undefined, property: string) => {
  const result = product?.isVariantOf?.additionalProperty.find((
    { name },
  ) => name === property)?.value;

  return result;
}

export const useAdditionalProperty = (product: Product | ProductLeaf | undefined | null, property: string) => {
  if (!product) return
  const result = product?.additionalProperty?.find((
    { name },
  ) => name === property)?.value;

  return result;
}