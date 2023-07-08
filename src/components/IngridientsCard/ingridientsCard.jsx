import style from "./ingridientsCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngridientCard({ ingridient, openModal }) {
    return (
        <li className={style.item} onClick={openModal}>
            <img className="mr-4 ml-4 mb-2" src={ingridient.image} alt={ingridient.name} />
            <p className={`${style.price} text_type_digits-default pb-2`}>{ingridient.price}  <CurrencyIcon type="primary" /></p>
            <h3 className="text text_type_main-default">{ingridient.name}</h3>
        </li>
    )
}

IngridientCard.propTypes = {
    ingridient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }),
    openModal: PropTypes.func
}

export default IngridientCard