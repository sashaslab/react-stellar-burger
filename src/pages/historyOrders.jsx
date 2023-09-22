import style from './feed.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../services/selectors';
import React from 'react';
import { connect, disconnect } from '../services/actions/ws';
import Order from '../components/Order/order';
import { Link, useLocation } from 'react-router-dom';


function HistoryOrders() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { orders } = useSelector(getOrders)

    React.useEffect(() => {
        dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`))
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