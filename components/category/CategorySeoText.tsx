import Image from "apps/website/components/Image.tsx";
import { ContentBottomSEO } from "../search/types.ts";

export interface Props {
  title?: string;
  contents: ContentBottomSEO[];
}
export default function CategorySeoText(
  { title, contents }: Props,
) {
  return (
    <section className="py-8 max-w-[795px] mx-auto px-6">
      {title && (
        <h2 className="text-2xl font-bold lg:text-center mb-6 flex lg:justify-center items-center gap-6 lg:gap-12">
          <img src="/image/logo_cat_seo.png" alt="Aleatory Logo" />
          {title}
        </h2>
      )}
      <div className="md:divide-y divide-primary-200/50">
        {contents.map((content, index) => (
          <div
            key={index}
            className={`flex ${
              content.position === "right"
                ? "flex-col-reverse md:flex-row-reverse "
                : "flex-col md:flex-row"
            } gap-6 py-3 lg:py-14`}
          >
            {/* Imagem */}
            <div className="w-full md:w-1/3">
              <Image
                width={content.image.width}
                height={content.image.height}
                src={content.image.url}
                alt={content.image.alt}
                className="w-full"
              />
            </div>

            {/* Texto */}
            <div className="w-full md:w-2/3">
              <div
                className="text-gray-700 [&>p]:mb-5"
                dangerouslySetInnerHTML={{
                  __html: content.content,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
