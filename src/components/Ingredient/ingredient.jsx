import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import style from './ingredient.module.css'
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types"
import { deleteConstructorIngredient } from '../../services/actions/burgerConstructor';
import { useDispatch } from 'react-redux'

export default function Ingredient({ ingredient, moveIngredient }) {
    const dispatch = useDispatch();
    const ref = React.useRef(null)

    const [{ opacity }, drag] = useDrag({
        type: 'items',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [, drop] = useDrop({
        accept: 'items',
        hover: (item, monitor) => {
            if (item.key === ingredient.key) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (item.key < ingredient.key && hoverActualY < hoverMiddleY) {
                return
            }
            if (item.key > ingredient.key && hoverActualY > hoverMiddleY) {
                return
            }

            moveIngredient(item, ingredient)

        }
    })

    const dragDropRef = drag(drop(ref))

    function deleteIngredient() {
        dispatch(deleteConstructorIngredient(ingredient.key))
    }

    return (

        <li ref={dragDropRef} style={{ opacity }} key={ingredient.key} className={`${style.item}`}><DragIcon />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => deleteIngredient()}
            />
        </li>

    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    moveIngredient: PropTypes.func.isRequired
}