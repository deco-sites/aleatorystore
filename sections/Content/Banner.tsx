import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  image: {
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
  };
}

export default function Banner({ image }: Props) {
  return (
    <Picture preload={true}>
      <Source
        media="(max-width: 767px)"
        fetchPriority={"high"}
        src={image.mobile.src}
        width={image.mobile.width}
        height={image.mobile.height}
      />
      <Source
        media="(min-width: 768px)"
        fetchPriority={"high"}
        src={image.desktop.src}
        width={image.desktop.width}
        height={image.desktop.height}
      />
      <img
        class="object-cover w-full h-full"
        loading={"eager"}
        src={image.desktop.src}
        alt={"quem somos banner"}
      />
    </Picture>
  );
}
