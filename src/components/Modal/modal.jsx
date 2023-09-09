import React from "react";
import style from "./modal.module.css";
import ReactDOM from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/modalOverlay";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


const modalRoot = document.getElementById("modal");

function Modal({ children }) {
    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    }

    React.useEffect(() => {
        const closeEscape = (e) => {
            if (e.key === "Escape") {
                closeModal()
            }
        }
        document.addEventListener("keydown", closeEscape);
        return () => {
            document.removeEventListener("keydown", closeEscape);
        };
    }, [closeModal]);

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

Modal.propTypes = {
    children: PropTypes.element,
    closeModal: PropTypes.func
}

export default Modal