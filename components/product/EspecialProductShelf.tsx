import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { SendEventOnView } from "site/components/Analytics.tsx";
import ProductCard from "site/components/product/ProductCard.tsx";
import Icon from "site/components/ui/Icon.tsx";
import Slider from "site/components/ui/Slider.tsx";
import { clx } from "site/sdk/clx.ts";
import { useId } from "site/sdk/useId.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import { usePlatform } from "site/sdk/usePlatform.tsx";

export interface Props {
  title: RichText;
  card: {
    desktopPosition: "left" | "right";
    mobilePosition: "top" | "bottom";
    title: string;
    description: string;
    image: {
      url: ImageWidget;
      alt: string;
    };
    url: string;
  };
  products: Product[] | null;
}

function EspecialProductShelf({ products, title, card }: Props) {
  const id = useId();
  const platform = usePlatform();
  if (!products || products.length === 0) {
    return null;
  }
  const cardPosDesktop =
    card.desktopPosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse";
  const cardPosMobile =
    card.mobilePosition === "top" ? "flex-col" : "flex-col-reverse";
  return (
    <div class={clx("container w-full flex flex-col")}>
      <h2
        class="font-semibold [&>p>strong]:text-[#bc812e] [&>p>strong]:font-semibold text-center text-[32px] my-16 max-lg:px-6"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
      <div class={clx("flex gap-4", cardPosDesktop, cardPosMobile)}>
        <a
          href={card.url}
          class="w-full min-w-full lg:w-[475px] lg:min-w-[475px] group max-lg:carousel-item"
        >
          <article class="relative">
            <img
              src={card.image.url}
              class="rounded w-full object-cover"
              alt={card.image.alt}
            />
            <div
              class="absolute text-secondary-neutral-100 group-hover:text-[#a6b9ca] bottom-0 pb-9 left-0 z-10 w-full h-3/4 flex flex-col justify-end items-center"
              style={{
                background:
                  "linear-gradient(180deg,rgba(40,40,40,0) 7.16%,rgba(32,32,32,.42) 62.24%,rgba(25,25,25,.73) 99.97%)",
              }}
            >
              <p class="text-center mt-6 text-base leading-[18px]">
                {card.description}
              </p>
              <h2 class="text-[32px] leading-[38px] font-semibold text-center">
                {card.title}
              </h2>
            </div>
          </article>
        </a>
        <div
          class={clx(
            "relative grid",
            "grid-cols-[0px_1fr_0px] lg:grid-cols-[0px_1fr_0px] ml-4 sm:ml-0 max-lg:mb-[50px]"
          )}
          id={id}
        >
          <Slider class="relative carousel carousel-center col-start-2 col-end-2 row-start-1 row-end-4 gap-1 pr-4 sm:pr-0">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx("carousel-item w-1/2 lg:w-1/3")}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="absolute bottom-4 lg:bottom-[100px] right-20 w-full lg:w-[250px]">
            <div class="relative left-[80px] lg:left-auto lg:right-[187px] block z-10">
              <Slider.PrevButton class="absolute h-12 flex justify-center items-center top-3 lg:top-[27px]">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={0.01}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>

            <ul
              class={`absolute left-[110px] lg:left-auto lg:right-0 carousel grid grid-cols-${products.length} mt-[35px] lg:mt-[50px] items-end col-span-full z-10 row-start-4 w-[calc(100%-76px)] lg:w-[400px] m-auto bg-secondary-neutral-600`}
            >
              {products?.map((_, index) => (
                <li class="carousel-item w-full">
                  <Slider.Dot index={index} class="w-full">
                    <div class="w-full h-[2px] group-disabled:bg-dark-blue bg-transparent" />
                  </Slider.Dot>
                </li>
              ))}
            </ul>

            <div class="absolute right-[-42px] lg:right-0 block z-10">
              <Slider.NextButton class="absolute h-12 flex justify-center items-center top-3 lg:top-[27px] lg:left-[15px]">
                <Icon size={24} id="ChevronRight" strokeWidth={0.01} />
              </Slider.NextButton>
            </div>
          </div>

          <Slider.JS rootId={id} especially />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product, index) =>
                  mapProductToAnalyticsItem({
                    index,
                    product,
                    ...useOffer(product.offers),
                  })
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default EspecialProductShelf;
