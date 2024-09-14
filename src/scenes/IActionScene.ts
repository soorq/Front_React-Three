import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Ground } from "../shared/ui/ground";

export interface IActionScene {
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly renderer: WebGLRenderer;
    readonly ground: Ground;
}
