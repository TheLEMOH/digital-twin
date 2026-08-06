import { BitmapLayer } from "@deck.gl/layers";

function clamp255(v) {
    return Math.max(0, Math.min(255, v));
}

export function valueInRange(value, range) {
    return Number.isFinite(value) && value >= range.min && value <= range.max;
}

export function turboColor(t) {
    if (t == 0) {
        return [0, 0, 0];
    }
    const x = Math.max(0, Math.min(1, t));
    const r = Math.round(34.61 + x * (1172.33 + x * (-10793.56 + x * (33300.12 + x * (-38394.49 + x * 14825.05)))));
    const g = Math.round(23.31 + x * (557.33 + x * (1225.33 + x * (-3574.96 + x * (1073.77 + x * 707.56)))));
    const b = Math.round(27.2 + x * (3211.1 + x * (-15327.97 + x * (27814 + x * (-22569.18 + x * 6838.66)))));
    return [clamp255(r), clamp255(g), clamp255(b)];
}

/**
 * Преобразует hex-строку (с # или без) в [r, g, b]
 */
function hexToRgb(hex) {
    if (typeof hex === 'string') {
        let h = hex.replace('#', '');
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        const bigint = parseInt(h, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    // если уже массив, возвращаем как есть
    return hex;
}

/**
 * Строит функцию получения цвета по значению на основе массива stops.
 * stops: [val1, color1, val2, color2, ...] (значения должны возрастать)
 */
function createColorStopsFunction(stops) {
    if (!Array.isArray(stops) || stops.length < 2 || stops.length % 2 !== 0) {
        throw new Error('colorStops должен быть массивом чётной длины: [value, color, value, color, ...]');
    }
    const pairs = [];
    for (let i = 0; i < stops.length; i += 2) {
        const val = stops[i];
        const color = hexToRgb(stops[i + 1]);
        if (typeof val !== 'number' || !Array.isArray(color) || color.length !== 3) {
            throw new Error('Некорректная пара: значение должно быть числом, цвет – hex-строкой или [r,g,b]');
        }
        pairs.push({ value: val, color });
    }
    pairs.sort((a, b) => a.value - b.value);

    return function (value) {
        if (value <= pairs[0].value) return pairs[0].color;
        if (value >= pairs[pairs.length - 1].value) return pairs[pairs.length - 1].color;

        for (let i = 0; i < pairs.length - 1; i++) {
            const lo = pairs[i];
            const hi = pairs[i + 1];
            if (value >= lo.value && value < hi.value) {
                const t = (value - lo.value) / (hi.value - lo.value);
                return [
                    Math.round(lo.color[0] + t * (hi.color[0] - lo.color[0])),
                    Math.round(lo.color[1] + t * (hi.color[1] - lo.color[1])),
                    Math.round(lo.color[2] + t * (hi.color[2] - lo.color[2])),
                ];
            }
        }
        return pairs[0].color;
    };
}

/**
 * Создаёт слой BitmapLayer из одного канала GeoTIFF.
 * @param {object} dataset - { header: { width, height, bbox } }
 * @param {TypedArray} band - одномерный массив пикселей
 * @param {number} min - минимальное значение для турбоцвета (используется только если colorStops не задан)
 * @param {number} max - максимальное значение для турбоцвета (используется только если colorStops не задан)
 * @param {number} opacity - прозрачность (0..1)
 * @param {number|null} noData - значение, считаемое прозрачным
 * @param {object} filterRange - { min, max } – значения вне этого диапазона становятся прозрачными
 * @param {Array} [colorStops] - массив [val, color, val, color, ...] для раскраски по значениям (если не задан – используется turboColor)
 * @returns {{ layer: BitmapLayer, visibleCount: number }}
 */
export function createBitmapLayer(
    dataset,
    band,
    min,
    max,
    opacity,
    noData,
    filterRange,
    colorStops = null
) {
    const { width, height } = dataset.header;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(width, height);
    const alpha = Math.round(255 * opacity);
    let visibleCount = 0;

    // Определяем функцию получения цвета
    let getColor;
    if (colorStops) {
        getColor = createColorStopsFunction(colorStops);
    } else {
        // Используем turboColor с нормировкой
        const range = Math.max(1e-12, max - min);
        getColor = (v) => {
            const t = Math.max(0, Math.min(1, (v - min) / range));
            return turboColor(t);
        };
    }

    for (let i = 0; i < band.length; i++) {
        const v = band[i];
        const px = i * 4;
        // Проверяем, попадает ли значение в filterRange и является ли допустимым
        if (
            !Number.isFinite(v) ||
            (noData != null && v === noData) ||
            !valueInRange(v, { min: filterRange.min, max: filterRange.max })
        ) {
            img.data[px + 3] = 0;
            continue;
        }

        // Получаем цвет: для colorStops передаём само значение v, для турбо – нормируем внутри getColor
        const color = getColor(v);
        const [r, g, b] = color;
        img.data[px] = r;
        img.data[px + 1] = g;
        img.data[px + 2] = b;
        img.data[px + 3] = alpha;
        visibleCount++;
    }
    ctx.putImageData(img, 0, 0);

    return {
        layer: new BitmapLayer({
            id: "field-overlay",
            image: canvas,
            bounds: dataset.header.bbox,
            pickable: false,
            beforeId: 'site',
            parameters: { depthWriteEnabled: false, depthCompare: "always" },
        }),
        visibleCount,
    };
}