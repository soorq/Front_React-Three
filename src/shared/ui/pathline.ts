import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { Color } from 'three';

export class Pathline extends Line2 {
    constructor(color?: number) {
        const geomerty = new LineGeometry();
        geomerty.setPositions([1, 1, 1, 5, 5, 5]);
        geomerty.setColors([1, 1, 1, 1, 1, 1]);

        const matLine = new LineMaterial({
            color: color || 0x645c5a,
            linewidth: 0.005,
            vertexColors: true,
        });

        super(geomerty, matLine);
    }

    setFromTo(from: [number, number, number], to: [number, number, number]) {
        this.geometry.setPositions([...from, ...to]);
    }

    setColor(color: number) {
        this.material.color = new Color(color);
    }
}
