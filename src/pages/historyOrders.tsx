import style from './feed.module.css'
import { getOrders } from '../services/selectors';
import React from 'react';
import { connect, disconnect } from '../services/actions/ws';
import Order from '../components/Order/order';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/types';


function HistoryOrders() {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { orders } = useAppSelector(getOrders)


    React.useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${accessToken}.replace('Bearer ', '')}`))
        }
        return () => {
            dispatch(disconnect())
        }
    }, [dispatch])

    if (orders) {
        const reverseOrders = [...orders.orders].reverse();
        return (
            <div className={`${style.feed} ${style.feed_profile} mt-9 custom-scroll`}>
                <ul className={`${style.list} pr-2`}>
                    {reverseOrders.map((item) => (
                        <Link to={`/profile/orders/${item.number}`} className={style.link} key={item._id} state={{ background: location }}>
                            <Order order={item} key={item._id} />
                        </Link>
                    ))}
                </ul>
            </div>
        )
    } else {
        return null
    }
}

export default HistoryOrders