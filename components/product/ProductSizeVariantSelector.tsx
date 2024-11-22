import { useSignal } from "@preact/signals";
import type {
  BreadcrumbList,
  Product,
  ProductLeaf,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import OutOfStock from "../../islands/OutOfStock.tsx";
import ProductSizebayButtons from "../../islands/ProductSizebayButtons.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSizeVariantOfferAvailability } from "../../sdk/useOfferAvailability.ts";
import { useAdditionalProperty } from "../../sdk/useProductField.ts";
import Button from "../ui/ButtonStyled.tsx";

type SizebayProps = {
  showButtons: string | null;
  urlChart: string;
  urlVfr: string;
  recommendedSize: string | null;
};

interface Props {
  product: Product;
  breadcrumb?: BreadcrumbList;
  sizebay: SizebayProps;
}

function SizeSelector({ product, breadcrumb, sizebay }: Props) {
  const signalProduct = useSignal<ProductLeaf | null>(null);
  const productQuantity = useSignal<number>(1);
  const errorMessage = useSignal<boolean>(false);
  const productColor = useAdditionalProperty(product, "Cor");

  const selectedProduct = signalProduct.value ? signalProduct.value : product;

  const stockQtd = selectedProduct.offers?.offers.find((offer) =>
    offer.identifier === "default"
  )?.inventoryLevel.value;

  const productSize = signalProduct.value
    ? useAdditionalProperty(selectedProduct, "Tamanho")
    : null;

  const hasProductSelected = !!signalProduct.value;
  const { isVariantOf } = product;
  const { offers } = selectedProduct;

  const {
    seller = "1",
    availability,
    price,
    listPrice,
  } = useOffer(offers);

  const variants = isVariantOf?.hasVariant;
  const filteredVariants = variants?.filter((variant) => {
    const variantColor = useAdditionalProperty(variant, "Cor") === productColor;
    return variantColor;
  });

  const handleChangeQuantity = (value: string) => {
    if (value === "minus" && productQuantity.value === 1) return;

    if (value === "plus") {
      return productQuantity.value = productQuantity.value + 1;
    }

    return productQuantity.value = productQuantity.value - 1;
  };

  const handleClick = (variant: ProductLeaf) => {
    window.history.pushState({}, "", variant.url);
    signalProduct.value = variant;
  };

  const eventItem = mapProductToAnalyticsItem({
    product: selectedProduct,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <>
      <span className="text-base text-dark-blue uppercase font-light">
        Tamanho: {productSize}
      </span>

      <ProductSizebayButtons
        {...sizebay}
      />

      <ul class="flex flex-row gap-3">
        {filteredVariants?.map((variant, index) => {
          const { sizeOfferIsAvailable } = useSizeVariantOfferAvailability(
            index,
            isVariantOf,
          );

          const variantSize = useAdditionalProperty(variant, "Tamanho");

          return (
            <li>
              <button
                onClick={() => handleClick(variant)}
              >
                <div>
                  <Avatar
                    content={variantSize!}
                    class={variantSize === productSize &&
                        !sizeOfferIsAvailable
                      ? "border-solid border-primary-600 border"
                      : ""}
                    variant={!sizeOfferIsAvailable
                      ? "disabled"
                      : sizeOfferIsAvailable &&
                          variantSize === productSize
                      ? "active"
                      : "default"}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div class="relative">
        {(stockQtd && stockQtd === 1)
          ? (
            <div class="bg-primary-900 py-1.5 px-2.5 min-w-[130px] absolute top-0 right-0 text-center text-xs leading-3 uppercase text-primary-100 w-fit">
              Ultima Peça
            </div>
          )
          : null}
        {!hasProductSelected
          ? (
            <div class="mt-6 sm:mt-10 flex flex-col gap-2 relative">
              <span
                class={errorMessage.value
                  ? "text-sm sm:text-base block text-error-medium absolute -top-7"
                  : "hidden"}
              >
                Selecione um Tamanho para continuar!
              </span>
              <Button
                class="w-full"
                negative
                onClick={() => errorMessage.value = true}
              >
                COMPRAR
              </Button>
            </div>
          )
          : null}
      </div>

      {signalProduct.value
        ? (
          <div class="mt-6 sm:mt-10 flex flex-col gap-2">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  <div class="flex gap-4 max-w-[190px] sm:max-w-[245px]">
                    <div class="flex items-center">
                      <button
                        class={`p-2 flex items-center justify-center border border-[#c3c3c3] ${
                          productQuantity.value === 1
                            ? "bg-[#f2f4f5]"
                            : "bg-transparent"
                        }`}
                        onClick={() => handleChangeQuantity("minus")}
                      >
                        <MinusIcon />
                      </button>
                      <span class="h-[42px] w-[42px] flex items-center justify-center border border-[#c3c3c3]">
                        {productQuantity.value}
                      </span>
                      <button
                        class="p-2 flex items-center justify-center border border-[#c3c3c3]"
                        onClick={() => handleChangeQuantity("plus")}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <AddToCartButtonVTEX
                      eventParams={{ items: [eventItem] }}
                      productID={signalProduct.value?.productID!}
                      seller={seller}
                      quantity={productQuantity.value}
                    />
                  </div>
                </>
              )
              : <OutOfStock productID={signalProduct.value?.productID!} />}
          </div>
        )
        : null}
    </>
  );
}

export default SizeSelector;

const PlusIcon = () => (
  <svg
    fill="#000000"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    id="plus"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <path
      id="primary"
      d="M5,12H19M12,5V19"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    fill="#000000"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    id="minus"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
  >
    <path
      id="primary"
      d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"
      style={{
        fill: "rgb(0, 0, 0)",
      }}
    />
  </svg>
);
