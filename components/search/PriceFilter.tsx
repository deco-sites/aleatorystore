import { FilterToggle } from "apps/commerce/types.ts";
import { useCallback } from "preact/hooks";
import MultiRangeSlider from "site/components/ui/MultiRangeSlider.tsx";

export default function ShowPriceItem(props: FilterToggle) {
    const { values } = props;
    const minPrice = values[0].value.split(":")[0];
    const maxPrice = values[values.length - 1].value.split(":")[1];
    const currentUrlObject = new URL(
        globalThis.location.href ?? "https://localhost",
    );
    const currentPrice = currentUrlObject?.searchParams.get("filter.price");
    const min = currentPrice ? currentPrice.split(":")[0] : minPrice;
    const max = currentPrice ? currentPrice.split(":")[1] : maxPrice;

    const changeUrl = useCallback((min: number, max: number) => {
        if (!currentUrlObject) return null;
        currentUrlObject.searchParams.set("filter.price", `${min}:${max}`);
        globalThis.location.href = currentUrlObject.toString();
    }, [values]);

    if (!currentUrlObject) return null;

    return (
        <div>
            <MultiRangeSlider
                maxVal={max}
                minVal={min}
                max={maxPrice}
                min={minPrice}
                step="0.01"
                onChange={changeUrl}
            />
        </div>
    );
}
