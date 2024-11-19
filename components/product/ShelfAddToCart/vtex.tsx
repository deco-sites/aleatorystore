import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  quantity: number;
  gotoCheckout?: boolean;
  disabled?: boolean;
}

function ShefAddToCartButtonVtex(
  {
    seller,
    analyticsItem,
    cardId,
    gotoCheckout,
    disabled,
    quantity,
    label,
    classNames,
  }: Props,
) {
  const { addItems } = useCart();

  const onAddItem = (id: string) =>
    addItems({
      orderItems: [{
        id,
        seller: seller,
        quantity: quantity,
      }],
    });

  return (
    <Button
      onAddItem={onAddItem}
      analyticsItem={analyticsItem}
      cardId={cardId}
      gotoCheckout={gotoCheckout}
      disabled={disabled}
      label={label}
      classNames={classNames}
    />
  );
}

export default ShefAddToCartButtonVtex;
