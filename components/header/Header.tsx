import { type SectionProps } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { AppContext } from "../../apps/site.ts";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Drawers from "../../islands/Header/Drawers.tsx";
import HeaderScroll from "../../islands/HeaderScroll.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { AvailableIcons } from "../ui/Icon.tsx";
import Alert from "./Alert.tsx";
import { headerHeight } from "./constants.ts";
import Navbar from "./Navbar.tsx";
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}
export interface Props {
  alerts?: {
    label: string;
    icon: AvailableIcons;
  }[];
  lightThemeBar?: boolean;
  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;
  /**
   * @title Items Per Column
   * @description Maxium items per column
   */
  itemsPerColumn?: number;
  /** @title Logo */
  logo?: Logo;
  logoPosition?: "left" | "center";
  buttons?: Buttons;
}
function Header({
  alerts,
  lightThemeBar = false,
  searchbar,
  navItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Feminino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Masculino",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Sale",
      url: "/",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Linktree",
      url: "/",
    },
  ],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  logoPosition = "center",
  buttons,
  device,
  itemsPerColumn,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];
  return device === "desktop"
    ? (
      <header style={{ height: headerHeight }}>
        <HeaderScroll>
          <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
            <div
              class="bg-secondary-neutral-100 fixed w-full z-40"
              id="header-bar"
            >
              {alerts && alerts.length > 0 && (
                <Alert alerts={alerts} lightTheme={lightThemeBar} />
              )}
              <Navbar
                device={device}
                items={items}
                searchbar={searchbar && { ...searchbar, platform }}
                logo={logo}
                logoPosition={logoPosition}
                buttons={buttons}
                itemsPerColumn={itemsPerColumn}
              />
            </div>
          </Drawers>
        </HeaderScroll>
      </header>
    )
    : (
      <header style={{ height: headerHeight }}>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div class="bg-secondary-neutral-100 fixed w-full z-40">
            {alerts && alerts.length > 0 && (
              <Alert alerts={alerts} lightTheme={lightThemeBar} />
            )}
            <Navbar
              device={device}
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              logoPosition={logoPosition}
              buttons={buttons}
              itemsPerColumn={itemsPerColumn}
            />
          </div>
        </Drawers>
      </header>
    );
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};
export default Header;
