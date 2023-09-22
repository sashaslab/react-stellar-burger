import style from "./modalOverlay.module.css"
import PropTypes from "prop-types";

function ModalOverlay({ closeModal }) {
    return (
        <div className={style.overlay} onClick={closeModal}></div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
}

export default ModalOverlay