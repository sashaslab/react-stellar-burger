import React from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burgerConstructor.module.css';
import Modal from "../Modal/modal";
import OrderDetails from "../OrderDetails/orderDetails";
import { addConstructorIngredient, addConstructorBun, moveConstructorIngredient, resetConstructor } from "../../services/actions/burgerConstructor";
import { postOrder } from '../../services/actions/orderDetails'
import { useDrop } from 'react-dnd';
import Ingredient from '../Ingredient/ingredient'
import { getBurgerConstructor, getUserState } from '../../services/selectors';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/types';

const BurgerConstructor: FC = () => {
    const { ingredients, bun } = useAppSelector(getBurgerConstructor);
    const [open, setOpen] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const ingredientId = ingredients.map((item: IIngredient) => item._id)
    const { user } = useAppSelector(getUserState)
    const navigate = useNavigate();

    const addIngredient = (item: IIngredient) => {
        const ingredient = { ...item }
        ingredient.key = Date.now()
        if (item.type === 'bun') {
            return dispatch(addConstructorBun(ingredient))
        } else if (bun) {
            dispatch(addConstructorIngredient(ingredient));
        }
    }

    const [, drop] = useDrop({
        accept: "item",
        drop(item: IIngredient) {
            addIngredient(item)
        }
    });

    const totalPrice = React.useMemo(
        () => {
            const itemPrice = ingredients.reduce((acc: number, item: IIngredient) => {
                return acc + item.price
            }, 0)

            let bunPrice = 0

            if (bun) {
                bunPrice = bun.price * 2
            }
            if (bunPrice > 0) {
                return bunPrice + itemPrice
            } else {
                return 0
            }
        }, [ingredients, bun]
    )

    const moveIngredient = (dragIndex: IIngredient, hoverIndex: IIngredient): void => {
        const dragIngredient = ingredients.findIndex((item: IIngredient) => item.key === dragIndex.key)
        const hoverIngredient = ingredients.findIndex((item: IIngredient) => item.key === hoverIndex.key)
        const sorted = [...ingredients]
        sorted.splice(dragIngredient, 1)
        sorted.splice(hoverIngredient, 0, dragIndex)
        dispatch(moveConstructorIngredient(sorted))
    }

    function sendOrder() {
        if (user && bun) {
            const allId = [...ingredientId, bun._id]
            dispatch(postOrder(allId));
            dispatch(resetConstructor())
        } else {
            navigate('/login')
        }
    }

    return (
        <section className={`${style.section} pt-25 mr-5`}>
            <div className='pl-4 pb-10'>
                <div className='ml-8 mr-4 pb-4'>
                    {bun && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <ul ref={drop} className={`${style.list} custom-scroll`}>
                    {!bun && <h2 className={`${style.title} text text_type_main-default`}>Выберите булку</h2> || ingredients.length === 0 && <h2 className={`${style.title} text text_type_main-default`}>Выберите соус и начинку</h2>}
                    {ingredients.map((item: IIngredient) => {
                        if (item.type !== 'bun') {
                            return (
                                <Ingredient key={item.key} ingredient={item} moveIngredient={moveIngredient} />
                            )
                        }
                    })}
                </ul>
                <div className='ml-8 mr-4 pt-4'>
                    {bun && <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
            </div>
            <div className={`${style.order} pr-4`}>
                <p className={`${style.total} text text_type_digits-medium`} >{totalPrice}<CurrencyIcon type="primary" />
                </p>
                {ingredients.length !== 0
                    ?
                    (<Button htmlType="button" type="primary" size="large" onClick={() => {
                        setOpen(true)
                        sendOrder()
                    }
                    }>Оформить заказ</Button>)
                    :
                    (<Button htmlType="button" type="primary" size="large" disabled={true}>Оформить заказ</Button>)
                }
            </div>
            {open && <Modal closeModal={() => setOpen(false)}><OrderDetails /></Modal>}
        </section>
    )
}

export default BurgerConstructor 