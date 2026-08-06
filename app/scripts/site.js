const CreateSiteFeature = (site) => {
    return {
        type: "Feature",
        properties: {
            id: site.id,
            name: site.name,
            code: site.code,
            ...site.data
        },
        geometry: {
            type: "Point",
            coordinates: [site.geom_x, site.geom_y],
        },
    };
};

const CreateSiteFeatureCollection = (sites) => {
    const features = sites.map((site) => {
        return CreateSiteFeature(site);
    });

    return {
        type: "FeatureCollection",
        features: features,
    };
};

export { CreateSiteFeatureCollection };
