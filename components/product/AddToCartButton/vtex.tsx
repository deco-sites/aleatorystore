import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  quantity: number;
  gotoCheckout?: boolean;
  disabled?: boolean;
}

function AddToCartButton(
  {
    seller,
    productID,
    eventParams,
    gotoCheckout,
    disabled,
    quantity,
    className,
    label,
  }: Props,
) {
  const { addItems } = useCart();

  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantity,
      }],
    });

  return (
    <Button
      onAddItem={onAddItem}
      eventParams={eventParams}
      gotoCheckout={gotoCheckout}
      disabled={disabled}
      className={className}
      label={label}
    />
  );
}

export default AddToCartButton;
