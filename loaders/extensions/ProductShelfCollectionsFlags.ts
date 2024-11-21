import { Product, PropertyValue } from "apps/commerce/types.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { Document } from "apps/vtex/utils/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

export interface MasterDataSCEntity extends Document {
  collection: string;
  desktopFlagWidth: string;
  flagImg: string;
  mobileFlagWidth: string;
  shelfFlagWidth: string;
  mobileShelfFlagWidth: string;
}

export interface ReturnedFlagValue {
  desktopFlagWidth: string;
  flagImg: string;
  mobileFlagWidth: string;
  shelfFlagWidth: string;
  mobileShelfFlagWidth: string;
}

/**
 * @title VTEX Integration - Product Shelf Collections Flags
 * @description Add extra data to your loader. This may harm performance
 */
export default function loader(_props: unknown, _req: Request, ctx: AppContext): ExtensionOf<Product[] | null> {
  return async (products: Product[] | null) => {
    if (!products) return null;
    const collections = (await ctx.invoke.vtex.loaders.masterdata.searchDocuments({
      fields: ["collection", "desktopFlagWidth", "flagImg", "mobileFlagWidth", "shelfFlagWidth", "mobileShelfFlagWidth"].join(","),
      acronym: "SC",
    })) as MasterDataSCEntity[];
    return products?.map((product) => {
      const productCollectionsIds = product.additionalProperty?.filter((property) => property.name === "cluster")?.map((property) => property.propertyID);
      const collectionsFlagsToThisProduct = collections.filter((collection) => productCollectionsIds?.includes(collection.collection));
      const newProperties: PropertyValue[] = collectionsFlagsToThisProduct.map((collection) => ({
        "@type": "PropertyValue",
        name: "collectionFlag",
        propertyID: collection.collection,
        value: JSON.stringify({
          desktopFlagWidth: collection.desktopFlagWidth,
          flagImg: collection.flagImg,
          mobileFlagWidth: collection.mobileFlagWidth,
          shelfFlagWidth: collection.shelfFlagWidth,
          mobileShelfFlagWidth: collection.mobileShelfFlagWidth,
        }),
      }));
      product.additionalProperty = product.additionalProperty ? [...product.additionalProperty, ...newProperties] : newProperties;
      return product;
    });
  };
}
