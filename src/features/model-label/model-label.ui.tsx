import { FC, useState } from "react";
import "./model-label.css";

type TypeProps = {
    onSave: () => void;
    isMount: boolean
};

export const ModelLabel: FC<TypeProps> = ({ isMount: defaultMounted, onSave }) => {
    const [isMount, setIsMount] = useState(defaultMounted)

    const handlerSave = () => {
        setIsMount(true)
        onSave()
    };

    /**
     * FIXTURE:
     * HINT:
     * CSSRenderer2D не умеет клики обрабатывать
     */
    return (
        <div className="">
            <p>Hello</p>
            <button disabled={isMount} onPointerDown={handlerSave}>Сохранить</button>
        </div>
    );
};
