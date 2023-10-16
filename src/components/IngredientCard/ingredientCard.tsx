import React from 'react'
import style from "./ingridientCard.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { getBurgerConstructor } from '../../services/selectors';
import { FC } from 'react';
import { IIngredient } from '../../utils/types';

interface IIngredientCard {
    ingredient: IIngredient;
}

const IngredientCard: FC<IIngredientCard> = ({ ingredient }) => {
    const { ingredients, bun } = useAppSelector(getBurgerConstructor)
    let countBun = 0

    const count = React.useMemo(() => {
        const ingredientCount = ingredients.filter((item: IIngredient) => item._id === ingredient._id)
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
        <li ref={drag} className={style.item} style={{ opacity }}>
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

export default IngredientCard