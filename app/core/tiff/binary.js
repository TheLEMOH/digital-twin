export function normalizeBinaryHeader(rawHeader) {
    const bands = rawHeader.bands ?? rawHeader.levels;
    if (typeof bands !== "number" || !Number.isInteger(bands) || bands <= 0) {
        throw new Error("Некорректный GTB-заголовок: не задано количество bands/levels");
    }

    return { ...rawHeader, bands };
}

export function parseBinaryDataset(buffer) {
    const view = new DataView(buffer);
    const magic = new TextDecoder().decode(buffer.slice(0, 4));

    const headerLength = view.getUint32(8, true);
    const dataOffset = 12 + headerLength;
    const header = normalizeBinaryHeader(JSON.parse(
        new TextDecoder().decode(buffer.slice(12, dataOffset)),
    ));

    const components = header.variables?.length ?? 1;
    const expected = header.width * header.height * header.bands * components;
    if (dataOffset + expected * 4 > buffer.byteLength) {
        throw new Error(`Некорректный GTB-файл: ожидалось ${expected} float32 значений`);
    }
    const values = dataOffset % 4 === 0
        ? new Float32Array(buffer, dataOffset, expected)
        : new Float32Array(buffer.slice(dataOffset, dataOffset + expected * 4));

    return { header, values };
}
