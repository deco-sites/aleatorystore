import { useScript } from "@deco/deco/hooks";

export default function GoToTop() {
    return (
        <button
            id="go-to-top"
            class="fixed bottom-4 right-4 z-50 bg-primary-900 w-[40px] h-[40px] rounded-full flex items-center justify-center hidden"
            hx-on:click={useScript(() => {
                window.scrollTo({
                    "top": 0,
                    "behavior": "smooth",
                });
            })}
        >
            <img
                width="24"
                height="24"
                class="rotate-90"
                src="https://aleatory.vtexassets.com/assets/vtex/assets-builder/aleatory.store/0.0.947/svg/arrow-back-to-top___b11bb99d7ce5333e63345d8973d62313.svg"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: useScript(() => {
                        globalThis.addEventListener("scroll", () => {
                            const button = document.getElementById("go-to-top");
                            if (button) {
                                button.classList.toggle(
                                    "hidden",
                                    window.scrollY < 100,
                                );
                            }
                        });
                    }),
                }}
            />
        </button>
    );
}
