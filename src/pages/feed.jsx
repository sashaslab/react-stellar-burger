import style from './feed.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../services/selectors';
import React from 'react';
import { connect, disconnect } from '../services/actions/ws';
import Order from '../components/Order/order';
import { Link, useLocation } from 'react-router-dom';


function Feed() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { orders } = useSelector(getOrders)
    const numberDone = []
    const numberPending = []

    React.useEffect(() => {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'))
        return () => {
            dispatch(disconnect())
        }
    }, [dispatch])

    if (orders) {

        const sortedOrderStatus = () => {
            orders.orders.map((item) => {
                if (item.status === 'done') {
                    numberDone.push(item.number)
                } else if (item.status === 'pending') {
                    numberPending.push(item.number)
                }
            })
        }

        sortedOrderStatus();

        return (
            <>
                <h2 className={`text text_type_main-large pt-10 pl-5 pr-5`}>Лента заказов</h2>
                <div className={`${style.container} pl-5 pr-5 pt-5 pb-5`}>
                    <div className={`${style.feed} custom-scroll`}>
                        <ul className={`${style.list} pr-2`}>
                            {orders.orders.map((item) => (
                                <Link to={`/feed/${item.number}`} key={item._id} className={style.link} state={{ background: location }}>
                                    <Order order={item} key={item._id} />
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className={style.status}>
                        <div className={style.number}>
                            <div className={style.done}>
                                <h3 className={`${style.title_done} text text_type_main-medium`}>Готовы:</h3>
                                <ul className={`${style.list_done} custom-scroll`}>
                                    {numberDone.map((item, index) => (
                                        <li className={`${style.number_done} text text_type_digits-default`} key={index}>{item}</li>
                                    ))}

                                </ul>
                            </div>
                            <div className={style.pending}>
                                <h3 className={`${style.title_pending} text text_type_main-medium`}>В работе:</h3>
                                <ul className={style.list_pending}>
                                    {numberPending.map((item, index) => (
                                        <li className='text text_type_digits-default' key={index}>{item}</li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <div className={style.total}>
                            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
                            <p className={`${style.digits_shadow} text text_type_digits-large`}>{orders.total}</p>
                        </div>
                        <div className={style.total_today}>
                            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
                            <p className={`${style.digits_shadow} text text_type_digits-large`}>{orders.totalToday}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }


}

export default Feed