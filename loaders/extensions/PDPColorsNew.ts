import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

type ColorsResult = Record<string, { url: string; image: string }>;

/**
 * @title VTEX Integration - Product Details Page Colors from Cross Selling Similar
 * @description Add extra data to your loader. This may harm performance
 */
export default function loader(_props: unknown, _req: Request, ctx: AppContext): ExtensionOf<ProductDetailsPage | null> {
  return async (productDetailsPage: ProductDetailsPage | null) => {
    const productId = productDetailsPage?.product.isVariantOf?.productGroupID;
    if (!productId) return productDetailsPage;
    const results = await ctx.invoke.vtex.loaders.legacy.relatedProductsLoader({ id: productId, crossSelling: "suggestions" });

    if (!results?.length) return productDetailsPage;
    const colors: ColorsResult = {};

    results?.forEach((product) => {
      if (!product) return;
      const colorUrl = product.url;
      if (!colorUrl) return;
      const imageUrl = product.image?.[0].url;
      if (!imageUrl) return;
      const color = product?.additionalProperty?.find((property) => property.name === "Cor");
      if (!color) return;
      const colorName = color.value;
      if (!colorName) return;
      colors[colorName] = { url: colorUrl, image: imageUrl };
    });

    if (!Object.keys(colors).length) return productDetailsPage;

    const colorsFromSimilarsAdditionalProperty: PropertyValue = {
      "@type": "PropertyValue",
      name: "Colors from Similar Products",
      value: JSON.stringify(colors),
    };

    return {
      ...productDetailsPage,
      product: {
        ...productDetailsPage?.product,
        additionalProperty: [...(productDetailsPage?.product.additionalProperty ?? []), colorsFromSimilarsAdditionalProperty],
      },
    };
  };
}
