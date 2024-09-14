import { SceneConnector } from "../../entities/scene-connector/scene-connector";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Model } from "../../shared/ui/model";

export class ModelPainter {
    readonly modelMap: Map<string, GLTF>;
    private draftModel: Model | null = null;
    private sceneConnector: SceneConnector;

    constructor(
        private connector: SceneConnector,
        private models: Map<string, GLTF>
    ) {
        this.modelMap = this.models;
        this.sceneConnector = this.connector;
        window.addEventListener("dblclick", this.handlerWindowDbClick);
    }

    mountDraftModelOnScene(title: string) {
        const modelGLTF = this.modelMap.get(title);
        if (!modelGLTF) return;
        const modelMesh = modelGLTF.scene.clone(true);
        const model = new Model(modelMesh);

        model.onSaveModel = this.handlerSaveModel;

        model.setOpacity(0.5);
        this.draftModel = model;
        this.sceneConnector.addToScene?.(model.mesh);
    }

    private handlerSaveModel = () => {
        if (!this.draftModel) return;
        this.draftModel.setOpacity(1);
        this.draftModel = null;
    };

    private handlerWindowDbClick = (e: MouseEvent) => {
        const pointer = this.sceneConnector.getPointerPosition?.(e);
        if (!pointer) return;
        const intersect = this.sceneConnector.getIntersectWithGround?.(pointer);
        if (!intersect) return;
        this.draftModel?.moveModelTo(intersect.point);
    };
}
