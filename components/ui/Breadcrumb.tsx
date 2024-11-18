import type { BreadcrumbList } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";

type CollectionProps = {
  name: string;
  item: string;
};

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  collectionBreadcrumb?: CollectionProps;
  textColor?: string;
}

function Breadcrumb(
  { itemListElement = [], collectionBreadcrumb, textColor }: Props,
) {
  const items: CollectionProps[] = [
    { name: "Home", item: "/" },
  ];
  if (collectionBreadcrumb) {
    items.push(collectionBreadcrumb);
  }
  const withName = itemListElement.filter((item) =>
    item.name
  ) as CollectionProps[];
  items.push(...withName);

  const color = textColor
    ? textColor
    : "text-secondary-neutral-700  last:text-dark-blue last:text-dark-blue last:font-light";
  return (
    <div class="hidden md:block breadcrumbs">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class={clx(color, "uppercase text-xs")}>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
