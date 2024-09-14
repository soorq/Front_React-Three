import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { ModelLabel } from "../../features/model-label/model-label.ui";
import { createRoot } from "react-dom/client";
import { Group, Mesh, Vector3 } from "three";
import { v4 as uuid } from "uuid";

export class Model {
    readonly mesh: Group;
    readonly id: string;

    isMount: boolean = false;

    onSaveModel: () => void = () => null;

    constructor(mesh: Group) {
        this.mesh = mesh;
        this.id = uuid();
        this.attachMesh();
        this.createModelLabel();
    }

    saveModel() {
        this.isMount = true;
        this.onSaveModel();
    }

    setOpacity(opacity: number) {
        this.mesh.traverse((child) => {
            if (child instanceof Mesh) {
                child.material.transparent = true;
                child.material.opacity = opacity;
            }
        });
    }

    moveModelTo(vector: Vector3) {
        this.mesh.position.copy(vector);
    }

    private createModelLabel() {
        const labelContainer = document.createElement("div");
        const root = createRoot(labelContainer);
        root.render(
            <ModelLabel
                onSave={this.saveModel.bind(this)}
                isMount={this.isMount}
            />
        );
        const label = new CSS2DObject(labelContainer);
        this.mesh.add(label);
    }

    private attachMesh() {
        this.mesh.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = child.material.clone();
                child.userData = this
            }
        });
    }
}
