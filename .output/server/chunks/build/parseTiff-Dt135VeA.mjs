import { fromArrayBuffer } from 'geotiff';

async function parseTiffDataset(buffer) {
  const tiff = await fromArrayBuffer(buffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const bands = image.getSamplesPerPixel();
  const bbox = image.getBoundingBox();
  const origin = image.getOrigin();
  const resolution = image.getResolution();
  const rawNoData = image.getGDALNoData?.();
  const noData = rawNoData != null && Number.isFinite(Number(rawNoData)) ? Number(rawNoData) : null;
  const rasters = await image.readRasters({ interleave: false });
  const values = new Float32Array(width * height * bands);
  for (let b = 0; b < bands; b++) {
    const src = rasters[b];
    const off = b * width * height;
    for (let i = 0; i < src.length; i++) values[off + i] = Number(src[i]);
  }
  return {
    header: {
      width,
      height,
      bands,
      bbox,
      noData,
      bandNames: Array.from({ length: bands }, (_, i) => `band_${i}`),
      geoTransform: [origin[0], resolution[0], 0, origin[1], 0, resolution[1]]
    },
    values
  };
}

export { parseTiffDataset };
//# sourceMappingURL=parseTiff-Dt135VeA.mjs.map
