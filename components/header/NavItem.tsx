import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} className="py-4">
        {name?.includes("NEW IN")
          ? (
            <span
              className={"font-redhatdisplay bg-primary-900 text-secondary-neutral-100 group-hover:underline whitespace-nowrap text-sm flex items-center gap-2 p-3 font-medium"}
            >
              {name}
            </span>
          )
          : name?.includes("Signature")
          ? (
            <span
              className={"font-northwell capitalize whitespace-nowrap group-hover:underline text-2xl font-thin flex items-center gap-2 text-paragraph-color"}
            >
              {name}
              {children && children.length > 0 && (
                <Icon id={"ArrowDown"} size={26} />
              )}
            </span>
          )
          : (
            <span
              className={"font-redhatdisplay group-hover:underline whitespace-nowrap text-sm lg:text-xs xl:text-sm font-thin flex items-center gap-2 text-paragraph-color"}
            >
              {name}
              {children && children.length > 0 && (
                <Icon id={"ArrowDown"} size={26} />
              )}
            </span>
          )}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start  border-t border-b-2 border-base-200 w-screen"
            style={{ top: "0px", left: "0px", marginTop: headerHeight }}
          >
            <div class="w-full container m-auto flex justify-between py-4">
              <div>
                <div class="border-b">
                  <h3 class="p-4 italic">{name}</h3>
                </div>
                <ul class="flex items-start justify-center gap-6">
                  {children.map((node) => (
                    <li class="p-6">
                      <a
                        class="hover:underline text-sm font-bold"
                        href={node.url}
                      >
                        <span>{node.name}</span>
                      </a>

                      <ul class="flex flex-col gap-1 mt-4">
                        {node.children?.map((leaf) => (
                          <li>
                            <a
                              class="hover:underline uppercase"
                              href={leaf.url}
                            >
                              <span class="text-xs">{leaf.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {image?.url && (
                  <figure>
                    <img
                      class="py-4"
                      src={image.url}
                      alt={image.alternateName}
                      width={440}
                      loading="lazy"
                    />
                  </figure>
                )}
                <h3 class="text-sm text-[#121926] font-bold uppercase">
                  {image?.contentUrl}
                </h3>
                <a href={image?.thumbnailUrl} class="underline text-sm">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
