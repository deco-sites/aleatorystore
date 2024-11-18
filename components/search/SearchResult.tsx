import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { AppContext } from "../../apps/site.ts";
import { SendEventOnView } from "../../components/Analytics.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../islands/FIlters.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import NotFound from "../../sections/Product/NotFound.tsx";
import CategoryBanner from "../category/CategoryBanner.tsx";
import CategoryBullets from "../category/CategoryBullets.tsx";
import CategorySeoText from "../category/CategorySeoText.tsx";
import ProductGallery from "../product/ProductGallery.tsx";
import SearchTitle from "./SearchTitle.tsx";
import { BottomSEO, Bullet, Props } from "./types.ts";

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const { seoContent } = props;

  const banner = seoContent.banners.find(({ url, imageDesktop, imageMobile }) =>
    new URLPattern({ pathname: url }).test(req.url) &&
    (imageDesktop || imageMobile)
  );
  const bullets = seoContent.bullets.find(({ url }) =>
    new URLPattern({ pathname: url }).test(req.url)
  );
  const bottomSEO = seoContent.bottom.find(({ url }) =>
    new URLPattern({ pathname: url }).test(req.url)
  );

  return {
    ...props,
    seoContent: {
      banner,
      bullets,
      bottomSEO,
    },
    url: req.url,
    device: ctx.device,
  };
};

type LoaderReturn = ReturnType<typeof loader>;

interface ResultProps extends Omit<LoaderReturn, "page"> {
  page: ProductListingPage;
}

function Result({
  page,
  layout,
  startingPage = 0,
  url: urlProp,
  seoContent,
  device,
}: ResultProps) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(urlProp);

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const currentBreadCrumb = breadcrumb.itemListElement.at(-1)?.name ?? "";
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isCollectionPage = pageInfo?.pageTypes?.some((
    type,
  ) => (type === "Collection" || type === "Search"));

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;
  const isSearchPage = url.search.includes("?q");

  const pageName = url.pathname.split("/")[1] ?? "";
  const showSearchTitle = isSearchPage === false &&
    seoContent.banner === undefined;

  const showBreadcrumb = seoContent.banner === undefined;
  const showBanner = seoContent.banner !== undefined;
  const showBullets = seoContent.bullets &&
    seoContent.bullets.bullets.length > 0;
  const showSeoText = seoContent.bottomSEO !== undefined &&
    seoContent.bottomSEO.contents.length > 0;

  return (
    <>
      <div
        class={clx(
          (isFirstPage || !isPartial) && !showBanner ? "sm:pt-10" : "",
          !showBanner ? "max-w-[1750px] m-auto px-4 sm:px-8" : "",
        )}
      >
        {(isFirstPage || !isPartial) && (
          <>
            {isSearchPage
              ? (
                <h2 class="max-w-[1750px] mb-6 text-dark-blue font-light sm:font-normal text-base sm:text-[24px] m-auto leading-[150%]">
                  RESULTADO DA BUSCA POR:{" "}
                  <strong class="uppercase font-semibold text-dark-blue text-base sm:text-[24px]">
                    {page?.seo?.title !== "Category_Page_Title" &&
                      page?.seo?.title}
                  </strong>
                </h2>
              )
              : null}

            {showSearchTitle
              ? <SearchTitle title={currentBreadCrumb ?? pageName} />
              : null}
          </>
        )}

        {showBanner && (
          <CategoryBanner
            {...seoContent.banner}
            breadcrumb={breadcrumb.itemListElement}
            device={device}
            isCollectionPage={isCollectionPage}
          />
        )}
        {showBullets && <CategoryBullets {...seoContent.bullets as Bullet} />}

        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            isCollectionPage={isCollectionPage}
            isSearchPage={isSearchPage}
            collectionName={pageName}
            displayFilter={layout?.variant === "drawer"}
            forceHideBreadcrumb={!showBreadcrumb}
          />
        )}
        <div
          class={clx(
            "flex flex-row relative",
            showBanner ? "max-w-[1750px] m-auto px-4 sm:px-8" : "",
          )}
        >
          {layout?.variant === "aside" && filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <aside class="hidden sm:block w-min min-w-[250px] pr-5 sticky top-[20%] h-fit mb-[15%]">
              <Filters
                filters={filters}
                sortOptions={sortOptions}
                disablePadding
              />
            </aside>
          )}

          <div
            class="flex-grow"
            id={id}
          >
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
              device={device}
            />
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
        {showSeoText && (
          <CategorySeoText {...seoContent.bottomSEO as BottomSEO} />
        )}
      </div>
      <div id="results-on-view-area">
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              // TODO: get category name from search or cms setting
              item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
              item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
              items: page.products?.map((product, index) =>
                mapProductToAnalyticsItem({
                  ...(useOffer(product.offers)),
                  index: offset + index,
                  product,
                  breadcrumbList: page.breadcrumb,
                })
              ),
            },
          }}
        />
      </div>
    </>
  );
}

export default function SearchResult(
  { page, ...props }: LoaderReturn,
) {
  if (!page || !page.products.length) {
    return <NotFound page={page} />;
  }

  return <Result {...props} page={page} />;
}
