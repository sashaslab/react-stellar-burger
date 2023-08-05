import React from 'react'
import style from "./ingridientCard.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function IngredientCard({ ingredient, openModal }) {
    const { ingredients, bun } = useSelector(state => state.burgerConstructor)
    let countBun = 0

    const count = React.useMemo(() => {
        const ingredientCount = ingredients.filter((item) => item._id === ingredient._id)
        return ingredientCount.length
    }, [ingredients])


    if (bun && ingredient._id === bun._id) {
        countBun = 2
    }

    const [{ opacity }, drag] = useDrag({
        type: "item",
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    });

    return (
        <li onClick={openModal} ref={drag} className={style.item} style={{ opacity }}>
            <img className="mr-4 ml-4 mb-2" src={ingredient.image} alt={ingredient.name} />
            <p className={`${style.price} text_type_digits-default pb-2`}>{ingredient.price}  <CurrencyIcon type="primary" /></p>
            <h3 className="text text_type_main-default" >{ingredient.name}</h3>
            {ingredient.type !== 'bun'
                ?
                count > 0 && <Counter count={count} size="default" extraClass="m-1" />
                :
                countBun > 0 && <Counter count={countBun} size="default" extraClass="m-1" />
            }
        </li>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientPropType.isRequired,
    openModal: PropTypes.func.isRequired
}

export default IngredientCard