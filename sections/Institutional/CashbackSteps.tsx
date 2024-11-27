import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";

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

function CashbackStepsDesktop(props: Props) {
    return (
        <div>
            <h2 class="text-2xl font-bold text-center uppercase">
                {props.title}
            </h2>
            <div class="flex">
                {props.steps.map((step, index) => (
                    <div class="max-w-[270px] w-full">
                        <img src={step.image} alt={step.title} />
                        <div class="p-5 text-center">
                            <h3 class="text-xl">{step.title}</h3>
                            <p class="mt-3">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CashbackStepsMobile(props: Props) {
    return (
        <div>
            Abaco
        </div>
    );
}

export default function CashbackSteps(props: Props) {
    const device = useDevice();
    return device === "desktop"
        ? <CashbackStepsDesktop {...props} />
        : <CashbackStepsMobile {...props} />;
}
