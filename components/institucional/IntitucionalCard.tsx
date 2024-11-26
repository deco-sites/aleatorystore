import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ButtonBanner from "site/components/ui/ButtonBanner.tsx";
import { clx } from "site/sdk/clx.ts";

interface Props {
  title?: string;
  /**
   * @format textarea
   */
  description: string;
  desktopCardPos: "left" | "right";
  mobileCardPos: "top" | "bottom";
  cta?: {
    url?: string;
    label?: string;
  };
  image: {
    /** @title Image */
    url: ImageWidget;
    alt: string;
    width: number;
    height: number;
  };
}

export default function InstitucionalCard(props: Props) {
  const cardPosDesktop = props.desktopCardPos === "left"
      ? "lg:flex-row"
      : "lg:flex-row-reverse",
    cardPosMobile = props.mobileCardPos === "top"
      ? "flex-col"
      : "flex-col-reverse";

  return (
    <article
      class={clx(
        "flex gap-10 mx-auto w-fit mt-16 mb-20 lg:my-20",
        cardPosDesktop,
        cardPosMobile,
      )}
    >
      <div class="flex flex-col gap-5 max-w-[460px] px-6 lg:px-[unset]">
        {props.title
          ? (
            <h2 class="text-[32px] uppercase tracking-[1px]">
              {props.title}
            </h2>
          )
          : null}

        <p
          class="text-sm font-light tracking-[1px] leading-[25px] text-black mx-0 lg:my-2.5 whitespace-break-spaces"
          dangerouslySetInnerHTML={{ __html: props.description }}
        />
        {props.cta && props.cta.url && props.cta.label && (
          <ButtonBanner href={props.cta.url}>{props.cta.label}</ButtonBanner>
        )}
      </div>
      <div>
        <Image
          src={props.image.url}
          alt={props.image.alt}
          width={props.image.width}
          height={props.image.height}
        />
      </div>
    </article>
  );
}
