import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonBanner from "../../ui/ButtonBanner.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props } from "./types.ts";
export default function ThreeDispositon(props: Props) {
  const {
    images: [imageOne, imageTwo, imageThree],
    title,
    subtitle,
    description,
    cta,
  } = props;

  const imageOneContainerClass =
    "overflow-hidden group relative lg:h-fit max-w-full lg:max-w-fit block lg:ml-auto";
  const imageTwoContainerClass =
    "overflow-hidden group relative lg:h-fit max-w-fit block";
  const imageThreeContainerClass =
    "overflow-hidden group relative h-fit max-w-fit block mx-auto lg:mx-0";

  const imageOneContent = () => (
    <>
      {imageOne.showCart
        ? (
          <div class="bg-[#fff] rounded-full w-6 h-6 flex justify-center items-center absolute  top-1/2 -translate-y-1/2  left-[10%] z-20">
            <Icon id="ShoppingCart" size={24} />
          </div>
        )
        : null}
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority="auto"
          src={imageOne.mobile}
          width={383}
          height={403}
        />
        <Source
          media="{min-width: 768px}"
          fetchPriority="auto"
          src={imageOne.desktop}
          width={383}
          height={403}
        />
        <img
          class="object-cover h-full  lg:h-auto  lg:w-[383px] group-hover:scale-[1.12] transition-transform duration-300"
          loading="lazy"
          width={344}
          height={500}
          src={imageOne.desktop}
          alt={imageOne.alt}
        />
      </Picture>
    </>
  );
  const imageTwoContent = () => (
    <>
      {imageTwo.showCart
        ? (
          <div class="bg-[#fff] rounded-full w-6 h-6 flex justify-center items-center absolute  top-1/2 -translate-y-1/2  left-[10%] z-20">
            <Icon id="ShoppingCart" size={24} />
          </div>
        )
        : null}
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority="auto"
          src={imageTwo.mobile}
          width={535}
          height={411}
        />
        <Source
          media="{min-width: 768px}"
          fetchPriority="auto"
          src={imageTwo.desktop}
          width={535}
          height={411}
        />
        <img
          class="object-cover h-full lg:h-auto lg:w-[535px] group-hover:scale-[1.12] transition-transform duration-300"
          loading="lazy"
          width={344}
          height={500}
          src={imageTwo.desktop}
          alt={imageTwo.alt}
        />
      </Picture>
    </>
  );
  const imageThreeContent = () => (
    <>
      {imageThree.showCart
        ? (
          <div class="bg-[#fff] rounded-full w-6 h-6 flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-[10%] z-20">
            <Icon id="ShoppingCart" size={24} />
          </div>
        )
        : null}
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority="auto"
          src={imageThree.mobile}
          width={187}
          height={280}
        />
        <Source
          media="{min-width: 768px}"
          fetchPriority="auto"
          src={imageThree.desktop}
          width={431}
          height={609}
        />
        <img
          class="object-fill w-[431px] group-hover:scale-[1.12] transition-transform duration-300"
          loading="lazy"
          width={344}
          height={500}
          src={imageThree.desktop}
          alt={imageThree.alt}
        />
      </Picture>
    </>
  );

  return (
    <article class="flex flex-col lg:flex-row gap-4 mx-auto w-fit mt-32 lg:mt-10">
      <div class="flex lg:flex-col lg:gap-4 w-fit lg:w-auto mx-auto lg:mx-0">
        {imageOne.clickUrl
          ? (
            <a
              class={imageOneContainerClass}
              href={imageOne.clickUrl}
            >
              {imageOneContent()}
            </a>
          )
          : (
            <div class={imageOneContainerClass}>
              {imageOneContent()}
            </div>
          )}

        {imageTwo.clickUrl
          ? (
            <a
              class={imageTwoContainerClass}
              href={imageTwo.clickUrl}
            >
              {imageTwoContent()}
            </a>
          )
          : (
            <div class={imageTwoContainerClass}>
              {imageTwoContent()}
            </div>
          )}
      </div>
      <div class="flex flex-col gap-4 px-4 lg:px-0">
        {imageThree.clickUrl
          ? (
            <a
              class={imageThreeContainerClass}
              href={imageTwo.clickUrl}
            >
              {imageThreeContent()}
            </a>
          )
          : (
            <div class={imageThreeContainerClass}>
              {imageThreeContent()}
            </div>
          )}

        <div className="lg:max-w-[35vw]">
          <h3 class="text-[32px] uppercase tracking-[1px] mt-[26px]">
            {title}
          </h3>
          <h4 class="text-[15px] uppercase font-normal tracking-[2.5px] mb-2.5">
            {subtitle}
          </h4>
          <p class="text-sm font-light tracking-[1px] leading-[25px] text-black mx-0 my-2.5">
            {description}
          </p>
          <ButtonBanner class="!w-[200px] my-6" href={cta.href}>
            {cta.label}
          </ButtonBanner>
        </div>
      </div>
    </article>
  );
}
