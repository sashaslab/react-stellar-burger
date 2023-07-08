import style from "./ingridientDetails.module.css";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types"


function IngridientDetails({ ingridient }) {
    return (
        <div className={`${style.content} pt-10 pb-15 pl-10 pr-10`}>
            <p className={`${style.title} text text_type_main-large`}>Детали ингридиента</p>
            <img src={ingridient.image_large} />
            <p className={"text text_type_main-medium pt-4"}>{ingridient.name}</p>
            <ul className={`${style.list} `}>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Каллории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient.calories}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient.proteins}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient.fat}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingridient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngridientDetails.propTypes = {
    ingridient: ingredientPropType.isRequired
}

export default IngridientDetails