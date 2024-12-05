import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "site/components/ui/Slider.tsx";
import { useId } from "site/sdk/useId.ts";

/** @title {{title}} */
interface Step {
    title: string;
    description: string;
    image: ImageWidget;
}
interface Props {
    title: string;
    steps: Step[];
}

const Arrow = () => (
    <Image
        src="https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.947/imagens/outros/arrow-right___1ca09338147b633cd7aa812c300d9fda.png"
        width={31}
        height={50}
        class="w-[31px] h-[50px] my-auto"
    />
);

function CashbackStepsDesktop(props: Props) {
    return (
        <div class="mb-20">
            <h2 class="text-2xl font-bold text-center uppercase mb-10 mt-20">
                {props.title}
            </h2>
            <div class="flex gap-5 justify-center">
                {props.steps.map((step, index) => (
                    <>
                        <div class="max-w-[270px] w-full shadow-cards-cashback border-t-8 border-transparent hover:border-primary-900 transition-all ease-linear">
                            <Image
                                width={265}
                                height={170}
                                src={step.image}
                                alt={step.title}
                            />
                            <div class="p-5 text-center">
                                <h3 class="text-xl font-semibold">
                                    {step.title}
                                </h3>
                                <p class="mt-3">{step.description}</p>
                            </div>
                        </div>
                        {index < props.steps.length - 1 && <Arrow />}
                    </>
                ))}
            </div>
        </div>
    );
}

function CashbackStepsMobile(props: Props) {
    const id = useId();
    return (
        <div class="mb-20" id={id}>
            <h2 class="text-2xl font-bold text-center uppercase mt-20 px-6">
                {props.title}
            </h2>
            <div class="flex gap-5 justify-center relative">
                <Slider.PrevButton class="absolute left-2.5 top-1/2 transform -translate-y-1/2">
                    <Image
                        src="https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.947/imagens/mobile/arrow-mobile-left___38f750ab5d05cec186da87826f02e34e.png"
                        width={25}
                        height={39}
                        class="w-[25px] h-[39px] my-auto"
                    />
                </Slider.PrevButton>
                <Slider class="carousel carousel-center w-screen">
                    {props.steps.map((step, index) => (
                        <Slider.Item
                            index={index}
                            class="carousel-item my-8 items-center"
                        >
                            <div class="mx-[calc((100vw_-270px)/2)] max-w-[270px] h-fit w-full shadow-cards-cashback border-t-8 border-primary-900 transition-all ease-linear">
                                <Image
                                    width={265}
                                    height={170}
                                    src={step.image}
                                    alt={step.title}
                                />
                                <div class="p-5 text-center">
                                    <h3 class="text-xl font-semibold">
                                        {step.title}
                                    </h3>
                                    <p class="mt-3">{step.description}</p>
                                </div>
                            </div>
                        </Slider.Item>
                    ))}
                </Slider>
                <div class="absolute bottom-2 flex justify-center gap-2">
                    {props.steps.map((_, index) => (
                        <Slider.Dot index={index}>
                            <div class="h-0.5 w-5 mt-1 bg-primary-400 group-disabled:bg-[#bc812e] group-disabled:mt-0 group-disabled:h-1.5 transition-all" />
                        </Slider.Dot>
                    ))}
                </div>
                <Slider.NextButton class="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                    <Image
                        src="https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.947/imagens/mobile/arrow-mobile-right___f2a5b4f2b3f6c4b3c5e2f8b3d4d3b3b.png"
                        width={25}
                        height={39}
                        class="w-[25px] h-[39px] my-auto"
                    />
                </Slider.NextButton>
            </div>
            <Slider.JS rootId={id} />
        </div>
    );
}

export default function CashbackSteps(props: Props) {
    const device = useDevice();
    return device === "desktop"
        ? <CashbackStepsDesktop {...props} />
        : <CashbackStepsMobile {...props} />;
}
