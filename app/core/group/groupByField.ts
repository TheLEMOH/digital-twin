export default function groupByField<T extends Record<string, unknown>>(data: T[], field: keyof T): Record<string, T[]> {
    const grouped: Record<string, T[]> = {};

    data.forEach(item => {
        const fieldKey = String(item[field]);

        if (!grouped[fieldKey]) {
            grouped[fieldKey] = [];
        }

        grouped[fieldKey].push(item);
    });

    return grouped;
}
