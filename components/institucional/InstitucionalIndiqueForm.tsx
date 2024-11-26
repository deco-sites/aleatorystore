import { ImageWidget } from "apps/admin/widgets.ts";
import ButtonStyled from "site/components/ui/ButtonStyled.tsx";

interface Props {
    image?: {
        url: ImageWidget;
        alt: string;
        width: number;
        height: number;
    };
    text?: string;
}

export default function InstitucionalIndiqueForm(props: Props) {
    return (
        <div class="grid grid-cols-2">
            <div>
                {props.image && (
                    <img
                        src={props.image.url}
                        alt={props.image.alt}
                        width={props.image.width}
                        height={props.image.height}
                    />
                )}
                {props.text && (
                    <p dangerouslySetInnerHTML={{ __html: props.text }} />
                )}
            </div>
            <div>
                <h3>Indeque 3 Amigos</h3>
                <h4>E ganhe 10%OFF</h4>
                <form>
                    <div class="grid grid-cols-2">
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
                    <p>Indique Abaixo os E-mails de seus amigos</p>
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
                        name="email2"
                        required
                        class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
                        placeholder="Email do terceiro amigo"
                    />
                    <ButtonStyled type="submit">Enviar</ButtonStyled>
                </form>
            </div>
        </div>
    );
}
