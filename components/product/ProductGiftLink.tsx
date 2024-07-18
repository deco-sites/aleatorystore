export default function ProductGiftLink() {
  const pageUrl =
    `${window.location.href}&utm_source=whatsapp&utm_medium=msg&utm_campaign=quero_de_presente`;

  const message = encodeURIComponent(
    `Se você quiser me presentear, esse é um presente perfeito. Olha só: ${pageUrl}`,
  );
  const whatsappUrl = `https://api.whatsapp.com/send/?text=${message}`;

  return (
    <button>
      <a href={whatsappUrl} target={"_blank"} class="flex gap-2">
        <span class="underline">Eu quero de presente</span>
        <GiftIcon />
      </a>
    </button>
  );
}

const GiftIcon = () => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="22px"
    height="22px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
  >
    <rect
      x={1}
      y={18}
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      width={62}
      height={9}
    />
    <rect
      x={6}
      y={27}
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      width={52}
      height={31}
    />
    <line
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      x1={32}
      y1={58}
      x2={32}
      y2={18}
    />
    <path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M32,18c0,0-13,0.101-13-9c0-7,13-4.068,13,2 C32,17.067,32,18,32,18z"
    />
    <path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M32,18c0,0,13,0.101,13-9c0-7-13-4.068-13,2 C32,17.067,32,18,32,18z"
    />
  </svg>
);
