import { ImageWidget } from "apps/admin/widgets.ts";

/* @title {{label}} */
export interface Image {
  label: string;
  desktop: ImageWidget;
  mobile: ImageWidget;
  alt: string;
  productUrl: string;
}

export interface Props {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    href: string;
    label: string;
  };
  /* @minItems 2
     @maxItems 3 */
  images: Image[];
}
