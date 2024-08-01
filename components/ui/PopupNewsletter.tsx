import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { JSX } from "preact";
import { Suspense } from "preact/compat";
import { useRef } from "preact/hooks";
import Toastify from "toastify-js";
import { invoke } from "../../runtime.ts";
import Loading from "../daisy/Loading.tsx";
import ButtonDefault from "./Button.tsx";
import Button from "./ButtonStyled.tsx";
import Icon from "./Icon.tsx";
import Modal from "./Modal.tsx";

export interface Props {
  image?: ImageWidget;
}

export default function PopupNewsletter({ image }: Props) {
  const popup = JSON.parse(
    globalThis.localStorage.getItem("signPopupNewsletter") || "null",
  ) ??
    JSON.parse(
      globalThis.sessionStorage.getItem("signPopupNewsletter") || "null",
    );

  const hasSignPopup = useSignal<boolean>(popup !== null);
  const loading = useSignal(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const genderRef = useSignal<string>("Masculino");

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.replace(/\D/g, "");
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

      JSON.stringify(
        globalThis.localStorage.setItem("signPopupNewsletter", "true"),
      );

      hasSignPopup.value = true;

      Toastify({
        text: "Obrigado! Em breve entraremos em contato ",
        className: "info",
        duration: 5000,
        close: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } catch (err) {
      console.error(err);
      Toastify({
        text:
          "Algo aconteceu! Por favor, envie novamente ou tente mais tarde. ",
        className: "info",
        duration: 5000,
        close: true,
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    } finally {
      loading.value = false;
      setTimeout(() => {
        if (emailRef.current) emailRef.current.value = "";
        if (nameRef.current) nameRef.current.value = "";
        if (birthRef.current) birthRef.current.value = "";
      }, 5000);
    }
  };

  return (
    <Modal
      open={!hasSignPopup.value}
      loading="lazy"
      onClose={() => {
        JSON.stringify(
          globalThis.sessionStorage.setItem("signPopupNewsletter", "false"),
        );
        hasSignPopup.value = true;
      }}
    >
      <Suspense
        fallback={<Loading size="loading-md" style={"loading-spinner"} />}
      >
        <div class="w-full h-full sm:w-fit sm:h-fit flex justify-center bg-[#fff] relative">
          <ButtonDefault
            type="button"
            class="btn no-animation absolute right-4 top-4"
            onClick={() => {
              JSON.stringify(
                globalThis.sessionStorage.setItem(
                  "signPopupNewsletter",
                  "false",
                ),
              );
              hasSignPopup.value = true;
            }}
          >
            <Icon id="XMark" size={28} strokeWidth={1} />
          </ButtonDefault>
          <figure style={{ aspectRatio: "530/590" }} class="hidden sm:block">
            <Image
              src={image!}
              alt="image newsletter banner"
              width={530}
              height={590}
            />
          </figure>
          <form
            class="form-control max-w-[550px] m-auto w-full gap-4 p-8"
            onSubmit={handleSubmit}
          >
            <h3 class="text-center text-xl sm:text-[24px] font-light uppercase leading-[16px]">
              CADASTRE-SE E{" "}
              <strong class="text-3xl sm:text-[36px] font-semibold leading-[55px] text-center block">
                GANHE 10% OFF
              </strong>
            </h3>
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
                placeholder="Aniversário - dia/mês/ano"
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
            <div class="w-full flex justify-center">
              <Button
                negative
                type="submit"
                class="btn w-full disabled:loading"
                disabled={loading.value}
              >
                CADASTRAR
              </Button>
            </div>
          </form>
        </div>
      </Suspense>
    </Modal>
  );
}
