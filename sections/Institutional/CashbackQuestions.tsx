import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import ButtonBanner from "site/components/ui/ButtonBanner.tsx";
import Icon from "site/components/ui/Icon.tsx";

/** @title {{title}} */
interface Question {
  title: string;
  description: string;
}

interface Props {
  title: string;
  questions: Question[];
  imageDesktop: {
    src: ImageWidget;
    width: number;
    height: number;
    alt: string;
  };
  cta: {
    title: string;
    url: string;
  };
}

export default function CashbackSteps(props: Props) {
  return (
    <div class="mb-10 max-w-[1280px] mx-auto lg:px-14 flex flex-col items-center px-6">
      <h2 class="text-2xl font-bold text-center uppercase mb-10 mt-20">
        {props.title}
      </h2>
      <div class="flex flex-col lg:flex-row gap-5 justify-center">
        <div
          class="w-full flex flex-col gap-5 max-h-[573px] overflow-y-scroll lg:pr-5"
          style={{
            scrollbarColor: "#3b3b3b #e0e0e0",
            scrollbarWidth: "thin",
          }}
        >
          {props.questions.map((question) => (
            <details class="bg-secondary-neutral-300 group open:border-l-4 border-transparent open:border-primary-600">
              <summary class="flex justify-between items-center uppercase text-xl py-4 pl-10 pr-4 cursor-pointer">
                <span>{question.title}</span>
                <Icon
                  id="Plus"
                  width="20px"
                  height="20px"
                  class="float-right group-open:hidden"
                />
                <Icon
                  id="Minus"
                  width="20px"
                  height="20px"
                  strokeWidth={1}
                  class="float-right hidden group-open:block"
                />
              </summary>
              <p class="pb-4 pl-10 pr-4 text-sm">
                {question.description}
              </p>
            </details>
          ))}
        </div>
        <Image
          class="w-[508px]"
          src={props.imageDesktop.src}
          width={props.imageDesktop.width}
          height={props.imageDesktop.height}
          alt={props.imageDesktop.alt}
        />
      </div>
      <ButtonBanner
        negative
        href={props.cta.url}
        class="btn mt-20"
      >
        {props.cta.title}
      </ButtonBanner>
    </div>
  );
}
