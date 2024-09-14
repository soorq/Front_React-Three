import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

export class Ground extends Mesh {
    constructor() {
        const groundPlane = new PlaneGeometry(100, 100);
        const gMaterial = new MeshPhongMaterial({
            color: 0xbbbbbb,
            depthWrite: false,
        });

        super(groundPlane, gMaterial);

        this.rotation.x = -Math.PI / 2;
    }
}
