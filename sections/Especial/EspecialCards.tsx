import { ImageWidget } from "apps/admin/widgets.ts";

/** @title {{ title }}*/
interface Card {
  title: string;
  description: string;
  image: {
    url: ImageWidget;
    alt: string;
  };
  cta: {
    label: string;
    url: string;
  };
}

interface Props {
  title: string;
  cards: Card[];
}

export default function EspecialCards(props: Props) {
  return (
    <div class="max-lg:pl-6">
      <h2 class="text-[32px] font-semibold text-center my-16 max-lg:pr-6">
        {props.title}
      </h2>
      <div class="max-lg:carousel flex gap-4 w-fit mx-auto lg:px-14 max-lg:pr-6">
        {props.cards.map((card) => (
          <a href={card.cta.url} class="lg:w-3/12 group max-lg:carousel-item">
            <article class="relative">
              <img
                src={card.image.url}
                class="rounded w-[318px] object-cover h-[449px]"
                alt={card.image.alt}
              />
              <div
                class="absolute text-secondary-neutral-100 group-hover:text-[#a6b9ca] bottom-0 pb-9 left-0 z-10 w-full h-3/4 flex flex-col justify-end items-center"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(40,40,40,0) 7.16%,rgba(32,32,32,.42) 62.24%,rgba(25,25,25,.73) 99.97%)",
                }}
              >
                <h2 class="text-[32px] leading-[38px] font-semibold text-center">
                  {card.title}
                </h2>
                <p class="text-center mt-6 text-base leading-[18px]">
                  {card.description}
                </p>
                <span class="underline text-base text-center leading-[18px] underline-offset-[16px] pt-4 pb-2">
                  {card.cta.label}
                </span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}
