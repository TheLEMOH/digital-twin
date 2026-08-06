import { from255, Indicators } from "~/components/Dialog/composables/transform";

export const calculateWind = (u: number, v: number) => {
    u = from255(u, Indicators.ugrd);
    v = from255(v, Indicators.vgrd);

    return {
        speed: +Math.sqrt(u ** 2 + v ** 2).toFixed(1),
        direction: Math.atan(v / u),
    };
};