import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { getBurgerIngredients } from '../../services/selectors';
import style from './order.module.css'
import { useLocation } from 'react-router-dom';

function Order({ order }) {
    const { ingredients } = useSelector(getBurgerIngredients)
    const location = useLocation()
    const profilePage = location.pathname === '/profile/orders'

    function findImage(id) {
        return ingredients.find((item) => {
            return item._id === id
        })
    }

    function totalPrice(items) {
        let price = 0
        items.map((id) => {
            ingredients.map((item) => {
                if (item._id === id) {
                    price += item.price
                }
            })
        })
        return price
    }

    const orderStatus = (status) => {
        if (status === 'created') {
            return <p className='text text_type_main-small pt-2'>Создан</p>
        } else if (status === 'pending') {
            return <p className='text text_type_main-small pt-2'>Готовится</p>
        } else if (status === 'done') {
            return <p className={`${style.status} text text_type_main-small pt-2`}>Выполнен</p>
        }
    }

    return (
        <li className={style.item} key={order._id}>
            <div className={style.head}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /> i-GMT+3</p>
            </div>
            <div>
                <h3 className='text text_type_main-medium'>{order.name}</h3>
                {profilePage ? orderStatus(order.status) : null
                }
            </div>
            <div className={style.composition}>
                <ul className={style.list_image}>
                    {order.ingredients.map((id, index) => {
                        if (index < 6 && id !== null) return (
                            <li className={style.item_image} key={index}><img src={findImage(id)?.image_mobile} alt={findImage(id)?.name} />
                            </li>
                        )
                    })}
                    {order.ingredients.length > 6 ? (
                        <div className={style.count}>
                            <p className={`${style.digits} text text_type_main-small`}>+{order.ingredients.length - 6}</p>
                        </div>

                    ) : null}
                </ul>
                <div className={style.price}>
                    <p className='text text_type_digits-default'>{totalPrice(order.ingredients)} </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    )
}

export default Order