import { Menu } from "site/components/institucional/InstitucionalPage.tsx";
interface Props {
  items: {
    label: string;
    url: string;
  }[];
}
export default function loader(props: Props): Menu {
  return props;
}
