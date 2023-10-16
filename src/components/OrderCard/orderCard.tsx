import { useAppDispatch, useAppSelector } from '../../utils/types';
import { getBurgerIngredients, getOrderDetails } from "../../services/selectors"
import { useLocation, useParams } from "react-router-dom"
import React, { FC } from "react"
import { getOrder } from "../../services/actions/orderDetails"
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './orderCard.module.css'
import { IIngredient } from "../../utils/types"

const OrderCard: FC = () => {
    const dispatch = useAppDispatch()
    const { number } = useParams()
    const location = useLocation()
    const { ingredients } = useAppSelector(getBurgerIngredients)
    const { order } = useAppSelector(getOrderDetails)
    const background = location.state && location.state.background


    React.useEffect(() => {
        if (number) {
            dispatch(getOrder(number))
        }
    }, [dispatch, number])

    function findImage(id: string) {
        return ingredients.find((item: IIngredient) => {
            return item._id === id
        })
    }

    function totalPrice(items: string[]) {
        let price = 0
        items.map((id) => {
            ingredients.map((item: IIngredient) => {
                if (item._id === id) {
                    price += item.price
                }
            })
        })
        return price
    }

    function count(id: string) {
        const amount = order?.ingredients.filter((item: string) => {
            return item === id
        })
        return amount?.length
    }

    const orderStatus = (status: string) => {
        if (status === 'created') {
            return <p className='text text_type_main-small'>Создан</p>
        } else if (status === 'pending') {
            return <p className='text text_type_main-small'>Готовится</p>
        } else if (status === 'done') {
            return <p className={`${style.status} text text_type_main-small`}>Выполнен</p>
        }
    }

    if (order) {
        const dateOrder = order.createdAt
        const uniqueImages = order.ingredients.reduce((acc: string[], item: string) => {
            if (acc.includes(item)) {
                return acc
            }
            return [...acc, item]
        }, [])


        return (
            <div className={background ? `${style.container}` : `${style.container_page}`}>
                <p className={background ? `${style.number} text text_type_digits-default` : `${style.number_page} text text_type_digits-default`}>#{order.number}</p>
                <h2 className={`${style.name} pb-2 text text_type_main-medium`}>{order.name}</h2>
                {orderStatus(order.status)}
                <div className={style.composition}>
                    <p className='text text_type_main-medium pb-6'>Состав:</p>
                    <ul className={`${style.list} custom-scroll`}>
                        {uniqueImages.map((id: string, index: number) => (
                            <li className={style.item} key={index}>
                                <div className={style.image}>
                                    <img src={findImage(id)?.image_mobile} alt={findImage(id)?.name} />
                                </div>
                                <p className={`${style.item_name} text text_type_main-default`}>{findImage(id)?.name}</p>
                                <div className={style.price}>
                                    <p className='text text_type_digits-default'>{count(id)} x {findImage(id)?.price}</p> <CurrencyIcon type="primary" />
                                </div>

                            </li>
                        ))}

                    </ul>
                </div>
                <div className={style.footer}>
                    <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(dateOrder)} /> i-GMT+3</p >
                    <div className={style.total_price}>
                        <p className='text text_type_digits-default'>{totalPrice(order.ingredients)}</p> <CurrencyIcon type="primary" />
                    </div>

                </div>
            </div>
        )
    } else {
        return null
    }


}

export default OrderCard