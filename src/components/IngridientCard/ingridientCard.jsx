import style from "./ingridientCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types"

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
    ingridient: ingredientPropType.isRequired,
    openModal: PropTypes.func
}

export default IngridientCard