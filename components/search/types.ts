import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { Columns } from "../product/ProductGallery.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

/** @title {{title}} */
interface SeoBanner {
  /**
   * @title Url Matcher
   * @description Desired URL pattern to show this banner use /feminino/* to all feminino categories page
   */
  url: string;
  /**
   * @title Title of Banner
   */
  title?: string;
  /**
   * @title Description of Banner
   */
  description?: RichText;
  /**
   * @title Desktop Image
   * @description Image of banner in desktop devices, empty imagem not render the banner
   */
  imageDesktop?: ImageWidget;
  /**
   * @title Mobile Image
   * @description Image of banner in mobile devices, empty not render the banner
   */
  imageMobile?: ImageWidget;
  /**
   * @title Alternative Text
   * @description Text to people with visual disabilities
   */
  alt?: string;
}

/** @title {{title}} */
export interface BulletItem {
  title: string;
  image: ImageWidget;
  url: string;
}

/** @title {{title}} */
export interface Bullet {
  /**
   * @title Url Matcher
   * @description Desired URL pattern to show this banner use /feminino/* to all feminino categories page
   */
  url: string;
  title: string;
  description: string;
  bullets: BulletItem[];
}
/** @title {{label}} */
export interface ContentBottomSEO {
  /** @decription Used only to see in admin */
  label: string;
  image: { alt: string; width: number; height: number; url: ImageWidget };
  position: "left" | "right";
  content: RichText;
}
/** @title {{label}} */
export interface BottomSEO {
  /**
   * @title Url Matcher
   * @description Desired URL pattern to show this banner use /feminino/* to all feminino categories page
   */
  url: string;
  /** @decription Used only to see in admin */
  label: string;
  title?: string;
  contents: ContentBottomSEO[];
}

export interface SeoContent {
  banners: SeoBanner[];
  bullets: Bullet[];
  bottom: BottomSEO[];
}

export interface Props {
  layout?: Layout;
  seoContent: SeoContent;

  /** @title Integration with Ecommerce Platform */
  page: ProductListingPage | null;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}
