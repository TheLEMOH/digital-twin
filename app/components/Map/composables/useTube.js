import maplibregl from "maplibre-gl";
import * as THREE from "three";

function calculateDistanceMercatorToMeters(from, to) {
    const mercatorPerMeter = from.meterInMercatorCoordinateUnits();
    const dEast = to.x - from.x;
    const dEastMeter = dEast / mercatorPerMeter;
    const dNorth = from.y - to.y;
    const dNorthMeter = dNorth / mercatorPerMeter;
    return { dEastMeter, dNorthMeter };
}


export default function useTube({ map }) {
    map.on('load', () => {
        const tubes = [
            { x: 93.029659, y: 56.024332, height: 300, },
            { x: 93.033493, y: 56.025403, height: 250 },

            { x: 92.898606, y: 55.970713, height: 250 },
            { x: 92.901071, y: 55.970737, height: 250 },

            { x: 93.094622, y: 56.109603, height: 250 },
            { x: 93.090299, y: 56.106921, height: 150 }
        ]

        tubes.forEach((tube, index) => {

            const sceneOrigin = new maplibregl.LngLat(tube.x, tube.y);

            const customLayer = {
                id: `3d-model ${index}`,
                type: "custom",
                renderingMode: "3d",
                onAdd: function (map, gl) {
                    try {
                        this.camera = new THREE.Camera();
                        this.scene = new THREE.Scene();
                        this.map = map;
                        this.renderer = new THREE.WebGLRenderer({
                            canvas: map.getCanvas(),
                            context: gl,
                            antialias: true,
                        });
                        this.renderer.autoClear = false;

                        const scene = new maplibregl.LngLat(tube.x, tube.y);
                        const modelLocation = new maplibregl.LngLat(tube.x, tube.y);

                        const sceneElevation = map.queryTerrainElevation(scene);
                        const model1Elevation = map.queryTerrainElevation(modelLocation);

                        const model1up = model1Elevation + (tube.height / 2) - sceneElevation;
                        const sceneOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(scene);
                        const model1Mercator = maplibregl.MercatorCoordinate.fromLngLat(modelLocation);

                        const { dEastMeter: model1east, dNorthMeter: model1north } = calculateDistanceMercatorToMeters(sceneOriginMercator, model1Mercator);

                        const geometry = new THREE.CylinderGeometry(10, 20, tube.height, 16, 3);

                        const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });

                        const tubeModel = new THREE.Mesh(geometry, material);

                        tubeModel.position.set(model1east, model1north, model1up);

                        tubeModel.rotation.x = Math.PI / 2

                        this.scene.add(tubeModel);

                    }

                    catch (e) {
                        console.log(e)
                    }
                },

                render: function (gl, args) {
                    const offsetFromCenterElevation = map.queryTerrainElevation(sceneOrigin) || 0;
                    const sceneOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(sceneOrigin, offsetFromCenterElevation);

                    const sceneTransform = {
                        translateX: sceneOriginMercator.x,
                        translateY: sceneOriginMercator.y,
                        translateZ: sceneOriginMercator.z,
                        scale: sceneOriginMercator.meterInMercatorCoordinateUnits()
                    };

                    const m = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
                    const l = new THREE.Matrix4()
                        .makeTranslation(sceneTransform.translateX, sceneTransform.translateY, sceneTransform.translateZ)
                        .scale(new THREE.Vector3(sceneTransform.scale, -sceneTransform.scale, sceneTransform.scale));

                    this.camera.projectionMatrix = m.multiply(l);
                    this.renderer.resetState();
                    this.renderer.render(this.scene, this.camera);
                    map.triggerRepaint();
                },
            };

            map.addLayer(customLayer)
        })
    })
}