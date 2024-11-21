import type { Product } from "apps/commerce/types.ts";
import { useProductField } from "./useProductField.ts";

export const useSimilarColors = (isSimilarTo: Product[] | undefined | null) => {
  if (!isSimilarTo || isSimilarTo.length === 0) return undefined;

  const similarColors = isSimilarTo.map((similar) => {
    return {
      url: similar.url ?? "",
      sku: similar.sku ?? "",
      color: similar.additionalProperty?.find((property) => property.name === "Cor")?.value ?? "",
      specificColor: useProductField(similar, "Cor exata"),
      image: similar?.image?.[0]?.url,
    };
  });

  return similarColors;
};
