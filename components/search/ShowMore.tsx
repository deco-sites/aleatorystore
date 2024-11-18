import { useScript } from "@deco/deco/hooks";
import { PageInfo } from "apps/commerce/types.ts";
import ButtonBanner from "../ui/ButtonBanner.tsx";

export interface Props {
  pageInfo: PageInfo;
  url: string;
}

interface CustomEventHTMX extends CustomEvent {
  detail: {
    xhr: XMLHttpRequest;
  };
}

declare global {
  interface Window {
    htmx: {
      process: (el: Element) => void;
    };
  }
}
declare const event: CustomEventHTMX;

function handleShowMore() {
  const newDocument = event.detail.xhr.response;
  const newPage = new DOMParser().parseFromString(
    newDocument,
    "text/html",
  );
  const newBtn = newPage.getElementById("show-more-btn");
  const currentBtn = document.getElementById("show-more-btn");
  if (newBtn && currentBtn) {
    currentBtn.replaceWith(newBtn);
    window.htmx.process(newBtn);
  } else if (newBtn === null && currentBtn) {
    currentBtn.remove();
  }
  const url = new URL(event.detail.xhr.responseURL);
  url.searchParams.delete("partial");
  window.history.pushState({}, "", url.href);

  const newGTMEvent = newPage.querySelector("#results-on-view-area script");
  if (newGTMEvent) {
    document.getElementById("results-on-view-area")?.appendChild(newGTMEvent);
  }
}

export default function ShowMore(
  { pageInfo, url }: Props,
) {
  console.log(pageInfo, url);
  if (pageInfo.nextPage === undefined) {
    return (
      <div class="flex justify-center col-span-full mt-16 mb-28 relative">
        <p class="font-light text-xs mt-[-1.5rem]">
          Total de {pageInfo.records} Produtos
        </p>
      </div>
    );
  }
  return (
    <div class="flex justify-center col-span-full mt-16 mb-28 relative">
      <ButtonBanner
        id="show-more-btn"
        class={`btn cursor-pointer absolute`}
        hx-get={url}
        hx-swap="beforeend"
        hx-select="#result-grid .card"
        hx-target="#result-grid"
        hx-indicator="this"
        hx-disable-elt="this"
        {...{
          "hx-on::after-on-load": useScript(handleShowMore),
        }}
      >
        <span class="[.htmx-request_&]:hidden">VER MAIS PRODUTOS</span>
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
      </ButtonBanner>
      <p class="font-light text-xs mt-[-1.5rem]">
        Total de {pageInfo.records} Produtos
      </p>
    </div>
  );
}
