import style from "./ingredientDetails.module.css";
import { useAppSelector } from '../../utils/types';
import { getBurgerIngredients } from "../../services/selectors";
import { useParams } from "react-router-dom";
import { IIngredient } from "../../utils/types";


function IngredientDetails() {
    const { ingredients } = useAppSelector(getBurgerIngredients)
    const { id } = useParams();
    const ingredient = ingredients.find((item: IIngredient) => item._id === id)
    if (!ingredient) return null

    return (
        <div className={`${style.content} pt-10 pb-15 pl-10 pr-10`}>
            <p className={`${style.title} text text_type_main-large`}>Детали ингредиента</p>
            <img src={ingredient.image_large} />
            <p className={"text text_type_main-medium pt-4"}>{ingredient.name}</p>
            <ul className={`${style.list}`}>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Каллории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </li>
                <li className={`${style.item}`}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails