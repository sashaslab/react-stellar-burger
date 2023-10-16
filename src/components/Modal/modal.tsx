import React, { FC, ReactNode } from "react";
import style from "./modal.module.css";
import ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/modalOverlay";

interface IModal {
    children: ReactNode;
    closeModal: () => void;
}

const modalRoot = document.getElementById("modal");

const Modal: FC<IModal> = ({ children, closeModal }) => {

    React.useEffect(() => {
        const closeEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        document.addEventListener("keydown", closeEscape);
        return () => {
            document.removeEventListener("keydown", closeEscape);
        };
    }, [closeModal]);

    if (!modalRoot) {
        return null
    }

    return ReactDOM.createPortal(

        <>

            <div className={style.modal}>
                <ModalOverlay closeModal={closeModal} />
                <div className={style.container}>
                    <button className={style.button} onClick={closeModal}>
                        <CloseIcon type="primary" />
                    </button>
                    {children}
                </div>
            </div>

        </>

        ,
        modalRoot
    );
}


export default Modal