import type { BreadcrumbList, Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import SizeSelector from "../../islands/ProductSizeVariantSelector.tsx";
import { relative } from "../../sdk/url.ts";
import { useColorVariantPossibilities } from "../../sdk/useColorVariantPossibilities.ts";
import { useSimilarColors } from "../../sdk/useSimilarsColors.ts";

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
              <ul className="flex flex-row gap-3">
                {variants.map(([value, link]) => {
                  const relativeLink = relative(link.url);

                  return (
                    <li key={value}>
                      <button f-partial={relativeLink} f-client-nav>
                        <Image
                          src={link?.image!}
                          alt="product image"
                          width={64}
                          height={86}
                          class={activeValue === value
                            ? "border border-primary-900 border-solid"
                            : ""}
                        />
                      </button>
                    </li>
                  );
                })}

                {similarsColors?.map((item) => {
                  const relativeLink = relative(item.url);

                  return (
                    <li key={item.color}>
                      <button f-partial={relativeLink} f-client-nav>
                        <Image
                          src={item.image!}
                          alt="product image"
                          width={64}
                          height={86}
                          class={activeValue === item.color
                            ? "border border-primary-900 border-solid"
                            : ""}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }
      })}
      <SizeSelector
        product={product}
        breadcrumb={breadcrumb}
        sizebay={sizebay}
      />
    </ul>
  );
}

export default VariantSelector;
