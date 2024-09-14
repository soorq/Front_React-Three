import { GridHelper } from "three";

export class Grid extends GridHelper {
    constructor() {
        super(100, 20, 0x000000, 0x000000);

        const material = this.material;

        const isMaterialArr = material instanceof Array;

        if (!isMaterialArr) {
            material.opacity = 0.2;
            material.transparent = true;
        }
    }
}
