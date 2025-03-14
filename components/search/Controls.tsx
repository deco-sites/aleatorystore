import { useComputed, useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { useEffect } from "preact/hooks";
import Filters from "site/components/search/Filters.tsx";
import Breadcrumb from "site/components/ui/Breadcrumb.tsx";
import Button from "site/components/ui/Button.tsx";
import Drawer from "site/components/ui/Drawer.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useUI } from "site/sdk/useUI.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    isCollectionPage?: boolean;
    collectionName: string;
    isSearchPage: boolean;
    forceHideBreadcrumb?: boolean;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    isCollectionPage,
    forceHideBreadcrumb,
    collectionName,
    isSearchPage,
  }: Props,
) {
  const open = useSignal(false);
  const { mobileDisplayGrid, desktopDisplayGrid } = useUI();
  const isSticky = useSignal(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      isSticky.value = offset > (forceHideBreadcrumb ? 800 : 400);
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stickyClass = useComputed(() =>
    isSticky.value
      ? "sm:relative fixed top-[75px] sm:top-auto z-10 bg-[#fff] w-full shadow-md"
      : ""
  );

  const collectionData = {
    name: collectionName ?? "",
    item: collectionName ?? "",
  };

  return (
    <Drawer
      class="drawer-end sm:mb-2"
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-secondary-neutral-100 flex flex-col h-full divide-y overflow-y-hidden w-3/4 md:w-[480px] md:p-4">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-normal text-xl text-dark-blue">Filtros</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={1} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto border-none">
              <Filters filters={filters} sortOptions={sortOptions} />
            </div>
          </div>
        </>
      }
    >
      <div
        class={`flex flex-col justify-between px-4 mb-2 sm:p-0 sm:gap-4 sm:flex-row ${stickyClass.value} sm:px-8 sm:max-w-[1750px] sm:mx-auto`}
      >
        <div class="flex flex-row items-center sm:p-0">
          {isSearchPage || forceHideBreadcrumb ? null : (
            <Breadcrumb
              itemListElement={breadcrumb?.itemListElement}
              collectionBreadcrumb={isCollectionPage
                ? collectionData
                : undefined}
            />
          )}
        </div>

        <div
          class={`flex flex-row items-center ${
            isSticky.value ? "justify-around" : "justify-between"
          } border-b border-secondary-neutral-200 sm:gap-4 sm:border-none `}
        >
          <div class="md:hidden flex items-center gap-2">
            <span>Ver:</span>
            <button
              onClick={() => {
                mobileDisplayGrid.value = 2;
              }}
            >
              <LayoutGrid2Icon active={mobileDisplayGrid.value === 2} />
            </button>
            <button
              onClick={() => {
                mobileDisplayGrid.value = 1;
              }}
            >
              <LayoutGrid1Icon active={mobileDisplayGrid.value === 1} />
            </button>
          </div>
          <Button
            class={displayFilter ? "btn-ghost" : "btn-ghost sm:hidden"}
            onClick={() => {
              open.value = true;
            }}
          >
            <span class={"text-paragraph-color font-light text-sm"}>
              Filtrar e ordernar
            </span>
            <Icon
              id="FilterOptions"
              width={16}
              height={16}
              stroke-width={0.01}
            />
          </Button>
        </div>
        <div class="hidden md:flex items-center gap-2">
          <span>Ver:</span>
          <button
            onClick={() => {
              desktopDisplayGrid.value = 3;
            }}
          >
            <LayoutGrid2Icon active={desktopDisplayGrid.value === 3} />
          </button>
          <button
            onClick={() => {
              desktopDisplayGrid.value = 4;
            }}
          >
            <LayoutGrid1Icon active={desktopDisplayGrid.value === 4} />
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;

const LayoutGrid1Icon = ({ active }: { active: boolean }) => (
  <svg
    width={18}
    height={14}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0"
      y="0"
      width="18"
      height="14"
      fill={active ? "#000" : "#9AA4B2"}
    />
    <path
      d="M1.61538 14C1.15513 14 0.770833 13.8458 0.4625 13.5375C0.154167 13.2292 0 12.8449 0 12.3846V1.61537C0 1.15512 0.154167 0.770833 0.4625 0.4625C0.770833 0.154167 1.15513 0 1.61538 0H16.3846C16.8449 0 17.2292 0.154167 17.5375 0.4625C17.8458 0.770833 18 1.15512 18 1.61537V12.3846C18 12.8449 17.8458 13.2292 17.5375 13.5375C17.2292 13.8458 16.8449 14 16.3846 14H1.61538ZM1.61538 13H16.3846C16.5385 13 16.6795 12.9359 16.8077 12.8077C16.9359 12.6795 17 12.5385 17 12.3846V1.61537C17 1.46154 16.9359 1.32052 16.8077 1.1923C16.6795 1.0641 16.5385 1 16.3846 1H1.61538C1.46154 1 1.32052 1.0641 1.1923 1.1923C1.0641 1.32052 1 1.46154 1 1.61537V12.3846C1 12.5385 1.0641 12.6795 1.1923 12.8077C1.32052 12.9359 1.46154 13 1.61538 13Z"
      fill={active ? "#000" : "#9AA4B2"}
    />
  </svg>
);

const LayoutGrid2Icon = ({ active }: { active: boolean }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17.5C11.4949 17.5 11.0673 17.325 10.7173 16.975C10.3673 16.625 10.1923 16.1974 10.1923 15.6923V2.3077C10.1923 1.80257 10.3673 1.375 10.7173 1.025C11.0673 0.675 11.4949 0.5 12 0.5H15.3846C15.8897 0.5 16.3172 0.675 16.6672 1.025C17.0172 1.375 17.1922 1.80257 17.1922 2.3077V15.6923C17.1922 16.1974 17.0172 16.625 16.6672 16.975C16.3172 17.325 15.8897 17.5 15.3846 17.5H12ZM2.61541 17.5C2.1103 17.5 1.68274 17.325 1.33274 16.975C0.982739 16.625 0.807739 16.1974 0.807739 15.6923V2.3077C0.807739 1.80257 0.982739 1.375 1.33274 1.025C1.68274 0.675 2.1103 0.5 2.61541 0.5H5.99999C6.50511 0.5 6.93266 0.675 7.28266 1.025C7.63266 1.375 7.80766 1.80257 7.80766 2.3077V15.6923C7.80766 16.1974 7.63266 16.625 7.28266 16.975C6.93266 17.325 6.50511 17.5 5.99999 17.5H2.61541Z"
      fill={active ? "#000" : "#9AA4B2"}
    />
  </svg>
);
