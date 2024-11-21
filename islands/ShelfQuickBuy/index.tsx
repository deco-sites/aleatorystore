import { useSignal, useSignalEffect } from "@preact/signals";
import { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import ShefAddToCartButtonVtex from "../../components/product/AddToCartButton/vtex.tsx";
import { clx } from "../../sdk/clx.ts";

interface Props {
    product: Product;
}
type QuickBuy = {
    image: string;
    size: string;
    color: string;
    productId: string;
    skuId: string;
    isAvailable: boolean;
    //variant: ProductLeaf;
};

export default function Insland(props: Props) {
    const { product } = props;
    const selectedSize = useSignal<string | null>(null);
    const selectedColor = useSignal<string | null>(null);
    const informationForQuikBuy = product.isVariantOf?.hasVariant.map(
        (variant) => {
            const size = variant.additionalProperty?.find((attribute) =>
                attribute.name === "Tamanho"
            );
            const color = variant.additionalProperty?.find((attribute) =>
                attribute.name === "Cor"
            );
            const productId = variant.productID;
            const skuId = variant.sku;

            const isAvailable = variant.offers?.offers.some(
                (offer) => offer.availability.includes("InStock"),
            );
            //console.log("variant", isAvailable);
            return {
                image: variant.image?.[0].url,
                size: size?.value,
                color: color?.value,
                productId,
                skuId,
                isAvailable,
            };
        },
    ).filter((info) =>
        info.size && info.color && info.image && info.isAvailable !== undefined
    ) as QuickBuy[];

    const quikBuyColors = informationForQuikBuy?.reduce(
        (acc, curr) => {
            if (!curr) return acc;
            const hasColor = acc.find(({ name }) => name === curr.color);
            if (hasColor) return acc;
            acc.push({
                name: curr.color,
                image: curr.image,
            });
            return acc;
        },
        [] as {
            name: string;
            image: string;
        }[],
    );
    const quikBuySizes = informationForQuikBuy?.map((info) => info.size).reduce(
        (acc, curr) => {
            if (!curr) return acc;
            if (!acc.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        },
        [] as string[],
    );

    useSignalEffect(() => {
        const initialQuickBuy = informationForQuikBuy?.find(
            (info) => info.skuId === product.productID,
        );
        if (initialQuickBuy) {
            selectedSize.value = initialQuickBuy.size;
            selectedColor.value = initialQuickBuy.color;
        }
    });

    const currentProductId = informationForQuikBuy?.find(
        (info) =>
            info.size === selectedSize.value &&
            info.color === selectedColor.value,
    )?.skuId;

    const currentAnalysis = product.isVariantOf?.hasVariant.find(
        (info) => info.productID === currentProductId,
    );

    const eventParam = currentAnalysis
        ? mapProductToAnalyticsItem({
            product: currentAnalysis,
        })
        : null;
    const getColorAvaialability = (color: string) =>
        informationForQuikBuy?.filter((info) =>
            info.color === color && info.size === selectedSize.value &&
            info.isAvailable
        ).length > 0;
    const getSizeAvaialability = (size: string) =>
        informationForQuikBuy?.filter((info) =>
            info.size === size && info.color === selectedColor.value &&
            info.isAvailable
        ).length > 0;

    return (
        <div class="absolute bottom-[-50%] group-hover:bottom-0 w-full transition-all hidden lg:block">
            <div class="flex justify-center items-center flex-col gap-3 pt-3 bg-[rgba(255,255,255,0.3)]">
                <div class="flex gap-2">
                    {quikBuyColors?.map((color) => (
                        <button
                            id="color-btn"
                            class={clx(
                                "border-2 border-solid rounded-md",
                                color.name === selectedColor.value
                                    ? "border-primary-500"
                                    : "border-transparent",
                                getColorAvaialability(color.name)
                                    ? "cursor-pointer"
                                    : "cursor-not-allowed bg-opacity-50 pointer-events-none tooltip tooltip-top",
                            )}
                            disabled={!getColorAvaialability(color.name)}
                            data-color-name={color.name}
                            data-tip={!getColorAvaialability(color.name)
                                ? "Cor Indisponível"
                                : ""}
                            onClick={() => selectedColor.value = color.name}
                        >
                            <Image
                                src={color.image}
                                alt="placeholder"
                                class="w-8 h-8 rounded-md object-cover"
                                width={200}
                                height={200}
                            />
                        </button>
                    ))}
                </div>
                <div class="flex gap-2">
                    {quikBuySizes?.map((size) => (
                        <button
                            id="size-btn"
                            class={clx(
                                "bg-base-100 rounded-md min-w-8 w-fit h-8 min-h-[unset] p-0 border-2 border-solid",
                                size === selectedSize.value
                                    ? "border-primary-500"
                                    : "border-transparent",
                                getSizeAvaialability(size)
                                    ? "cursor-pointer hover:bg-primary-100"
                                    : "cursor-not-allowed bg-opacity-50 tooltip tooltip-top",
                            )}
                            data-size={size}
                            data-tip={!getSizeAvaialability(size)
                                ? "Tamanho Indisponível"
                                : ""}
                            disabled={!getSizeAvaialability(size)}
                            onClick={() => selectedSize.value = size}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <ShefAddToCartButtonVtex
                    productID={currentProductId ?? ""}
                    quantity={1}
                    seller="1"
                    label="Adicionar a Sacola"
                    eventParams={{
                        items: eventParam ? [eventParam] : [],
                    }}
                />
            </div>
        </div>
    );
}
