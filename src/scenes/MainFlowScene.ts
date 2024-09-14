import { SceneConnector } from "../entities/scene-connector/scene-connector";
import { Event, Group, Mesh, Object3D, Raycaster, Vector2 } from "three";
import { ModelPainter } from "../features/model-painter/model-painter";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { PathPainter } from "../features/path-painter";
import { IActionScene } from "./IActionScene";

export class MainFlowScene {
    // OTHER VARIABLES
    private raycaster: Raycaster = new Raycaster();
    readonly modelMap: Map<string, GLTF>;
    readonly actionScene: IActionScene;

    // PAINTERS
    modelPointer: ModelPainter | null = null;
    pathPointer: PathPainter | null = null;

    // CONNECTOR
    private sceneConnector = new SceneConnector();

    constructor(actionScene: IActionScene, modelsMap: Map<string, GLTF>) {
        this.actionScene = actionScene;
        this.modelMap = modelsMap;

        this.sceneConnector.getPointerPosition =
            this.getPointerPosition.bind(this);

        /**
         * Not will be work on @types/three^0.163.2
         * idk, need to write as issue
         */
        this.sceneConnector.getIntersectWithGround =
            this.getIntersectWidthGround.bind(this);

        this.sceneConnector.addToScene = this.addToScene.bind(this);

        this.sceneConnector.getIntersectWithScene =
            this.getIntersectWithScene.bind(this);
    }

    async start() {
        this.modelPointer = new ModelPainter(
            this.sceneConnector,
            this.modelMap
        );
        this.pathPointer = new PathPainter(this.sceneConnector);
    }

    mountDraftModelOnScene(title: string) {
        this.modelPointer?.mountDraftModelOnScene(title);
    }

    private addToScene(el: Object3D<Event> | Group | Mesh) {
        this.actionScene.scene.add(el);
    }

    private getPointerPosition(event: PointerEvent | MouseEvent) {
        const pointer = new Vector2();

        pointer.x =
            (event.clientX / this.actionScene.renderer.domElement.clientWidth) *
                2 -
            1;
        pointer.y =
            -(
                event.clientY /
                this.actionScene.renderer.domElement.clientHeight
            ) *
                2 +
            1;

        return pointer;
    }
    private getIntersectWidthGround(pointer: Vector2) {
        this.raycaster.setFromCamera(pointer, this.actionScene.camera);
        return this.raycaster.intersectObject(this.actionScene.ground)[0];
    }

    private getIntersectWithScene(pointer: Vector2) {
        this.raycaster.setFromCamera(pointer, this.actionScene.camera);
        return this.raycaster.intersectObjects(
            this.actionScene.scene.children,
            true
        );
    }
}
