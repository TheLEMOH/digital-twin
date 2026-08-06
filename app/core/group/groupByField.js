export default function groupByHour(data, field) {
    const grouped = {};

    data.forEach(item => {
        const dateTime = item[field];

        const hourKey = dateTime

        if (!grouped[hourKey]) {
            grouped[hourKey] = [];
        }

        grouped[hourKey].push(item);
    });

    return grouped;
}