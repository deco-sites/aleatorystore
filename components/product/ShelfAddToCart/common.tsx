import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useState } from "preact/hooks";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { clx } from "../../../sdk/clx.ts";
import { useUI } from "../../../sdk/useUI.ts";
import Button from "../../ui/ButtonStyled.tsx";

export interface Props {
  /** @description: sku name */
  analyticsItem: ReturnType<typeof mapProductToAnalyticsItem>[];
  onAddItem: (id: string) => Promise<void>;
  gotoCheckout?: boolean;
  disabled?: boolean;
  cardId: string;
  label: string;
  classNames?: string;
}

const useAddToCart = (
  { onAddItem, gotoCheckout, cardId, analyticsItem }: Props,
) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const card = document.getElementById(cardId);
    if (!card) return;
    const id = card.getAttribute("data-product-id");
    if (!id) return;
    try {
      setLoading(true);

      await onAddItem(id);
      const analyticItem = analyticsItem.find((item) => {
        if ("item_id" in item) {
          return item.item_id === id;
        } else return false;
      });
      if (analyticItem) {
        sendEvent({
          name: "add_to_cart",
          params: {
            items: [analyticItem],
          },
        });
      }

      gotoCheckout ? null : displayCart.value = true;
    } finally {
      setLoading(false);
      setTimeout(() => {
        gotoCheckout ? globalThis.window.location.href = "/checkout" : null;
      }, 500);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);
  const { label, classNames } = props;

  return props.gotoCheckout
    ? (
      <Button
        {...btnProps}
        class={clx(
          "w-full hover:bg-primary-700 hover:text-secondary-neutral-100 disabled:bg-text-secondary-neutral-100 disabled:border disabled:border-bg-primary-700",
          classNames,
        )}
        negative
        disabled={props.disabled}
      >
        {label}
      </Button>
    )
    : (
      <Button
        {...btnProps}
        class={clx("w-full hover:bg-primary-700", classNames)}
        negative
        disabled={props.disabled}
      >
        {label}
      </Button>
    );
}
