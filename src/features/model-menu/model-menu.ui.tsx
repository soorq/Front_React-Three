import type { FC } from "react";
import './model-menu.css'

export const ModelMenu: FC<{
    scene: { mountDraftModelOnScene: (title: string) => void };
}> = ({ scene }) => {
    const handlerClicked = (title: string) => {
        scene.mountDraftModelOnScene(title);
    };

    return (
        <div className="menu">
            <button onClick={() => handlerClicked("Louis")}>Louis</button>
            <button onClick={() => handlerClicked("Lyran")}>Luran</button>
        </div>
    );
};
