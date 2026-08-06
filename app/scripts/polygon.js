import * as THREE from "three"

const lngLatToThreeJS = (lng, lat, scale = 1) => {
    const x = (lng / 180) * 20037508.34 * scale; // Масштабируем для сцены
    const y = ((Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) * 20037508.34 * scale) / 180;
    return { x, y };
};


function displayMultiPolygon(multiPolygonGeometry, map) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    let vertexCount = 0;

    // Обрабатываем все полигоны
    multiPolygonGeometry.features[0].geometry.coordinates.forEach(polygonGroup => {
        polygonGroup.forEach(polygon => {
            // Добавляем вершины для каждого полигона
            polygon.forEach(coord => {

                const point = map.project([coord[0], coord[1]]);

                point.x = point.x * 10
                point.y = point.y * 10

                vertices.push(
                    point.x,
                    point.y,
                    0
                );

                console.log(vertices)
            });

            for (let i = 1; i < polygon.length - 1; i++) {
                indices.push(
                    vertexCount,
                    vertexCount + i,
                    vertexCount + i + 1
                );
            }

            vertexCount += polygon.length;
        });
    });

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });

    const mesh = new THREE.Mesh(geometry, material)

    return mesh
}

export default displayMultiPolygon
