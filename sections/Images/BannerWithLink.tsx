import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
  desktop: {
    src: ImageWidget;
    width: number;
    height: number;
  };
  mobile: {
    src: ImageWidget;
    width: number;
    height: number;
  };
  alt: string;
  url: string;
}

export default function BannerWithLink(props: Props) {
  const { desktop, mobile, alt, url } = props;
  return (
    <a href={url} class="mt-10 block">
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority="auto"
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
        />
        <Source
          media="{min-width: 768px}"
          fetchPriority="auto"
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
        />
        <img
          class="object-fill w-full"
          loading="lazy"
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
