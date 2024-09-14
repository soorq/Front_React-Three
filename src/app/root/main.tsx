import { ModelMenu } from "../../features/model-menu/model-menu.ui";
import { MainFlowScene } from "../../scenes/MainFlowScene";
import { LoadeModels } from "../../shared/lib/LoadeModel";
import { InitScene } from "../../scenes/InitScene";
import { createRoot } from "react-dom/client";
import "../styles/index.css";

const scene = new InitScene();
const modelScene = new LoadeModels();

scene.start();
modelScene.start();

window.scene = scene

const mainFlowScene = new MainFlowScene(scene, modelScene.modelMap);
mainFlowScene.start();

createRoot(document.getElementById("root")!).render(
    <>
        <ModelMenu
            scene={mainFlowScene}
        />
    </>
);
