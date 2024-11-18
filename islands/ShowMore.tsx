import { useScript } from "@deco/deco/hooks";
import { PageInfo } from "apps/commerce/types.ts";
import { useEffect, useMemo } from "preact/hooks";
import ButtonBanner from "../components/ui/ButtonBanner.tsx";
import { useShowMore } from "../sdk/useShowMore.ts";

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

export default function ShowMore(
  { pageInfo, url }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isFirstPage = !pageInfo.previousPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (!isFirstPage) {
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div
      class={(isAtPage && pageInfo.nextPage)
        ? "flex justify-center col-span-full mt-16 mb-28 relative"
        : "hidden"}
    >
      <ButtonBanner
        id="show-more-btn"
        class={`btn cursor-pointer absolute ${loading.value ? "hidden" : ""}`}
        hx-get={url}
        hx-swap="beforeend"
        hx-select="#result-grid .card"
        hx-target="#result-grid"
        {...{
          "hx-on::after-on-load": useScript(() => {
            console.log("after-swap", event);
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
            }
            const url = new URL(event.detail.xhr.responseURL);
            url.searchParams.delete("partial");
            window.history.pushState({}, "", url.href);
          }),
        }}
      >
        VER MAIS PRODUTOS
      </ButtonBanner>
      <p class="font-light text-xs mt-[-1.5rem]">
        Total de {pageInfo.records} Produtos
      </p>
    </div>
  );
}
