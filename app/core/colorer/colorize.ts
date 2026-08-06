export default function colorizeByRange<T extends Record<string, any>>(items: T[], colorRanges: (number | string)[], fieldValue = 'value') {
    return items.map((obj) => {
        const value = obj[fieldValue] as number;

        for (let i = 0; i < colorRanges.length; i += 2) {
            const rangeEnd = colorRanges[i] as number;
            const color = colorRanges[i + 1] as string;

            if (value <= rangeEnd || i === colorRanges.length - 2) {
                return {
                    ...obj,
                    color,
                };
            }
        }

        return obj;
    });
}
