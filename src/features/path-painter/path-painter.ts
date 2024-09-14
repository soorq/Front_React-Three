import { SceneConnector } from "../../entities/scene-connector/scene-connector";
import { Pathline } from "../../shared/ui/pathline";
import { Model } from "../../shared/ui/model";
import { Vector2 } from "three";

export class PathPainter {
    private pathLineFrom: Pathline | null = null;

    constructor(private connector: SceneConnector) {
        window.addEventListener("dblclick", this.handlerWindowDbClick);
    }

    private handleMouseMove = (e: PointerEvent) => {
        const pointer = this.connector.getPointerPosition?.(e);
        if (pointer) this.aimPathLine(pointer);
    };

    private handlerWindowDbClick = (e: MouseEvent) => {
        const pointer = this.connector.getPointerPosition?.(e);
        if (!pointer) return;
        const pickedElement =
            this.connector.getIntersectWithScene?.(pointer)?.[0];
        const model = pickedElement?.object.userData;
        const isModel = model instanceof Model;
        if (!isModel) return;
        const isPathStarted = this.pathLineFrom !== null;
        console.log(!isPathStarted);
        if (!isPathStarted) {
            this.startMountPathFrom(model);
            window.addEventListener("pointermove", this.handleMouseMove);
            return;
        }

        window.removeEventListener("pointermove", this.handleMouseMove);
    };

    private startMountPathFrom(model: Model) {
        this.pathLineFrom = new Pathline();
        this.pathLineFrom.userData.fromPoint = [
            model.mesh.position.x,
            0,
            model.mesh.position.z,
        ];
        this.pathLineFrom.setFromTo(
            [model.mesh.position.x, 0, model.mesh.position.z],
            [model.mesh.position.x, 0, model.mesh.position.z]
        );
        this.connector.addToScene?.(this.pathLineFrom);
    }

    private aimPathLine(pointer: Vector2) {
        if (!this.pathLineFrom) throw new Error("Нужно навести на модельку");
        const intersect = this.connector.getIntersectWithGround?.(pointer);
        if (!intersect) return;

        const fromPoint = this.pathLineFrom.userData.fromPoint as [
            number,
            number,
            number
        ];

        this.pathLineFrom.setFromTo(fromPoint, [
            intersect.point.x,
            0,
            intersect.point.z,
        ]);
    }
}
