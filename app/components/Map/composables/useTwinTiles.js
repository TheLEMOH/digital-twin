import initSqlJs from "sql.js";
import sqlWasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { getBandView } from "./binaryFormat";
import { createBitmapLayer } from "./bitMapLayer";
import colorer from "~/core/colorer";
/* import { parseTiffDataset } from "~/core/tiff/parseTiff"; */
const { parseTiffDataset } = await import("~/core/tiff/parseTiff");

const codes = {
    "AL": null,
    "ALB": null,
    "ALT": null,
    "co": "i63",
    "E_CO": "i63",
    "E_HCHO": "i298",
    "E_NH3": "i60",
    "E_NO": "i59",
    "E_NO2": "i58",
    "E_SO2": "i62",
    "EXCH_H": null,
    "hcho": "i298",
    "HGT": null,
    "hno3": null,
    "MAPFAC_M": null,
    "MAPFAC_MX": null,
    "MAPFAC_MY": null,
    "MAPFAC_U": null,
    "MAPFAC_V": null,
    "MU": null,
    "MU_U": null,
    "MU_V": null,
    "MUB": null,
    "nh3": "i60",
    "no": "i59",
    "no2": "i58",
    "no3": null,
    "o3": null,
    "P": "m-p",
    "PB": null,
    "PH": null,
    "PHB": null,
    "RHO": null,
    "RW": null,
    "so2": "i62",
    "T": "m-t",
    "wind": "m-wv",
    "WW": null,
    "XKHH": null,
    "XKHV": null,
    "XKMH": null,
    "XKMV": null
}

let sqlJsPromise = null

function getSqlJs() {
    if (!sqlJsPromise) {
        sqlJsPromise = initSqlJs({
            locateFile: () => sqlWasmUrl,
        });
    }
    return sqlJsPromise;
}

function requiredColumn(columns, name) {
    const index = columns.indexOf(name);
    if (index === -1) throw new Error(`Missing required SQLite column: ${name}`);
    return index;
}

function asText(value, column) {
    if (typeof value !== "string") throw new Error(`Expected text in SQLite column: ${column}`);
    return value;
}

export function readTwinRowsFromDatabase(db) {
    const result = db.exec(`
    select dataset, path, start, end, format
    from datasets
    order by dataset, start
  `);

    if (result.length === 0 || result[0].values.length === 0) {
        throw new Error("datasets table is empty or missing");
    }

    const { columns, values } = result[0];
    const datasetIdx = requiredColumn(columns, "dataset");
    const pathIdx = requiredColumn(columns, "path");
    const startIdx = requiredColumn(columns, "start");
    const endIdx = requiredColumn(columns, "end");
    const formatIdx = requiredColumn(columns, "format");

    return values.map((row) => ({
        dataset: asText(row[datasetIdx], "dataset"),
        path: asText(row[pathIdx], "path"),
        start: asText(row[startIdx], "start"),
        end: asText(row[endIdx], "end"),
        format: asText(row[formatIdx], "format"),
    }));
}

const updateLayer = (overlay, layer) => {
    overlay.setProps({ layers: [layer] })
}

const getTiff = async ({ date, indicator }) => {
    const parseDate = date.split(' ')[0].split('-')
    const parseTime = date.split(' ')[1].split(':')
    const yearMonth = `${parseDate[0]}${parseDate[1]}`
    const day = parseDate[2]
    const yearMonthDay = `${yearMonth}${day}`
    /*     const tiff = await fetch(`/gis/twin-files/${indicator}/${yearMonth}/${day}/${indicator}_${yearMonthDay}_${parseTime[0]}0000.tiff`) */
    const tiff = await fetch(`https://gis.krasn.ru/twin-files/${indicator}/${yearMonth}/${day}/${indicator}_${yearMonthDay}_${parseTime[0]}0000.tiff`)
    return tiff
}

const createLayer = async ({ tiff, selectedBand, opacity, range, indicator }) => {
    const buffer = await tiff.arrayBuffer()
    const dataset = await parseTiffDataset(buffer)
    const noData = dataset.header.noData ?? null;
    const tiffBand = getBandView(dataset, selectedBand);

    const color = colorer.getScheme(codes[indicator])

    const result = createBitmapLayer(dataset, tiffBand, range[0], range[1], opacity, noData, { min: range[0], max: range[1] }, color);
    return { tiffLayer: result.layer, dataset, tiffBand }
}

export default async function useTwinTiles({ map, selectedDate, tiffOpacity, selectedBand, selectedTiffIndicator, tiffFilterRange }) {
    const tiffDataset = shallowRef(null)
    const layer = shallowRef(null)
    const band = shallowRef(null)

    map.on('load', async () => {

        /*     const twinIndex = await fetch(`/sqlite`)
    
            const SQL = await getSqlJs()
            const db = new SQL.Database(new Uint8Array(await twinIndex.arrayBuffer())) */

        const overlay = new MapboxOverlay({
            interleaved: true,
            layers: []
        })

        map.addControl(overlay);

        watch([tiffFilterRange, selectedBand, tiffOpacity], async ([range, bandNumber, opacity]) => {

            const color = colorer.getScheme(codes[selectedTiffIndicator.value])

            band.value = getBandView(tiffDataset.value, bandNumber);
            const result = createBitmapLayer(tiffDataset.value, band.value, range[0], range[1], opacity, null, { min: range[0], max: range[1] }, color);
            layer.value = result.layer

            updateLayer(overlay, result.layer)
        })

        watch([selectedDate, selectedTiffIndicator], async ([date, indicator]) => {

            const tiff = await getTiff({ date, indicator })

            if (tiff.ok) {
                const { tiffLayer, dataset, tiffBand } = await createLayer({ tiff, selectedBand: selectedBand.value, opacity: tiffOpacity.value, range: tiffFilterRange.value, indicator })
                tiffDataset.value = dataset
                band.value = tiffBand
                layer.value = tiffLayer
                updateLayer(overlay, tiffLayer)
            }
            else {
                updateLayer(overlay, null)
            }

        }, { immediate: true })
    })
}