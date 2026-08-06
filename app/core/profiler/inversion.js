function getProfile(day) {
    const levels = [];
    for (const key in day) {
        if (key.startsWith('t_h')) {
            const height = parseInt(key.slice(3), 10);
            levels.push({ height, temp: day[key] });
        }
    }
    levels.sort((a, b) => a.height - b.height); // по возрастанию высоты
    return levels;
}

function calculateInversion(day) {
    const profile = getProfile(day);
    let inversionSum = 0;
    for (let i = 0; i < profile.length - 1; i++) {
        const lower = profile[i];
        const upper = profile[i + 1];
        const diff = upper.temp - lower.temp;
        if (diff > 0) {
            inversionSum += diff;
        }
    }
    return inversionSum;
}

export function analyzeInversions(data) {
    const daily = data.map(day => ({
        time: day.time,
        inversion: calculateInversion(day)
    }));
    const total = daily.reduce((s, r) => s + r.inversion, 0);
    return { daily, average: total / daily.length };
}
