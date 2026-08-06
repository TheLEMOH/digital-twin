import { IControl, Map as MapLibreMap, MapMouseEvent } from "maplibre-gl";

interface RotateControlOptions {
    bearingSpeed?: number;
    pitchSpeed?: number;
}

export class RotateControl implements IControl {
    private _container: HTMLElement | null = null;
    private _map?: MapLibreMap;
    private _bearingSpeed: number;
    private _pitchSpeed: number;

    constructor(options?: RotateControlOptions) {
        this._bearingSpeed = options?.bearingSpeed || 0.5;
        this._pitchSpeed = options?.pitchSpeed || 0.3;
    }

    onAdd(map: MapLibreMap) {
        this._map = map;
        this._container = document.createElement("div");

        this._map.on("mousedown", this._onMouseDown);

        return this._container;
    }

    onRemove(map: MapLibreMap) {
        this._container?.parentNode?.removeChild(this._container);
        this._map = undefined;

        map.off("mousedown", this._onMouseDown);
    }

    private _onMouseDown = (evt: MapMouseEvent & Object) => {
        if (evt.originalEvent.button !== 2) return;

        evt.originalEvent.preventDefault();

        const onMouseMove = (evt: MouseEvent) => {
            if (!this._map) return;

            const newBearing =
                this._map.getBearing() + evt.movementX * this._bearingSpeed;
            const newPitch = this._map.getPitch() - evt.movementY * this._pitchSpeed;

            this._map.jumpTo({
                bearing: newBearing,
                pitch: Math.min(85, Math.max(0, newPitch)),
            });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };
}