import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt: string;
    url: string;
}

export default function Banner(props: Props) {
    const { desktop, mobile, alt, url } = props;
    return (
        <a href={url}>
            <Picture>
                <Source
                    media="(max-width: 767px)"
                    fetchPriority="auto"
                    src={mobile}
                    width={390}
                    height={614}
                />
                <Source
                    media="{min-width: 768px}"
                    fetchPriority="auto"
                    src={desktop}
                    width={1920}
                    height={907}
                />
                <img
                    class="object-fill w-full"
                    loading="lazy"
                    width={344}
                    height={500}
                    src={desktop}
                    alt={alt}
                />
            </Picture>
        </a>
    );
}

export function LoadingFallback() {
    return (
        <div
            style={{ height: "710px" }}
            class="w-full flex justify-center items-center"
        >
            <span class="loading loading-spinner" />
        </div>
    );
}
