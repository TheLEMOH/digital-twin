export function getComponentBand(
  dataset, componentIndex, bandIndex,
) {
  const { width, height, bands } = dataset.header;
  const size = width * height;
  const start = componentIndex * bands * size + bandIndex * size;
  return dataset.values.subarray(start, start + size);
}

/** Возвращает канал скалярного поля (сокращение для getComponentBand(ds, 0, band)) */
export function getBandView(dataset, bandIndex) {
  return getComponentBand(dataset, 0, bandIndex)
}