import style from "./modalOverlay.module.css"
import { FC } from "react";

interface IModalOverlay {
    closeModal: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModal }) => {
    return (
        <div className={style.overlay} onClick={closeModal}></div>
    )
}


export default ModalOverlay