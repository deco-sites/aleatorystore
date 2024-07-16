import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && (
            <h3 class="font-medium text-base text-secondary-paragraph-color uppercase text-center sm:text-left">
              {content.title}
            </h3>
          )}
          <ul class="grid grid-cols-4 items-center gap-4 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  class="border w-fit"
                  title={item.label}
                >
                  <Icon
                    width={48}
                    height={32}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
            <li
              class="border w-fit"
              title={"Boleto"}
            >
              <Image
                width={48}
                height={32}
                alt={"Boleto"}
                src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11384/aa9e34f5-c2bd-4948-a7c6-416545baeb34"}
              />
            </li>

            <li
              class="border w-fit"
              title={"Hipercard"}
            >
              <Image
                width={48}
                height={32}
                alt="Hipercard"
                src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11384/cd61e6dc-863b-42cc-9d95-b7f4561e40cc"}
              />
            </li>

            <li
              class="border w-fit"
              title={"American Express"}
            >
              <Image
                width={48}
                height={32}
                class="bg-primary-900"
                alt="American Flex"
                src={"https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11384/34e96c9a-b199-4185-942c-b6657a81c8c5"}
              />
            </li>
          </ul>

          <div class="flex flex-col items-center justify-center sm:justify-start sm:items-start">
            <h3 class="font-medium text-base text-secondary-paragraph-color uppercase">
              SEGURANÇA
            </h3>
            <ul>
              <li
                class="w-fit"
                title={"Hipercard"}
              >
                <Image
                  width={48}
                  height={32}
                  alt="Lets encrypt"
                  src={"https://aleatory.vtexassets.com/arquivos/seg.png?v=637079595378000000"}
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
