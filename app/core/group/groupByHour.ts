export default function groupByHour<T>(data: any[]) {
    const grouped: Record<string, T[]> = {};

    data.forEach(item => {
        const dateTime = item.time;

        const hourKey = dateTime.substring(0, 19);

        if (!grouped[hourKey]) {
            grouped[hourKey] = [];
        }

        grouped[hourKey].push(item);
    });

    return grouped;
}