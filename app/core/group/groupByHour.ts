import type SiteData from "~/types/siteData";

export default function groupByHour(data: SiteData[]) {
    const grouped: Record<string, SiteData[]> = {};

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