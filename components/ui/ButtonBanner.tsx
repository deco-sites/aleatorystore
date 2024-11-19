import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

export type PropsButton =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    ariaLabel?: string;
    negative?: boolean;
  };

export type PropsAnchor =
  & Omit<JSX.IntrinsicElements["a"], "loading">
  & {
    loading?: boolean;
    ariaLabel?: string;
    negative?: boolean;
  };

const ButtonBanner = forwardRef<HTMLButtonElement, PropsButton>(({
  type = "button",
  class: _class = "",
  negative = false,
  loading,
  disabled,
  ariaLabel,
  children,
  ...props
}, ref) => (
  <button
    {...props}
    className={`btn no-animation rounded-none
    ${
      negative
        ? "bg-primary-600 text-secondary-neutral-100 text-sm font-normal border-transparent py-3 px-6 w-fit uppercase hover:bg-secondary-neutral-100 hover:text-primary-600 hover:border-primary-600"
        : "bg-secondary-neutral-100 text-sm font-normal border-primary-600 py-3 px-6 w-fit uppercase hover:bg-primary-600 hover:text-secondary-neutral-100 hover:border-transparent"
    } ${_class} `}
    disabled={disabled || loading}
    aria-label={ariaLabel || props["aria-label"]}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </button>
));

export const LinkButtonBanner = forwardRef<HTMLAnchorElement, PropsAnchor>(({
  type = "button",
  class: _class = "",
  negative = false,
  loading,
  disabled,
  ariaLabel,
  children,
  ...props
}, ref) => (
  <a
    {...props}
    className={`btn no-animation rounded-none
    ${
      negative
        ? "bg-primary-600 text-secondary-neutral-100 text-sm font-normal border-transparent py-3 px-6 w-fit uppercase hover:bg-secondary-neutral-100 hover:text-primary-600 hover:border-primary-600"
        : "bg-secondary-neutral-100 text-sm font-normal border-primary-600 py-3 px-6 w-fit uppercase hover:bg-primary-600 hover:text-secondary-neutral-100 hover:border-transparent"
    } ${_class} `}
    disabled={disabled || loading}
    aria-label={ariaLabel || props["aria-label"]}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </a>
));

export default ButtonBanner;
