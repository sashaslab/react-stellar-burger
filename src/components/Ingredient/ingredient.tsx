import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import style from './ingredient.module.css'
import { deleteConstructorIngredient } from '../../services/actions/burgerConstructor';
import { useAppDispatch } from '../../utils/types';
import { IIngredient } from '../../utils/types';
import { FC } from 'react';

interface IIngredientProps {
    ingredient: IIngredient;
    moveIngredient: (dragIndex: IIngredient, hoverIndex: IIngredient) => void;
}

const Ingredient: FC<IIngredientProps> = ({ ingredient, moveIngredient }) => {
    const dispatch = useAppDispatch();
    const ref = React.useRef<HTMLLIElement>(null)

    const [{ opacity }, drag] = useDrag({
        type: 'items',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1
        })
    });

    const [, drop] = useDrop({
        accept: 'items',
        hover: (item: IIngredient, monitor) => {
            if (item.key === ingredient.key) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0
            const clientOffset = monitor.getClientOffset()
            const hoverActualY = clientOffset && hoverBoundingRect ? clientOffset.y - hoverBoundingRect.top : 0

            if (item.key && ingredient.key) {
                if (item.key < ingredient.key && hoverActualY < hoverMiddleY) {
                    return
                }
                if (item.key > ingredient.key && hoverActualY > hoverMiddleY) {
                    return
                }
            }

            moveIngredient(item, ingredient)

        }
    })

    drag(drop(ref))


    function deleteIngredient(item: any) {
        dispatch(deleteConstructorIngredient(item))
    }

    return (

        <li ref={ref} style={{ opacity }} key={ingredient.key} className={`${style.item}`}><DragIcon type='primary' />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => deleteIngredient(ingredient.key)}
            />
        </li>

    )
}



export default Ingredient