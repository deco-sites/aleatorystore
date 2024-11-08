import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { Device } from "apps/website/matchers/device.ts";
import { Format } from "../../components/search/SearchResult.tsx";
import Spinner from "../../components/ui/Spinner.tsx";
import ShowMore from "../../islands/ShowMore.tsx";
import { CategoryBannersMediaSource } from "./ProductGalleryWithBanner.tsx";
import ProductsCard from "./ProductsCard.tsx";
import { usePartialSection } from "@deco/deco/hooks";
export interface Columns {
    mobile?: 1 | 2;
    desktop?: 2 | 3 | 4 | 5;
}
export interface Props {
    products: Product[] | null;
    pageInfo: PageInfo;
    offset: number;
    layout?: {
        columns?: Columns;
        format?: Format;
    };
    url: URL;
    categoryBanners: CategoryBannersMediaSource;
    device: Device;
}
const MOBILE_COLUMNS = {
    1: "grid-cols-1",
    2: "grid-cols-2",
};
const DESKTOP_COLUMNS = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
};
function ProductGallery({ products, pageInfo, layout, offset, url, device, categoryBanners }: Props) {
    const mobile = MOBILE_COLUMNS[1];
    const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];
    const nextPage = pageInfo.nextPage
        ? new URL(pageInfo.nextPage, url.href)
        : null;
    const partialUrl = nextPage ? new URL(nextPage.href) : null;
    if (pageInfo.nextPage && nextPage) {
        partialUrl?.searchParams.set("partial", "true");
    }
    const isFirstPage = !pageInfo.previousPage;
    const hasNextPage = pageInfo.nextPage;
    return (<div class={`grid gap-2 items-center sm:gap-y-4 sm:gap-x-2
      ${!categoryBanners && !isFirstPage ? "mt-2 sm:mt-4" : ""} ${hasNextPage ? "" : "mb-24"}`}>
      {layout?.format == "Show More" && (<Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage}/>}
          {pageInfo.previousPage && (<link rel="prev" href={pageInfo.previousPage}/>)}
        </Head>)}

      <ProductsCard products={products!} device={device}/>

      {(layout && layout?.format === "Show More") && (<>
          <ShowMore pageInfo={pageInfo}>
            {partialUrl && (<div>
                <div class="mt-2">
                  <Spinner showMore size={24}/>
                </div>
                <button id={`show-more-button-${pageInfo.currentPage}`} class="btn cursor-pointer hidden w-0 h-0 absolute" {...usePartialSection({
                href: partialUrl.href,
                mode: "append",
            })}>
                  Show More
                </button>
              </div>)}
          </ShowMore>
        </>)}
    </div>);
}
export default ProductGallery;
