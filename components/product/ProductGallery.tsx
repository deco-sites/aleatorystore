import { Head } from "$fresh/runtime.ts";
import { PageInfo, Product } from "apps/commerce/types.ts";
import { Device } from "apps/website/matchers/device.ts";
import { Format } from "site/components/search/types.ts";
import { clx } from "site/sdk/clx.ts";
import ShowMore from "site/components/search/ShowMore.tsx";
import ProductsCard from "site/islands/ProductsCard.tsx";

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
  device: Device;
}

function protocolFixer(url: URL) {
  const ipRegex = /(\d{1,3}\.){3}\d{1,3}/;
  const isLocal = url.hostname === "localhost" ||
    url.hostname.match(ipRegex);
  if (isLocal) {
    url.protocol = "http:";
  }
  return url;
}

function ProductGallery(
  { products, pageInfo, layout, url, device }: Props,
) {
  const nextPage = pageInfo.nextPage
    ? new URL(pageInfo.nextPage, url.href)
    : null;
  const partialUrl = nextPage ? protocolFixer(new URL(nextPage.href)) : null;
  if (pageInfo.nextPage && nextPage) {
    partialUrl?.searchParams.set("partial", "false");
  }
  const hasNextPage = pageInfo.nextPage;

  return (
    <div
      class={clx(
        "grid gap-2 items-center sm:gap-y-4 sm:gap-x-2",
        hasNextPage ? "" : "mb-24",
      )}
    >
      {layout?.format == "Show More" && (
        <Head>
          {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
          {pageInfo.previousPage && (
            <link rel="prev" href={pageInfo.previousPage} />
          )}
        </Head>
      )}

      <ProductsCard products={products!} device={device} />

      {(layout && layout?.format === "Show More") && (
        <>
          <ShowMore
            pageInfo={pageInfo}
            url={partialUrl?.href ?? ""}
          />
        </>
      )}
    </div>
  );
}
export default ProductGallery;
