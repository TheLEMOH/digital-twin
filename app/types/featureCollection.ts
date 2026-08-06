export type Position = number[];

export type Geometry =
    | { type: "Point"; coordinates: Position }
    | { type: "MultiPoint"; coordinates: Position[] }
    | { type: "LineString"; coordinates: Position[] }
    | { type: "MultiLineString"; coordinates: Position[][] }
    | { type: "Polygon"; coordinates: Position[][] }
    | { type: "MultiPolygon"; coordinates: Position[][][] }
    | { type: "GeometryCollection"; geometries: Geometry[] }
    | null;

export type GeoJsonProperties = Record<string, unknown> | null;

export interface Feature<
    G extends Geometry | null = Geometry | null,
    P = GeoJsonProperties
> {
    type: "Feature";
    geometry: G;
    properties: P;
    id?: string | number | null;
}

export interface FeatureCollection<
    G extends Geometry | null = Geometry | null,
    P = GeoJsonProperties
> {
    type: "FeatureCollection";
    features: Array<Feature<G, P>>;
}

export type FeatureCollectionsMap = Record<string, GeoJSON.GeoJSON>;