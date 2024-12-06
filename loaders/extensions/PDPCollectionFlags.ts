import { ProductDetailsPage, PropertyValue } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { MasterDataSCEntity } from "site/loaders/extensions/ProductShelfCollectionsFlags.ts";
import { AppContext } from "site/apps/site.ts";

/**
 * @title VTEX Integration - PDP Collection Flags
 * @description Add extra data to your loader. This may harm performance
 */
export default function loader(
	_props: unknown,
	_req: Request,
	ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
	return async (productDetailsPage: ProductDetailsPage | null) => {
		if (!productDetailsPage) return null;
		if (!productDetailsPage.product.additionalProperty) return productDetailsPage;
		const productCollectionsIds = productDetailsPage.product.additionalProperty
			?.filter((property) => property.name === "cluster")?.map((property) =>
				property.propertyID
			);
		if (!productCollectionsIds) return productDetailsPage;
		if (!productCollectionsIds.length) return productDetailsPage;
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
		const collectionsFlagsToThisProduct = collections.filter((collection) =>
			productCollectionsIds.includes(collection.collection)
		);
		if (!collectionsFlagsToThisProduct.length) return productDetailsPage;
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
		productDetailsPage.product.additionalProperty =
			productDetailsPage.product.additionalProperty
				? [...productDetailsPage.product.additionalProperty, ...newProperties]
				: newProperties;
		return productDetailsPage;
	};
}
