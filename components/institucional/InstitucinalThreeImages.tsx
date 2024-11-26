import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  images: ImageWidget[];
}

export default function InstitucinalThreeImages(props: Props) {
  return (
    <div class="grid grid-cols-3 gap-5 lg:max-w-[80rem] mx-auto">
      {props.images.map((image, index) => <img src={image} key={index} />)}
    </div>
  );
}
