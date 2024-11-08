import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import { AppContext } from "../../apps/site.ts";
import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import { type SectionProps } from "@deco/deco";
export type Item = {
    label: string;
    href: string;
    openNewTab?: boolean;
};
export type Section = {
    label: string;
    items: Item[];
};
export interface SocialItem {
    label: "Discord" | "Facebook" | "Instagram" | "Linkedin" | "Tiktok" | "Twitter";
    link: string;
}
export interface PaymentItem {
    label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}
export interface MobileApps {
    /** @description Link to the app */
    apple?: string;
    /** @description Link to the app */
    android?: string;
}
export interface RegionOptions {
    currency?: Item[];
    language?: Item[];
}
export interface NewsletterBanner {
    /** @description desktop otimized image */
    desktop?: ImageWidget;
    /** @description mobile otimized image */
    mobile?: ImageWidget;
    /** @description Image's alt text */
    alt?: string;
    action?: {
        /** @description when user clicks on the image, go to this link */
        href: string;
        /** @description Image text title */
        title: string;
        /** @description Image text subtitle */
        subTitle: string;
        /** @description Button label */
        label: string;
    };
}
export interface NewsletterForm {
    placeholder?: string;
    buttonText?: string;
    /** @format html */
    helpText?: string;
    /** @format color */
    backgroundColor?: string;
    /** @format color */
    color?: string;
}
export interface Layout {
    backgroundColor?: "Primary" | "Secondary" | "Accent" | "Base 100" | "Base 100 inverted";
    variation?: "Variation 1" | "Variation 2" | "Variation 3" | "Variation 4" | "Variation 5";
    hide?: {
        logo?: boolean;
        newsletter?: boolean;
        sectionLinks?: boolean;
        socialLinks?: boolean;
        paymentMethods?: boolean;
        mobileApps?: boolean;
        regionOptions?: boolean;
        extraLinks?: boolean;
        backToTheTop?: boolean;
    };
}
export interface Props {
    logo?: {
        image: ImageWidget;
        description?: string;
    };
    newsletter?: {
        title?: string;
        /** @format textarea */
        description?: string;
        form?: NewsletterForm;
        images?: NewsletterBanner;
    };
    sections?: Section[];
    social?: {
        title?: string;
        items: SocialItem[];
    };
    seoTexts?: {
        title: string;
        description: string;
    };
    payments?: {
        title?: string;
        items: PaymentItem[];
    };
    mobileApps?: MobileApps;
    regionOptions?: RegionOptions;
    extraLinks?: Item[];
    backToTheTop?: {
        text?: string;
    };
    layout?: Layout;
}
const LAYOUT = {
    "Primary": "bg-primary text-primary-content",
    "Secondary": "bg-secondary text-secondary-content",
    "Accent": "bg-accent text-accent-content",
    "Base 100": "bg-secondary-neutral-100 text-base-content",
    "Base 100 inverted": "bg-base-content text-base-100",
};
function Footer({ logo, newsletter = {
    title: "Newsletter",
    description: "",
    form: {
        placeholder: "",
        buttonText: "",
        helpText: "",
        color: "",
        backgroundColor: "",
    },
    images: {},
}, sections = [{
        "label": "Sobre",
        "items": [
            {
                "href": "/quem-somos",
                "label": "Quem somos",
            },
            {
                "href": "/termos-de-uso",
                "label": "Termos de uso",
            },
            {
                "href": "/trabalhe-conosco",
                "label": "Trabalhe conosco",
            },
        ],
    }, {
        "label": "Atendimento",
        "items": [
            {
                "href": "/centraldeatendimento",
                "label": "Central de atendimento",
            },
            {
                "href": "/whatsapp",
                "label": "Fale conosco pelo WhatsApp",
            },
            {
                "href": "/trocaedevolucao",
                "label": "Troca e devolução",
            },
        ],
    }], social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
}, seoTexts = {
    title: "Aleatory",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}, payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
}, mobileApps = { apple: "/", android: "/" }, regionOptions = { currency: [], language: [] }, extraLinks = [], backToTheTop, layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
        logo: false,
        newsletter: false,
        sectionLinks: false,
        socialLinks: false,
        paymentMethods: false,
        mobileApps: false,
        regionOptions: false,
        extraLinks: false,
        backToTheTop: false,
    },
}, }: SectionProps<typeof loader>) {
    const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo}/>;
    const _newsletter = layout?.hide?.newsletter ? <></> : (<Newsletter content={newsletter} layout={{
            tiled: layout?.variation == "Variation 4" ||
                layout?.variation == "Variation 5",
        }}/>);
    const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (<FooterItems sections={sections} justify={layout?.variation == "Variation 2" ||
            layout?.variation == "Variation 3" ||
            layout?.variation === "Variation 4"}/>);
    const _social = layout?.hide?.socialLinks
        ? <></>
        : <Social content={social} vertical={layout?.variation == "Variation 3"}/>;
    const _payments = layout?.hide?.paymentMethods
        ? <></>
        : <PaymentMethods content={payments}/>;
    const _apps = layout?.hide?.mobileApps
        ? <></>
        : <MobileApps content={mobileApps}/>;
    const _region = layout?.hide?.regionOptions
        ? <></>
        : <RegionSelector content={regionOptions}/>;
    const _links = layout?.hide?.extraLinks
        ? <></>
        : <ExtraLinks content={extraLinks}/>;
    return (<footer class={clx("w-full flex flex-col gap-10 relative", LAYOUT[layout?.backgroundColor ?? "Primary"])}>
      <div>
        {(!layout?.variation || layout?.variation == "Variation 1") && (<div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
              <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
                {_apps}
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>)}
        {layout?.variation == "Variation 2" && (<div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>)}
        {layout?.variation == "Variation 3" && (<div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 lg:px-24">
              <PoweredByDeco />
              {_links}
            </div>
          </div>)}
        {layout?.variation == "Variation 4" && (<div class="flex flex-col gap-10">
            {_newsletter}
            <div class="mx-8 pt-9">
              {
            /* <div class="lg:w-3/5">
            <h3 class="text-center sm:text-left text-xl uppercase text-black">
              {seoTexts.title}
            </h3>
            <p class="text-center text-sm sm:text-left lg:text-base font-light text-paragraph-color">
              {seoTexts.description}
            </p>
          </div> */
            }
              <div class="flex flex-col justify-center md:flex-row gap-10 lg:gap-16 lg:w-full">
                {_sectionLinks}
                {_payments}
              </div>
            </div>
            <div class="lg:flex-auto">
              {_social}
            </div>
          </div>)}
        {layout?.variation == "Variation 5" && (<div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
              </div>
            </div>
          </div>)}
      </div>
      <div class="container flex flex-wrap md:flex-nowrap gap-4 items-center justify-between border-t border-[#d8d8d8] py-4 px-4 mb-8">
        <p class="text-[12px] w-fit">
          Aleatory @ {new Date().getFullYear()}{" "}
          TODOS OS DIREITOS RESERVADOS. Zetop Comércio Eletrônico Ltda, com sede
          na Rua General Olimpio da Silveira, 655 Santa Cecilia, São Paulo - SP,
          inscrita no CNPJ sob o nº 17.027.448/0001-00. PMG Plus Artigos de
          vestuário e acessórios - CNPJ 38.304.932/0001-09
        </p>
        <div class="flex flex-wrap justify-center md:flex-nowrap gap-4 w-full md:w-fit">
          <a href="https://www.econverse.com.br/en/" target="_blank" rel="nofollow">
            <Image src={"https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.943/svg/logo-econverse___a81e9c16fdf9bdf5bc6f85eea10b8531.svg"} width={80} height={40} alt="Econverse logo"/>
          </a>
          <a href="https://vtex.com/pt-br/" target="_blank" rel="nofollow">
            <Image src={"https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.943/svg/logo-vtex___87bcbfa985a64389de5ded7624b56348.svg"} width={80} height={40} alt="Vtex logo"/>
          </a>
        </div>
      </div>
      {layout?.hide?.backToTheTop
            ? <></>
            : <BackToTop content={backToTheTop?.text}/>}
    </footer>);
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
    return { ...props, device: ctx.device };
};
export default Footer;
