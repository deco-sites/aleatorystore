import { ImageWidget } from "apps/admin/widgets.ts";

/** @title {{title}} */
interface Card {
    title: string;
    description: string;
    image: ImageWidget;
}

interface Props {
    cards: Card[];
}

export default function CashbackCards({ cards }: Props) {
    return (
        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-[30px] max-w-[1280px] mt-[45px] lg:px-14 mx-auto">
            {cards.map((card, index) => (
                <div
                    key={index}
                    class="bg-primary-100 px-[30px] py-[50px] flex items-center text-center flex-col"
                >
                    <img
                        src={card.image}
                        alt={card.title}
                        class="max-w-[128px]"
                    />
                    <h2 class="mt-8 mb-6 font-bold text-xl leading-5">
                        {card.title}
                    </h2>
                    <p class="text-primary-300">{card.description}</p>
                </div>
            ))}
        </div>
    );
}
