import { clx } from "site/sdk/clx.ts";

export interface MenuItem {
  label: string;
  url: string;
}
export interface Menu {
  items: MenuItem[];
}
export interface Props {
  menu: Menu;
  title: string;
  iframeUrl: string;
}

export function loader(props: Props, req: Request) {
  const currentUrl = new URL(req.url);
  const path = currentUrl.pathname;

  return {
    menu: {
      items: props.menu.items.map((item) => ({
        ...item,
        active: item.url === path,
      })),
    },
    text: {
      title: props.title,
      content:
        `<iframe src="${props.iframeUrl}" width="100%" height="1000px" frameborder="0"></iframe>`,
    },
  };
}

export default function InstitucionalPage(props: ReturnType<typeof loader>) {
  const dotClass =
    'before:content-[""] before:w-2.5 before:h-2.5 before:block before:rounded-[50%]';

  return (
    <div class="max-w-[1280px] mx-auto px-6 lg:px-14 mt-12 mb-20">
      <nav class="mb-3 lg:mb-5">
        <a class="text-base text-primary-300" href="/">Home{" > "}</a>
        <span class="text-base ">
          {props.text.title}
        </span>
      </nav>
      <div class="flex flex-col lg:grid lg:grid-cols-[290px_1fr] gap-11">
        <nav class="border py-8 px-7 border-primary-100">
          <ul class="flex flex-col gap-8">
            {props.menu.items.map((item) => (
              <li>
                <a
                  class={clx(
                    "text-base uppercase font-medium flex gap-2.5 items-center",
                    dotClass,
                    item.active
                      ? "before:bg-primary-900 text-primary-900"
                      : "before:bg-transparent text-primary-300",
                  )}
                  href={item.url}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div class="text-center lg:text-left">
          <div
            class="[&>p]:mt-[14px] [&>p]:mb-[30px] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: props.text.content }}
          />
        </div>
      </div>
    </div>
  );
}
