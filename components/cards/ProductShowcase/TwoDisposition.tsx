import { Picture, Source } from "apps/website/components/Picture.tsx";
import ButtonBanner from "../../ui/ButtonBanner.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props } from "./types.ts";

export default function TwoDisposition(props: Props) {
    const { title, subtitle, description, images: [imageOne, imageTwo], cta } =
        props;
    return (
        <article class="flex flex-col-reverse lg:flex-row mx-auto w-fit mt-32 lg:mt-10">
            <div class="lg:max-w-[35vw] w-full">
                <div className="w-[80%] lg:w-[70%] mx-auto lg:mx-0">
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
            <div class="flex">
                <a
                    class="w-[60%] overflow-hidden group relative right-[-50px] h-fit max-w-fit"
                    href={imageOne.productUrl}
                >
                    <div class="bg-[#fff] rounded-full w-6 h-6 flex justify-center items-center absolute top-[131px] lg:top-[264px] left-[10%] z-20">
                        <Icon id="ShoppingCart" size={24} />
                    </div>
                    <Picture>
                        <Source
                            media="(max-width: 767px)"
                            fetchPriority="auto"
                            src={imageOne.mobile}
                            width={187}
                            height={280}
                        />
                        <Source
                            media="{min-width: 768px}"
                            fetchPriority="auto"
                            src={imageOne.desktop}
                            width={418}
                            height={627}
                        />
                        <img
                            class="object-fill max-w-[418px] max-h-[627px] group-hover:scale-[1.12] transition-transform duration-300"
                            loading="lazy"
                            width={344}
                            height={500}
                            src={imageOne.desktop}
                            alt={imageOne.alt}
                        />
                    </Picture>
                </a>

                <a
                    href={imageTwo.productUrl}
                    class="mt-[150px] z-10 relative overflow-hidden group h-fit max-w-fit"
                >
                    <div class="bg-[#fff] rounded-full w-6 h-6 flex justify-center items-center absolute top-[131px] lg:top-[264px] left-[10%] z-20">
                        <Icon id="ShoppingCart" size={24} />
                    </div>
                    <Picture>
                        <Source
                            media="(max-width: 767px)"
                            fetchPriority="auto"
                            src={imageTwo.mobile}
                            width={187}
                            height={280}
                        />
                        <Source
                            media="{min-width: 768px}"
                            fetchPriority="auto"
                            src={imageTwo.desktop}
                            width={349}
                            height={522}
                        />
                        <img
                            class="object-fill max-w-[349px] max-h-[522px] group-hover:scale-[1.12] transition-transform duration-300"
                            loading="lazy"
                            width={344}
                            height={500}
                            src={imageTwo.desktop}
                            alt={imageTwo.alt}
                        />
                    </Picture>
                </a>
            </div>
        </article>
    );
}
