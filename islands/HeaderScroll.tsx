import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { headerHeight } from "../components/header/constants.ts";

export interface Props {
  children: ComponentChildren;
}

function HeaderScroll({ children }: Props) {
  const isScrolling = useSignal(false);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        isScrolling.value = true;
      } else {
        isScrolling.value = false;
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    addEventListener("scroll", handleScroll);

    return () => removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: headerHeight }}>
      <div
        className={`transition-header ${
          isScrolling.value ? "header-hidden" : "header-visible"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default HeaderScroll;
