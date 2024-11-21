import { useDevice } from "@deco/deco/hooks";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import QuickBuy from "../../islands/ShelfQuickBuy/index.tsx";
import { ReturnedFlagValue } from "../../loaders/extensions/ProductShelfCollectionsFlags.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantOfferAvailability } from "../../sdk/useOfferAvailability.ts";
import { usePercentualDiscount } from "../../sdk/usePercentualPrice.ts";
import { useProductVariantDiscount } from "../../sdk/useProductVariantDiscount.ts";
interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const { url, productID, image: images, isVariantOf } = product;
  const device = useDevice();
  const randomId = useId();
  const id = `product-card-${productID}-${randomId}`;
  const [front, back] = images ?? [];
  const { productVariantDiscount } = useProductVariantDiscount(product);
  const { offers } = productVariantDiscount;
  const { listPrice, price, installments } = useOffer(offers);
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  const { hasOfferAvailable } = useVariantOfferAvailability(isVariantOf);

  const hasDiscount = (listPrice ?? 0) > (price ?? 0);

  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(listPrice!, price!);

  const flags = product.additionalProperty?.filter(
    (property) => property.name === "collectionFlag",
  )
    .filter((property) => property.value)
    .map((property) => JSON.parse(property.value!)) as ReturnedFlagValue[];

  return (
    <div
      id={id}
      data-product-id={productID}
      data-deco="view-product"
      class="card card-compact group w-full lg:border lg:border-transparent lg:hover:border-inherit mb-4"
    >
      {/* Add click event to dataLayer */}
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      <div class="flex flex-col gap-2 group">
        <div class="relative overflow-hidden">
          <figure
            class="relative overflow-hidden"
            style={{ aspectRatio }}
          >
            {productPercentualOff && (
              <div class="bg-[#f6f4f3] absolute flex flex-col items-center justify-center w-[55px] h-[55px] text-[13px] leading-[1.45] font-bold text-black border z-[3] border-solid border-black left-auto right-0 top-0">
                <span>{productPercentualOff}%</span>
                OFF
              </div>
            )}
            <div class="absolute flex flex-col z-[3] right-auto left-0 top-0">
              {flags.map((flag) => (
                <img
                  src={flag.flagImg}
                  style={{
                    width: device === "desktop"
                      ? flag.shelfFlagWidth
                      : flag.mobileShelfFlagWidth,
                    height: "auto",
                  }}
                />
              ))}
            </div>
            {/* Product Images */}
            <a
              href={relativeUrl}
              aria-label="view product"
              class={clx(
                "absolute top-0 left-0",
                "grid grid-cols-1 grid-rows-1",
                "w-full",
              )}
            >
              <Image
                src={front.url!}
                alt={front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-secondary-neutral-100",
                  "object-cover",
                  "w-full",
                  "col-span-full row-span-full",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                preload={preload}
                loading={preload ? "eager" : "lazy"}
                decoding="async"
              />
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio }}
                class={clx(
                  "bg-secondary-neutral-100",
                  "object-cover",
                  "w-full",
                  "col-span-full row-span-full",
                  "transition-opacity opacity-0 ",
                  "lg:group-hover:opacity-100",
                )}
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            </a>
          </figure>
          {/* Quick Buy */}
          <QuickBuy product={product} />
        </div>
        <div class="flex flex-col">
          <h2
            class="truncate text-base lg:text-base font-normal text-dark-blue ml-2 mt-3 uppercase"
            dangerouslySetInnerHTML={{ __html: isVariantOf?.name ?? "" }}
          />
        </div>

        {/* Price from/to */}
        <div class="flex gap-2 items-center justify-start text-dark-blue ml-2 font-light">
          {hasOfferAvailable
            ? (
              <div class="flex justify-between w-full">
                <div class="flex gap-1 items-center">
                  {hasDiscount && (
                    <span class="line-through text-[10px] sm:text-sm text-[#9AA4B2] font-bold">
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </span>
                  )}
                  <span class="font-bold text-xs sm:text-base">
                    {formatPrice(price, offers?.priceCurrency)}
                  </span>
                </div>
                <span class="flex justify-end gap-2 text-[10px] sm:text-sm truncate font-bold uppercase">
                  {installments}
                </span>
              </div>
            )
            : <span>Indisponível</span>}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
