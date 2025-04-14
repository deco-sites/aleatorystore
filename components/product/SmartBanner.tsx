import { useScriptAsDataURI } from "@deco/deco/hooks";

const urlClick = () => {
  const button = document.getElementById("smart-banner-pdp");

  button?.addEventListener("click", () => {
    const ANDROID_URL =
      "https://play.google.com/store/apps/details?id=com.mob1st.vtex.aleatorystory";
    const IOS_URL =
      "https://apps.apple.com/us/app/aleatorystore/id1117481251?l=pt-BR";
    const isAndroid = navigator.userAgent.match(/Android/i);
    const url = isAndroid ? ANDROID_URL : IOS_URL;
    window.open(url, "_blank");
  });
};

export default function SmartBanner() {
  return (
    <>
      <button
        type="button"
        id="smart-banner-pdp"
        class="flex items-center gap-2 bg-primary-900 text-primary-100 w-fit mx-auto p-2 rounded-md mt-4 lg:hidden"
      >
        <img src="https://aleatory.vtexassets.com/assets/vtex.file-manager-graphql/images/7e0ee63c-78f2-4c94-825e-26425418e235___3b7c58cca858959ae43501ee8b3d8286.svg" />
        <div>
          <p class="text-sm font-bold">OFERTAS EXCLUSIVAS NO APP</p>
          <p class="text-sm">Baixe o Agora</p>
        </div>
      </button>
      <script
        type="module"
        defer
        src={useScriptAsDataURI(urlClick)}
      />
    </>
  );
}
