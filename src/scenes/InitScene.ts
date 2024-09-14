import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Scene, WebGLRenderer, PerspectiveCamera, Color } from "three";
import { Grid } from "../shared/lib/helpers/grid.helper";
import { DirectLight } from "../shared/ui/direct_light";
import { HemiLight } from "../shared/ui/hemi_light";
import type { IActionScene } from "./IActionScene";
import { Ground } from "../shared/ui/ground";

export class InitScene implements IActionScene {
    readonly scene: Scene;
    readonly camera: PerspectiveCamera;
    readonly renderer: WebGLRenderer;
    readonly renderer2D: CSS2DRenderer;
    readonly control: OrbitControls;
    readonly ground: Ground;

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
        this.renderer2D.render(this.scene, this.camera);
    };

    private onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer2D.setSize(window.innerWidth, window.innerHeight);
    };

    constructor() {
        /**
         * Apply all variables
         * and assign to them
         */
        this.scene = new Scene();
        this.scene.background = new Color(0xffffff);
        this.camera = new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            400
        );
        this.renderer = new WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer2D = new CSS2DRenderer();
        this.control = new OrbitControls(
            this.camera,
            this.renderer2D.domElement
        );

        /**
         * Helpers
         */
        const grid = new Grid();
        this.scene.add(grid);

        /**
         * Elemets
         */
        this.ground = new Ground();
        this.scene.add(this.ground);

        /**
         * Lights
         */
        const direct = new DirectLight();
        this.scene.add(direct);

        const hemi = new HemiLight();
        this.scene.add(hemi);

        /**
         * Effects
         * event listeners
         */
        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize);

        /**
         * Rendered
         * DOM
         */
        this.renderer2D.domElement.style.position = "absolute";
        this.renderer2D.domElement.style.top = "0px";
        this.camera.position.set(0, 25, 125);
        document.body.appendChild(this.renderer.domElement);
        document.body.appendChild(this.renderer2D.domElement);
    }

    start() {
        this.animate();
    }
}
