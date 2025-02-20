import { useSignal } from "@preact/signals";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
  SortOption,
} from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useMemo } from "preact/hooks";
import ShowPriceItem from "site/components/search/PriceFilter.tsx";
import { clx } from "../../sdk/clx.ts";
import CategoryColorFilter from "../category/CategoryColorFilter.tsx/CategoryColorFilter.tsx";
import Icon from "../ui/Icon.tsx";

export type FilterValuesProps = {
  itemValue: FilterToggle;
  filterSizesByNumber: FilterToggleValue[];
  filterSizesByClothes: FilterToggleValue[];
};

export type Props = Pick<ProductListingPage, "filters" | "sortOptions"> & {
  disablePadding?: boolean;
};
export type OrderByProps = {
  item: SortOption;
  sort: string;
};

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const labelRename = (label: string) => {
  const renames = {
    "subcategoria": "Categoria",
    "category 4": "Subcategoria",
  };

  return renames[label.toLowerCase() as keyof typeof renames] ?? label;
};

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

const applySort = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
  const newSort = e.currentTarget.value;
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, newSort);

  history.pushState(null, "", `?${urlSearchParams.toString()}`);
  window.location.reload();
};

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "orders:desc": "Mais vendidos",
  "release:desc": "Mais recentes",
  "discount:desc": "Descontos",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox border-primary-700 rounded-none h-4 w-4"
      />
      <span class="text-sm font-light text-paragraph-color capitalize">
        {label}
      </span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues(
  { key, values }: FilterToggle,
) {
  if (key === "tamanho") return null;

  return (
    <ul
      class={clx(
        `flex gap-8 flex-col my-4`,
        key !== "tamanho" ? "max-h-[300px] overflow-y-auto" : "flex-wrap",
      )}
    >
      {values.map((item) => {
        if (key === "cor") {
          return <CategoryColorFilter {...item} />;
        }
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function OrderItem(props: OrderByProps) {
  const { item: { label, value }, sort } = props;
  return (
    <button
      onClick={applySort}
      value={value}
      class={`flex items-center gap-2 
    ${value === "orders:desc" ? "order-1" : ""}
    ${value === "release:desc" ? "order-2" : ""}
    ${value === "discount:desc" ? "order-3" : ""}
    ${value === "price:desc" ? "order-4" : ""}
    ${value === "price:asc" ? "order-5" : ""}
    `}
    >
      <div class="border-primary-700 border-solid border rounded-full p-[1px]">
        <div
          aria-checked={sort === value}
          class={`h-3 w-3 rounded-full ${
            sort === value ? "bg-primary-500" : ""
          }`}
        />
      </div>
      <span
        class={`text-sm ${
          sort === value ? "font-medium" : "font-light"
        }  text-paragraph-color capitalize`}
      >
        {label}
      </span>
    </button>
  );
}

function FilterItem(item: FilterToggle) {
  const isChildrenChecked = item.values.some((value) => value.selected);
  const isOpen = useSignal<boolean>(isChildrenChecked);

  const filterNumberSizes = (item.key === "tamanho" &&
    item.values.filter(({ value }) => !isNaN(Number(value)))) ?? [];

  const filterClothesSizes = (item.key === "tamanho" &&
    item.values.filter(({ value }) => isNaN(Number(value)))) ?? [];

  const handleClick = () => isOpen.value = !isOpen.value;
  if (item.key === "price") {
    return (
      <li>
        <div class="flex flex-col gap-4">
          <button
            onClick={handleClick}
            class="flex"
            aria-label="toggle filter item"
          >
            <span class="flex items-center uppercase text-dark-blue text-base font-light w-full justify-between mr-[2px]">
              {labelRename(item.label)}{" "}
              {!isOpen.value ? <Icon id="Plus" size={18} /> : <MinusIcon />}
            </span>
          </button>
          <div class={`${!isOpen.value ? "hidden" : ""}`}>
            <ShowPriceItem {...item} />
          </div>
        </div>
      </li>
    );
  }

  if (item.key === "tamanho") {
    return (
      <li class="flex flex-col gap-4">
        <button
          onClick={handleClick}
          class="flex"
          aria-label="toggle filter item"
        >
          <span class="flex items-center uppercase text-dark-blue text-base font-light w-full justify-between mr-[2px]">
            {labelRename(item.label)}{" "}
            {!isOpen.value ? <Icon id="Plus" size={18} /> : <MinusIcon />}
          </span>
        </button>
        <div class={`${!isOpen.value ? "hidden" : ""}`}>
          {item.key === "tamanho"
            ? (
              <div class="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto overflow-x-hidden">
                <div class="flex flex-col gap-4 my-4">
                  {!!filterNumberSizes &&
                    filterNumberSizes.map((sizeItem, index) => (
                      <ValueItem key={index} {...sizeItem} />
                    ))}
                </div>
                <div class="flex flex-col gap-4 my-4">
                  {!!filterClothesSizes &&
                    filterClothesSizes.map((sizeItem, index) => (
                      <ValueItem key={index} {...sizeItem} />
                    ))}
                </div>
              </div>
            )
            : <FilterValues {...item} />}
        </div>
      </li>
    );
  }

  return (
    <li class="flex flex-col gap-4">
      <button
        onClick={handleClick}
        class="flex"
        aria-label="toggle filter item"
      >
        <span class="flex items-center uppercase text-dark-blue text-base font-light w-full justify-between mr-[2px]">
          {labelRename(item.label)}{" "}
          {!isOpen.value ? <Icon id="Plus" size={18} /> : <MinusIcon />}
        </span>
      </button>
      <div class={`${!isOpen.value ? "hidden" : ""}`}>
        <FilterValues {...item} />
      </div>
    </li>
  );
}

function Filters({ filters, sortOptions, disablePadding }: Props) {
  const isOpenOrderBy = useSignal<boolean>(false);
  const handleClick = () => isOpenOrderBy.value = !isOpenOrderBy.value;
  const sort = useSort();

  return (
    <ul class={clx("flex flex-col gap-6", disablePadding ? "" : "p-4")}>
      <div>
        <button
          onClick={handleClick}
          class="flex w-full"
          aria-label="toggle filter item"
        >
          <span class="flex items-center uppercase text-dark-blue text-base font-light w-full justify-between mr-[2px]">
            ordernar
            {!isOpenOrderBy.value
              ? <Icon id="Plus" size={18} />
              : <MinusIcon />}
          </span>
        </button>
        <div
          class={`${
            !isOpenOrderBy.value ? "hidden" : "flex flex-col gap-8 my-4"
          }`}
        >
          {sortOptions.map(({ value, label }) => ({
            value,
            label:
              portugueseMappings[label as keyof typeof portugueseMappings] ??
                "",
          })).filter(({ label }) => label).map((item) => (
            <OrderItem item={item} sort={sort} />
          ))}
        </div>
      </div>

      {filters
        .filter(isToggle)
        .map((filter) => <FilterItem {...filter} />)}
    </ul>
  );
}

export default Filters;

const MinusIcon = () => (
  <svg
    fill="#1C1B1F"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    id="minus"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
  >
    <path
      id="primary"
      d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"
      style={{
        fill: "#1C1B1F",
      }}
    />
  </svg>
);
