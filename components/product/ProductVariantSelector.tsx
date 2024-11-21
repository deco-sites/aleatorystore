import { useScriptAsDataURI } from "@deco/deco/hooks";
import type { BreadcrumbList, Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import SizeSelector from "../../islands/ProductSizeVariantSelector.tsx";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useColorVariantPossibilities } from "../../sdk/useColorVariantPossibilities.ts";
import { useId } from "../../sdk/useId.ts";
import { useSimilarColors } from "../../sdk/useSimilarsColors.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  product: Product;
  breadcrumb?: BreadcrumbList;
  sizebay: {
    showButtons: string | null;
    urlChart: string;
    urlVfr: string;
    recommendedSize: string | null;
  };
}

const loadCarrousselButtons = (
  { nextButtonId, prevButtonId, carruselId }: {
    nextButtonId: string;
    prevButtonId: string;
    carruselId: string;
  },
) => {
  const nextButton = document.getElementById(nextButtonId);
  const prevButton = document.getElementById(prevButtonId);
  const carrusel = document.getElementById(carruselId);

  if (!carrusel || !nextButton || !prevButton) {
    return;
  }
  const calculateShowButtons = () => {
    if (carrusel.scrollLeft === 0) {
      prevButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    } else if (
      carrusel.scrollLeft === carrusel.scrollWidth - carrusel.clientWidth
    ) {
      nextButton.classList.add("hidden");
      prevButton.classList.remove("hidden");
    } else {
      nextButton.classList.remove("hidden");
      prevButton.classList.remove("hidden");
    }
  };

  carrusel.addEventListener("scroll", calculateShowButtons);
  const next = () => {
    carrusel.scrollLeft += carrusel.clientWidth;
  };

  const prev = () => {
    carrusel.scrollLeft -= carrusel.clientWidth;
  };

  if (carrusel.scrollWidth > carrusel.clientWidth) {
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", prev);
  }
};

function VariantSelector({ product, breadcrumb, sizebay }: Props) {
  const { url, isVariantOf, isSimilarTo } = product;
  const similarsColors = useSimilarColors(isSimilarTo);
  const isFirstRender = true;

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const colorPossibilities = useColorVariantPossibilities(hasVariant, product);

  const getActiveValue = (variantName: string) => {
    const variants = colorPossibilities[variantName];
    const relativeUrl = relative(url);
    const variantEntries = Object.entries(variants);
    for (const [value, link] of variantEntries) {
      if (relative(link.url) === relativeUrl) {
        return value;
      }
    }
    if (isFirstRender) {
      const [value, _] = variantEntries[0];
      return value;
    }
    return null;
  };
  const nextButtonId = useId();
  const prevButtonId = useId();
  const carruselId = useId();

  return (
    <ul className="flex flex-col gap-4">
      {Object.keys(colorPossibilities).map((name) => {
        const activeValue = getActiveValue(name);
        const variants = Object.entries(colorPossibilities[name]);

        if (name.startsWith("Cor")) {
          return (
            <li
              key={name}
              className="flex flex-col gap-2"
              data-name={activeValue}
            >
              <span className="text-base text-dark-blue uppercase font-light">
                Cor:{" "}
                <span className="text-paragraph-color capitalize">
                  {activeValue}
                </span>
              </span>
              <div class="w-full overflow-hidden relative">
                <button
                  class="absolute left-0 top-1/2 -translate-y-1/2 hidden"
                  id={prevButtonId}
                >
                  <Icon
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={0.2}
                    class="w-5"
                  />
                </button>
                <ul
                  className="carousel flex flex-row gap-3 w-full overflow-auto"
                  id={carruselId}
                >
                  {variants.map(([value, link]) => {
                    const relativeLink = relative(link.url);

                    return (
                      <li key={value}>
                        <a
                          href={relativeLink}
                          f-partial={relativeLink}
                          f-client-nav
                        >
                          <Image
                            src={link?.image!}
                            alt="product image"
                            width={64}
                            height={86}
                            class={clx(
                              "carousel-item w-[64px] h-[86px] min-w-[64px] object-cover",
                              activeValue === value
                                ? "border border-primary-900 border-solid"
                                : "",
                            )}
                          />
                        </a>
                      </li>
                    );
                  })}

                  {similarsColors?.map((item) => {
                    const relativeLink = relative(item.url);

                    return (
                      <li key={item.color}>
                        <a
                          href={relativeLink}
                          f-partial={relativeLink}
                          f-client-nav
                        >
                          <Image
                            src={item.image!}
                            alt="product image"
                            width={64}
                            height={86}
                            class={clx(
                              "carousel-item w-[64px] h-[86px] min-w-[64px] object-cover",
                              activeValue === item.color
                                ? "border border-primary-900 border-solid"
                                : "",
                            )}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <button
                  class="absolute right-0 top-1/2 -translate-y-1/2 hidden"
                  id={nextButtonId}
                >
                  <Icon
                    size={24}
                    id="ChevronRight"
                    strokeWidth={0.2}
                    class="w-5"
                  />
                </button>
              </div>
            </li>
          );
        }
      })}
      <script
        async
        src={useScriptAsDataURI(loadCarrousselButtons, {
          nextButtonId,
          prevButtonId,
          carruselId,
        })}
      />
      <SizeSelector
        product={product}
        breadcrumb={breadcrumb}
        sizebay={sizebay}
      />
    </ul>
  );
}

export default VariantSelector;
