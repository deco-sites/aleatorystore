import ButtonBanner from "../../components/ui/ButtonBanner.tsx";

interface Props {
  title: string;
  subtitle: string;
  content: string;
  cta: {
    label: string;
    url: string;
  };
}

export default function AboutUs(props: Props) {
  const { content, subtitle, title, cta } = props;
  return (
    <article class="block text-center text-[rgb(59,59,59)] mt-5 mb-20 mx-0 px-[10px] lg:px-[10%] py-0">
      <h3 class="text-3xl font-normal uppercase block mb-5">
        {title}
      </h3>
      <h4 class="text-[15px] uppercase font-light mb-5">{subtitle}</h4>
      <p class="text-sm leading-[23px]">{content}</p>
      <ButtonBanner class="!my-5" href={cta.url}>
        {cta.label}
      </ButtonBanner>
    </article>
  );
}
