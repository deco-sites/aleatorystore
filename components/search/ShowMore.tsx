import { PageInfo } from "apps/commerce/types.ts";
import { LinkButtonBanner } from "../ui/ButtonBanner.tsx";

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
/*
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
  /*
  const scriptTags = newPage.querySelectorAll("script");
  const [state, code] = Array.from(scriptTags).slice(-2);
  document.body.appendChild(state);
  code.innerHTML = "console.log('AAA');" + code.innerHTML +
    "console.log('Script added from ShowMore');";
  document.body.appendChild(code);

}

*/

export default function ShowMore(
  { pageInfo, url }: Props,
) {
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
      <LinkButtonBanner
        id="show-more-btn"
        class={`btn cursor-pointer absolute`}
        href={url}
      >
        <span class="[.htmx-request_&]:hidden">VER MAIS PRODUTOS</span>
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
      </LinkButtonBanner>
      <p class="font-light text-xs mt-[-1.5rem]">
        Total de {pageInfo.records} Produtos
      </p>
    </div>
  );
}
