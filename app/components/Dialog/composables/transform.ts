export enum Indicators {
    temp = "temp",
    press = "prmsl",
    gust = "gust",
    ugrd = "ugrd",
    vgrd = "vgrd",
}

export const dataExtremes: { [x: string]: [number, number] } = {
    [Indicators.temp]: [-100, 70],
    [Indicators.press]: [85000 / 133.332, 109000 / 133.332],
    [Indicators.gust]: [0, 200],
    [Indicators.ugrd]: [-100, 100],
    [Indicators.vgrd]: [-100, 100],
};

export const from255 = (value: number, indicator: Indicators) =>
    (value * (dataExtremes[indicator][1] - dataExtremes[indicator][0])) / 255 + dataExtremes[indicator][0];