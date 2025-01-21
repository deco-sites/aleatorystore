import { Device } from "@deco/deco/utils";
import { BreadcrumbList } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Breadcrumb from "../ui/Breadcrumb.tsx";

export interface CategoryBannerProps {
  title?: string;
  description?: string;
  imageDesktop?: string;
  imageMobile?: string;
  alt?: string;
  breadcrumb: BreadcrumbList["itemListElement"];
  device: Device;
  collectionName?: string;
  isCollectionPage?: boolean;
}

const SIZES = {
  DESKTOP: {
    width: 1920,
    height: 600,
  },
  MOBILE: {
    width: 375,
    height: 200,
  },
};

export default function CategoryBanner(props: CategoryBannerProps) {
  const {
    title,
    description,
    breadcrumb,
    device,
    imageDesktop,
    alt,
    imageMobile,
    collectionName,
    isCollectionPage,
  } = props;
  const image = device === "mobile" ? imageMobile : imageDesktop;

  if (!image) return null;
  const sizes = device === "mobile" ? SIZES.MOBILE : SIZES.DESKTOP;

  const collectionData = isCollectionPage
    ? {
      name: collectionName ?? "",
      item: collectionName ?? "",
    }
    : undefined;

  return (
    <article class="relative text-[#fff] before:absolute before:content-[''] before:w-full before:h-full before:bg-[rgba(0,0,0,0.3)] before:left-0 before:top-0 before:z-[2] mb-10">
      <Image
        class="w-full z-[1] block min-h-[450px] lg:min-h-[unset] object-cover"
        src={image}
        alt={alt}
        width={sizes.width}
        height={sizes.height}
      />
      <div class="absolute top-0 z-[3] p-6 2xl:p-[3.5rem]">
        <Breadcrumb
          textColor="text-[#fff] font-medium before:!opacity-100"
          itemListElement={breadcrumb}
          collectionBreadcrumb={collectionData}
        />
      </div>
      <div class="absolute top-1/2 -translate-y-1/2 z-[3] w-full px-6 lg:px-0 lg:right-6 2xl:right-[3.5rem] lg:max-w-[570px] text-center lg:text-left">
        {title ? <h1 class="text-4xl uppercase mb-4">{title}</h1> : undefined}
        {description
          ? <p dangerouslySetInnerHTML={{ __html: description }} />
          : undefined}
      </div>
    </article>
  );
}
