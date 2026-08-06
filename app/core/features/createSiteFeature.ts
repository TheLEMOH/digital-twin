import type Dta from "~/types/dta";
import groupByHour from "../group/groupByHour";
import type SiteData from "~/types/siteData";
import type Site from "~/types/site";
import type { FeatureCollectionsMap } from "~/types/featureCollection";

const createSiteFeature = (site: Site, data: SiteData): GeoJSON.Feature => {
    return {
        type: "Feature",
        properties: {
            ...site,
            ...data
        },
        geometry: {
            type: "Point",
            coordinates: [site.geom_x, site.geom_y],
        },
    };
};

const createSiteFeatureCollection = (sites: Site[], data: SiteData[]): FeatureCollectionsMap => {
    const groupedByHour = groupByHour<SiteData>(data)

    const res: FeatureCollectionsMap = {}

    for (const time in groupedByHour) {

        const featuresCollection: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: []
        }

        const features: GeoJSON.Feature[] = []

        sites.forEach(site => {
            const filtered = groupedByHour[time]?.find(i => i.site == site.id)
            if (filtered)
                features.push(createSiteFeature(site, filtered))

        })

        featuresCollection.features = features

        res[time] = featuresCollection
    }

    return res
};

export { createSiteFeatureCollection };
