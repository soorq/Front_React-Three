import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelConfig } from "../constants/ModelConfig";

export class LoadeModels {
    readonly modelMap = new Map<string, GLTF>();
    private loader: GLTFLoader = new GLTFLoader();

    async start() {
        for (const model of ModelConfig) {
            const gltf = await this.loadModel(model.path);
            this.modelMap.set(model.title, gltf);
        }
    }

    private async loadModel(path: string): Promise<GLTF> {
        return new Promise((res, rej) => {
            this.loader.load(path, res, () => null, rej);
        });
    }
}
