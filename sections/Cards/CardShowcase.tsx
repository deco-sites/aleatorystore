import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonBanner from "../../components/ui/ButtonBanner.tsx";

/**@title {{title}} */
interface Card {
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    /**@title Alternative Text */
    alt: string;
  };
}
interface Props {
  /** @minItems 3  */
  /** @maxItems 3 */
  cards: Card[];
}

export default function CardShowcase({
  cards,
}: Props) {
  if (cards.length !== 3) return null;
  return (
    <div class="flex flex-col gap-5 lg:gap-0 lg:flex-row w-fit mx-auto mt-[60px] lg:mb-10">
      {cards.map((card) => (
        <article
          key={card.title}
          class="mx-4 uppercase lg:first:top-10 lg:last:top-10 relative lg:w-1/3 "
        >
          <a
            href={card.cta.href}
            class="flex flex-col items-center text-[#000]"
          >
            <div class="group overflow-hidden">
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  fetchPriority="auto"
                  src={card.image.mobile}
                  width={334}
                  height={500}
                />
                <Source
                  media="{min-width: 768px}"
                  fetchPriority="auto"
                  src={card.image.desktop}
                  width={344}
                  height={500}
                />
                <img
                  class="object-fill max-w-[334px] max-h-[500px] group-hover:scale-[1.12] transition-transform duration-300"
                  loading="lazy"
                  width={344}
                  height={500}
                  src={card.image.desktop}
                  alt={card.image.alt}
                />
              </Picture>
            </div>
            <h3 class="font-normal text-2xl leading-6 mt-6">{card.title}</h3>
            <p class="mt-3 font-light text-sm">{card.description}</p>
            <ButtonBanner class="my-6" href={card.cta.href}>
              {card.cta.text}
            </ButtonBanner>
          </a>
        </article>
      ))}
    </div>
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
