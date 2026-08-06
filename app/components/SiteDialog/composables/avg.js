
function calculateHourlyAverage(allSitesData) {
    // 1. Собираем все уникальные временные метки
    const timeMap = new Map();

    for (const siteData of allSitesData) {
        for (const [time, value] of siteData) {
            const existing = timeMap.get(time);
            if (existing) {
                existing.sum += value;
                existing.count++;
            } else {
                timeMap.set(time, { sum: value, count: 1 });
            }
        }
    }

    // 2. Преобразуем в массив средних значений, сортируем по времени
    const result = [];
    for (const [time, { sum, count }] of timeMap.entries()) {
        result.push([time, (sum / count).toFixed(3)]);
    }

    // Сортируем по времени (предполагаем, что формат YYYY-MM-DD HH:MM:SS позволяет лексикографическую сортировку)
    result.sort((a, b) => a[0].localeCompare(b[0]));
    return result;
}

export default calculateHourlyAverage