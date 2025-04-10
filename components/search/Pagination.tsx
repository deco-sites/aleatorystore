import { PageInfo } from "apps/commerce/types.ts";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";
import { clx } from "site/sdk/clx.ts";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalProducts: number;
}

interface PageButtonProps {
  page: number;
  icon?: AvailableIcons;
  url: string;
  isActive?: boolean;
}

interface FakePageButtonProps {
  content: string;
}

function FakePageButton({ content }: FakePageButtonProps) {
  return (
    <span class="btn btn-sm btn-outline hover:bg-transparent hover:text-primary-600">
      {content}
    </span>
  );
}

function PageButton({ page, icon, url, isActive }: PageButtonProps) {
  return (
    <a
      href={url}
      class={clx(
        "btn btn-sm",
        isActive ? "btn-secondary" : "btn-outline",
      )}
    >
      {icon ? <Icon id={icon} size={10} strokeWidth={2} /> : page}
    </a>
  );
}

export default function Pagination(
  props: PageInfo,
) {
  const currentPage = props.currentPage;
  const totalProducts = props.records;
  const totalPages = Math.ceil(
    (props.records ?? 1) / (props.recordPerPage ?? 1),
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  const makePageUrl = (page: number) => {
    const url = new URL(
      props.nextPage ?? props.previousPage ?? "?page=2",
      "https://www.aleatorystore.com.br",
    );
    url.searchParams.set("page", page.toString());
    return url.search;
  };

  return (
    <div class="flex flex-col items-center gap-1">
      <span>
        Página <span class="font-bold">{currentPage}</span> de{" "}
        <span class="font-bold">{totalPages}</span> -{" "}
        <span class="font-bold">{totalProducts}</span> produtos encontrados
      </span>
      <div class="flex gap-1 justify-center">
        {!isFirstPage && (
          <PageButton
            page={previousPage}
            icon="ChevronLeft"
            url={makePageUrl(previousPage)}
            isActive={currentPage === previousPage}
          />
        )}
        {currentPage > 2
          ? (
            <PageButton
              page={1}
              url={makePageUrl(1)}
              isActive={currentPage === 1}
            />
          )
          : null}
        {currentPage > 3 ? <FakePageButton content="..." /> : null}
        {previousPage > 0
          ? (
            <PageButton
              page={previousPage}
              url={makePageUrl(previousPage)}
              isActive={currentPage === previousPage}
            />
          )
          : null}

        {currentPage === totalPages ? null : (
          <PageButton
            page={currentPage}
            url={makePageUrl(currentPage)}
            isActive={currentPage === currentPage}
          />
        )}
        {nextPage < totalPages
          ? (
            <PageButton
              page={nextPage}
              url={makePageUrl(nextPage)}
              isActive={currentPage === nextPage}
            />
          )
          : null}
        {currentPage < totalPages - 2 ? <FakePageButton content="..." /> : null}
        <PageButton
          page={totalPages}
          url={makePageUrl(totalPages)}
          isActive={currentPage === totalPages}
        />
        {!isLastPage && (
          <PageButton
            page={nextPage}
            icon="ChevronRight"
            url={makePageUrl(nextPage)}
            isActive={currentPage === nextPage}
          />
        )}
      </div>
    </div>
  );
}
