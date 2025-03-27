import { useId } from "../sdk/useId.ts";

const defaultValues: Benefit[] = [
  {
    title: "ATÉ 10X SEM JUROS",
  },
  {
    title: "FRETE GRÁTIS ACIMA DE R$ 499",
  },
  {
    title: "2.5% de CashBack",
    description: "em todas as compras faturadas",
  },
];

/** @titleBy title */
export interface Benefit {
  title: string;
  description?: string;
}
export interface Props {
  items: Benefit[];
}

export default function Benefits(
  { items = defaultValues }: Props,
) {
  const id = useId();
  return (
    <div class="bg-[#000] text-[#fff] py-2">
      <div
        id={id}
        class={`lg:container mx-6 lg:mx-auto grid gap-2 lg:gap-4 grid-cols-1 place-items-center lg:grid-cols-3 text-center px-4`}
      >
        {items.map((item) => (
          <div class="flex flex-col items-center justify-center max-w-72">
            <h3 class="text-lg my-1 uppercase font-normal">
              {item.title}
            </h3>
            <p
              dangerouslySetInnerHTML={{ __html: item.description ?? "" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
