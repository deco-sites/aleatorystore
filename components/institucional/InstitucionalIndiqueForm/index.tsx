import { ImageWidget } from "apps/admin/widgets.ts";
import ButtonStyled from "site/components/ui/ButtonStyled.tsx";
import { useId } from "site/sdk/useId.ts";
import { useComponent } from "site/sections/Component.tsx";

interface Props {
    image?: {
        url: ImageWidget;
        alt: string;
        width: number;
        height: number;
    };
    /**
     * @format textarea
     */
    text?: string;
}

export default function InstitucionalIndiqueForm(props: Props) {
    const id = useId();
    return (
        <div class="flex flex-col gap-5 lg:gap-[unset] px-6 lg:px-[unset] lg:grid lg:grid-cols-2 mx-auto max-w-[75rem] my-5">
            <div class="flex items-center justify-center">
                {props.image?.url && (
                    <img
                        src={props.image.url}
                        alt={props.image.alt}
                        width={props.image.width}
                        height={props.image.height}
                    />
                )}
                {props.text && (
                    <p
                        class="whitespace-break-spaces text-center my-4 lg:my-0"
                        dangerouslySetInnerHTML={{ __html: props.text }}
                    />
                )}
            </div>
            <div class="flex items-center justify-center flex-col lg:mx-20">
                <h3 class="text-2xl leading-6 font-medium uppercase">
                    Indique 3 Amigos
                </h3>
                <h4 class="text-xl leading-5 font-medium mt-2 uppercase">
                    E ganhe 10%OFF
                </h4>
                <form
                    class="mt-6"
                    hx-post={useComponent(
                        "/components/institucional/InstitucionalIndiqueForm/result.tsx",
                    )}
                    hx-target={`#${id}`}
                    hx-swap="innerHTML"
                    hx-trigger="submit"
                >
                    <div class="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            required
                            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                            placeholder="Seu nome"
                        />
                        <input
                            type="email"
                            name="email"
                            required
                            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                            placeholder="Seu e-mail"
                        />
                    </div>
                    <p class="my-6 text-center uppercase text-lg">
                        Indique Abaixo os E-mails de seus amigos
                    </p>
                    <div class="flex flex-col gap my-5 justify-center items-center gap-4">
                        <input
                            type="email"
                            name="email1"
                            required
                            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                            placeholder="Email do primeiro amigo"
                        />
                        <input
                            type="email"
                            name="email2"
                            required
                            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                            placeholder="Email do segundo amigo"
                        />
                        <input
                            type="email"
                            name="email3"
                            required
                            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                            placeholder="Email do terceiro amigo"
                        />
                        <ButtonStyled type="submit">Enviar</ButtonStyled>
                        <div id={id} />
                    </div>
                </form>
            </div>
        </div>
    );
}
