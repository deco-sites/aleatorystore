import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import type { JSX } from "preact";
import { useRef } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import Button from "../ui/ButtonBuy.tsx";

export interface Banner {
  /** @description desktop otimized image */
  desktop?: ImageWidget;
  /** @description Image's alt text */
  alt?: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
  /** @format color */
  backgroundColor?: string;
  /** @format color */
  color?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
    images?: Banner;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter({ content, layout = {} }: Props) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const successEmailMessage = useSignal("");

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useSignal<string>("Masculino");

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedInput = "";

    if (input.length <= 2) {
      formattedInput = input;
    } else if (input.length <= 4) {
      formattedInput = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    } else {
      formattedInput = `${input.slice(0, 2)}/${input.slice(2, 4)}/${
        input.slice(4, 8)
      }`;
    }

    e.currentTarget.value = formattedInput;
  };

  const handleGenderChange = (
    event: JSX.TargetedMouseEvent<HTMLInputElement>,
  ) => {
    const eventTarget = event?.currentTarget?.value;
    if (eventTarget) {
      genderRef.value = eventTarget;
    }
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    try {
      loading.value = true;

      const email =
        (event.currentTarget.elements.namedItem("email") as HTMLInputElement)
          ?.value;
      const name =
        (event.currentTarget.elements.namedItem("name") as HTMLInputElement)
          ?.value;

      await invoke.vtex.actions.masterdata.createDocument({
        data: {
          nl_aniversario: birthRef?.current?.value,
          nl_dt_cadastro: new Date().toLocaleDateString("pt-br"),
          nl_email: email,
          nl_nome: name,
          nl_sexo: genderRef?.value,
        },
        acronym: "NL",
      });

      successEmailMessage.value = "E-mail cadastrado com sucesso!";
    } finally {
      loading.value = false;
      setTimeout(() => {
        successEmailMessage.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (nameRef.current) nameRef.current.value = "";
        if (birthRef.current) birthRef.current.value = "";
      }, 5000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: content?.form?.backgroundColor !== "#000000"
          ? content?.form?.backgroundColor
          : "#121926",
      }}
      class={clx(
        "flex flex-col gap-4",
        tiled &&
          "lg:flex-row lg:w-full lg:justify-between lg:flex-1 lg:items-center",
      )}
    >
      <div class="flex justify-center text-center lg:flex-1.5 flex-col w-full py-14 px-2">
        {content?.title && (
          <h3
            style={{
              color: content?.form?.color !== "#000000"
                ? content?.form?.color
                : undefined,
            }}
            class="text-[20px] lg:text-[28px] text-neutral-200 font-medium whitespace-pre"
          >
            {content.title}
          </h3>
        )}

        {content?.description && (
          <p
            style={{
              color: content?.form?.color !== "#000000"
                ? content?.form?.color
                : undefined,
            }}
            class="text-[14px] text-neutral-200 font-light mt-1 mb-4 w-full"
          >
            {content.description}
          </p>
        )}
        <form
          class="form-control max-w-[550px] m-auto w-full gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            ref={nameRef}
            name="name"
            required
            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
            placeholder="Digite seu nome"
          />
          <input
            type="text"
            ref={emailRef}
            required
            name="email"
            class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
            placeholder="Digite seu e-mail"
          />
          <div class="flex flex-col sm:flex-row items-center">
            <input
              type="text"
              ref={birthRef}
              name="birthdate"
              required
              class="flex-auto h-10 border border-secondary-neutral-700 outline-none w-full pl-2 pr-0 text-sm text-paragraph-color"
              placeholder="Aniversário - __/__/____"
              onInput={handleInput}
              maxLength={10}
            />
            <div class="flex gap-4 ml-4 mt-4 sm:mt-0">
              <div class="flex items-center">
                <label for="masculino__check" id="masculino__check">
                  Masculino
                </label>
                <input
                  type="checkbox"
                  name="masculino__check"
                  value="Masculino"
                  checked={genderRef?.value === "Masculino"}
                  onClick={handleGenderChange}
                  class="flex-auto accent-primary-900 h-10 border border-secondary-neutral-700 outline-none w-14 pl-2 pr-0 text-sm text-paragraph-color"
                />
              </div>
              <div class="flex items-center">
                <label for="feminino__check" id="feminino__check">
                  Feminino
                </label>
                <input
                  type="checkbox"
                  name="feminino__check"
                  value="Feminino"
                  onClick={handleGenderChange}
                  checked={genderRef?.value === "Feminino"}
                  class="flex-auto accent-primary-900 h-10 border border-secondary-neutral-400 outline-none w-14 pl-2 pr-0 text-sm text-paragraph-color"
                />
              </div>
            </div>
          </div>
          <Button
            negative
            type="submit"
            class="btn w-full disabled:loading"
            disabled={loading.value}
          >
            CADASTRAR
          </Button>
          <span
            style={{
              color: content?.form?.color !== "#000000"
                ? content?.form?.color
                : undefined,
            }}
            class={`absolute -bottom-8 ${
              successEmailMessage.value ? "block text-neutral-200" : "hidden"
            }`}
          >
            {successEmailMessage.value}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
