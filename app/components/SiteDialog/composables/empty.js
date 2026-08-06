function normalizeEntry(entry, mode) {
    if (!Array.isArray(entry) || entry.length !== 2) return null;
    const [dateTimeStr, value] = entry;
    if (typeof dateTimeStr !== 'string') return null;

    const [datePart, timePart] = dateTimeStr.split(' ');
    if (!datePart || !timePart) return null;

    const [year, month, day] = datePart.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

    let dateObj;
    if (mode === 'daily') {
        dateObj = new Date(year, month - 1, day);
    } else {
        const hour = parseInt(timePart.split(':')[0], 10);
        if (isNaN(hour)) return null;
        dateObj = new Date(year, month - 1, day, hour);
    }
    if (isNaN(dateObj.getTime())) return null;

    let key;
    if (mode === 'daily') {
        key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else {
        const hour = dateObj.getHours();
        key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}|${hour}`;
    }
    return { key, dateObj, value };
}

function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date, mode) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (mode === 'daily') {
        return `${year}-${month}-${day} 00:00:00`;
    } else {
        const hour = String(date.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:00:00`;
    }
}

function buildMapAndRange(data, mode, forcedStart, forcedEnd) {
    const map = new Map();
    let minDate = forcedStart ? new Date(forcedStart) : null;
    let maxDate = forcedEnd ? new Date(forcedEnd) : null;

    for (const entry of data) {
        const normalized = normalizeEntry(entry, mode);
        if (!normalized) continue;

        const { key, dateObj, value } = normalized;
        map.set(key, value);

        if (!forcedStart) {
            const dayStart = startOfDay(dateObj);
            const ts = dayStart.getTime();
            if (minDate === null || ts < minDate.getTime()) minDate = dayStart;
            if (maxDate === null || ts > maxDate.getTime()) maxDate = dayStart;
        }
    }
    if (minDate === null || maxDate === null) return { map, minDate: null, maxDate: null };
    if (forcedStart) minDate.setHours(0, 0, 0, 0);
    if (forcedEnd) maxDate.setHours(0, 0, 0, 0);
    return { map, minDate, maxDate };
}

function generateHourly(minDate, maxDate, existingMap) {
    const result = [];
    let current = new Date(minDate);

    while (current.getTime() <= maxDate.getTime()) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        for (let hour = 0; hour <= 23; hour++) {
            const key = `${dateStr}|${hour}`;
            const value = existingMap.has(key) ? existingMap.get(key) : null;
            const dateObj = new Date(year, current.getMonth(), current.getDate(), hour);
            result.push([formatDate(dateObj, 'hourly'), value]);
        }
        current.setDate(current.getDate() + 1);
    }
    return result;
}

function generateDaily(minDate, maxDate, existingMap) {
    const result = [];
    let current = new Date(minDate);

    while (current.getTime() <= maxDate.getTime()) {
        const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
        const value = existingMap.has(key) ? existingMap.get(key) : null;
        result.push([formatDate(current, 'daily'), value]);
        current.setDate(current.getDate() + 1);
    }
    return result;
}

function detectMode(data) {
    const uniqueDays = new Set();
    for (const entry of data) {
        if (!Array.isArray(entry) || entry.length !== 2) continue;
        const dateTimeStr = entry[0];
        if (typeof dateTimeStr !== 'string') continue;
        const datePart = dateTimeStr.split(' ')[0];
        if (datePart) uniqueDays.add(datePart);
    }
    return uniqueDays.size <= 5 ? 'hourly' : 'daily';
}

export default function fillMissingData(data, startDate, endDate) {
    if (!Array.isArray(data) || data.length === 0) return [];

    const mode = detectMode(data);
    const { map, minDate, maxDate } = buildMapAndRange(data, mode, startDate, endDate);
    if (minDate === null || maxDate === null) return [];

    if (mode === 'hourly') {
        return generateHourly(minDate, maxDate, map);
    } else {
        return generateDaily(minDate, maxDate, map);
    }
}