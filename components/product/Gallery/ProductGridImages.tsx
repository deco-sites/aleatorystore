import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Video from "apps/website/components/Video.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import { ReturnedFlagValue } from "../../../loaders/extensions/PLPCollectionFlags.ts";
import { useId } from "../../../sdk/useId.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { usePercentualDiscount } from "../../../sdk/usePercentualPrice.ts";
import { useProductVariantDiscount } from "../../../sdk/useProductVariantDiscount.ts";
import { useUI } from "../../../sdk/useUI.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

const WIDTH = 1000;
const HEIGHT = 1370;
const ASPECT_RATIO = `${WIDTH}/${HEIGHT}`;

export default function ProductGridImages(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product },
    layout,
  } = props;

  const { image: images = [], video: videos } = product;

  const { width, height } = layout || { width: 1200, height: 1480 };

  const aspectRatio = `${width} / ${height}`;
  const remapedVideos = videos ? videos : [];
  const productVideo = remapedVideos[0];

  const { productVariantDiscount } = useProductVariantDiscount(product);
  const { offers } = productVariantDiscount;

  const {
    price = 0,
    listPrice,
  } = useOffer(offers);

  const hasDiscount = (listPrice ?? 0) > (price ?? 0);

  const productPercentualOff = hasDiscount &&
    usePercentualDiscount(listPrice!, price!);

  const { displayProductZoomModal } = useUI();

  const handleClick = () => {
    displayProductZoomModal.value = true;
  };

  const flags = product.additionalProperty?.filter(
    (property) => property.name === "collectionFlag",
  )
    .filter((property) => property.value)
    .map((property) => JSON.parse(property.value!)) as ReturnedFlagValue[];
  return (
    <div id={id} class="">
      {/* Image Slider */}
      <div class="sm:hidden relative order-1 sm:order-2">
        {productPercentualOff && (
          <div class="bg-[#f6f4f3] absolute flex flex-col items-center justify-center w-[55px] h-[55px] text-[13px] leading-[1.45] font-bold text-black border z-[3] border-solid border-black left-[91.666667%] transform -translate-x-full top-4">
            <span>{productPercentualOff}%</span>
            OFF
          </div>
        )}
        <div class="absolute flex flex-col z-[3] right-auto left-0 top-4">
          {flags.map((flag) => (
            <img
              src={flag.flagImg}
              style={{
                width: flag.shelfFlagWidth,
                height: "auto",
              }}
            />
          ))}
        </div>
        <Slider class="carousel w-screen sm:w-[40vw] mt-4 sm:mt-0">
          {images?.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-11/12 mr-[14px]"
              onClick={handleClick}
            >
              <Image
                class="w-full"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute top-2 right-2 bg-secondary-neutral-100 rounded-full">
          <ProductImageZoom
            images={images ?? []}
          />
        </div>
      </div>

      <div class="hidden relative order-1 sm:order-2 sm:grid grid-cols-2 gap-[10px]">
        {productPercentualOff && (
          <div class="bg-[#f6f4f3] absolute flex flex-col items-center justify-center w-[55px] h-[55px] text-[13px] leading-[1.45] font-bold text-black border z-[3] border-solid border-black left-auto right-0">
            <span>{productPercentualOff}%</span>
            OFF
          </div>
        )}

        <div class="absolute flex flex-col z-[3] right-auto left-0 top-0">
          {flags.map((flag) => (
            <img
              src={flag.flagImg}
              style={{
                width: flag.shelfFlagWidth,
                height: "auto",
              }}
            />
          ))}
        </div>

        {images?.slice(0, 1).map((image, index) => {
          return (
            <figure
              key={index}
              style={{ aspectRatio: ASPECT_RATIO }}
              class="hover:cursor-zoom-in"
              onClick={handleClick}
            >
              <Image
                src={image.url!}
                alt={image.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio: ASPECT_RATIO }}
                preload={true}
                loading={"eager"}
                decoding={"async"}
              />
            </figure>
          );
        })}
        {productVideo && (
          <figure
            style={{
              aspectRatio: ASPECT_RATIO,
              maxWidth: WIDTH,
              maxHeightheight: HEIGHT,
            }}
            class="relative hover:cursor-zoom-in"
            onClick={handleClick}
          >
            <Video
              src={productVideo.contentUrl!}
              width={WIDTH}
              height={HEIGHT}
              muted
              loading={"lazy"}
              decoding={"async"}
              autoPlay
              playsInline
              playsinline
              loop
              class="object-cover w-full h-full"
              style={{
                aspectRatio: ASPECT_RATIO,
              }}
            />
          </figure>
        )}

        {images?.slice(1).map((image, index) => {
          return (
            <figure
              key={index}
              style={{ aspectRatio: ASPECT_RATIO }}
              class="hover:cursor-zoom-in"
              onClick={handleClick}
            >
              <Image
                src={image.url!}
                alt={image.alternateName}
                width={WIDTH}
                height={HEIGHT}
                style={{ aspectRatio: ASPECT_RATIO }}
                preload={false}
                loading={"lazy"}
                decoding={"async"}
              />
            </figure>
          );
        })}

        <div class="absolute top-2 right-2 bg-secondary-neutral-100 rounded-full">
          <ProductImageZoom
            images={images ?? []}
          />
        </div>
      </div>

      <Slider.JS rootId={id} />
    </div>
  );
}
