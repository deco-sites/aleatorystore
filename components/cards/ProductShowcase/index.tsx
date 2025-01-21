import ThreeDispositon from "./ThreeDisposition.tsx";
import TwoDisposition from "./TwoDisposition.tsx";
import { Props } from "./types.ts";

export default function ProductShowcase(props: Props) {
  if (props.images.length === 2) return <TwoDisposition {...props} />;
  return <ThreeDispositon {...props} />;
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
