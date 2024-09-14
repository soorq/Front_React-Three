import { Event, Intersection, Mesh, Object3D, Vector2, Group } from "three";

type GetIntersectWithGround = (
    pointer: Vector2
) => Intersection<Object3D<Event>>;
type GetIntersectWithScene = (
    pointer: Vector2
) => Intersection<Object3D<Event>>[];
type GetPointerPosition = (e: PointerEvent | MouseEvent) => Vector2;
type AddToScene = (el: Object3D<Event> | Mesh | Group) => void;

export class SceneConnector {
    getPointerPosition: GetPointerPosition | null = null;
    getIntersectWithGround: GetIntersectWithGround | null = null;
    getIntersectWithScene: GetIntersectWithScene | null = null;
    addToScene: AddToScene | null = null;
}
