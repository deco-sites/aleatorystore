import { ProductListingPage, PropertyValue } from "apps/commerce/types.ts";
import { Document } from "apps/vtex/utils/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { AppContext } from "site/apps/site.ts";

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
 * @title VTEX Integration - Product List Page Collections Flags
 * @description Add extra data to your loader. This may harm performance
 */
export default function loader(
	_props: unknown,
	_req: Request,
	ctx: AppContext,
): ExtensionOf<ProductListingPage | null> {
	return async (listPage: ProductListingPage | null) => {
		if (!listPage) return null;
		if (listPage.products.length === 0) return listPage;

		const collections =
			(await ctx.invoke.site.loaders.searchDocumentsOnMasterData({
				fields: [
					"collection",
					"desktopFlagWidth",
					"flagImg",
					"mobileFlagWidth",
					"shelfFlagWidth",
					"mobileShelfFlagWidth",
				].join(","),
				acronym: "SC",
			})) as MasterDataSCEntity[];

		return {
			...listPage,
			products: listPage.products.map((product) => {
				const productCollectionsIds = product.additionalProperty?.filter((
					property,
				) => property.name === "cluster")?.map((property) => property.propertyID);
				const collectionsFlagsToThisProduct = collections.filter((collection) =>
					productCollectionsIds?.includes(collection.collection)
				);
				const newProperties: PropertyValue[] = collectionsFlagsToThisProduct.map((
					collection,
				) => ({
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
				product.additionalProperty = product.additionalProperty
					? [...product.additionalProperty, ...newProperties]
					: newProperties;
				return product;
			}),
		};
	};
}
