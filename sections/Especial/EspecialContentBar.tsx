import { useDevice } from "@deco/deco/hooks";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "site/components/ui/Slider.tsx";
import { useId } from "site/sdk/useId.ts";

interface Item {
  label: string;
  image: ImageWidget;
  text: RichText;
}

interface Props {
  title: RichText;
  itens: Item[];
}

function EspecialContentBarDesktop(props: Props) {
  return (
    <div class="bg-secondary-neutral-200">
      <h2
        class="text-4xl font-semibold [&>p>strong]:text-[#bc812e] [&>p>strong]:font-semibold text-center pt-[70px] mb-[60px]"
        dangerouslySetInnerHTML={{
          __html: props.title,
        }}
      />
      <div class="flex pb-16">
        {props.itens.map((item) => (
          <div class="flex gap-2.5 items-center w-full justify-center border-r border-r-primary-300 last:border-r-0 ">
            <Image src={item.image} class="w-5 h-5" width={49} />
            <div
              class="text-[#8c8c8c] text-lg leading-[21px] whitespace-break-spaces"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EspecialContentBarMobile(props: Props) {
  const id = useId();
  return (
    <div class="bg-secondary-neutral-200 lg:px-0" id={id}>
      <h2
        class="text-4xl font-semibold [&>p>strong]:text-[#bc812e] [&>p>strong]:font-semibold text-center pt-[70px] mb-[60px] px-6"
        dangerouslySetInnerHTML={{
          __html: props.title,
        }}
      />
      <Slider class="carousel carousel-center w-full">
        <div class="flex pb-16">
          {props.itens.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-dvw justify-center"
            >
              <div class="flex gap-2.5 items-center">
                <Image
                  src={item.image}
                  class="w-5 h-5"
                  width={49}
                  height={49}
                />
                <div
                  class="text-[#8c8c8c] text-lg leading-[21px] whitespace-break-spaces"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            </Slider.Item>
          ))}
        </div>
      </Slider>
      <Slider.JS infinite={true} interval={2000} rootId={id} />
    </div>
  );
}

export default function EspecialContentBar(props: Props) {
  const device = useDevice();

  return device === "desktop"
    ? <EspecialContentBarDesktop {...props} />
    : <EspecialContentBarMobile {...props} />;
}
