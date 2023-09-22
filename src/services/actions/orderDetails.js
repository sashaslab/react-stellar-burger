import { getOrderServer, postOrders } from '../../utils/burger-api'
export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'
export const GET_ORDER = 'GET_ORDER'

export const postOrder = (ingredients) => {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        postOrders(ingredients)
            .then((res) => {
                dispatch({
                    type: POST_ORDER,
                    payload: res.order
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_ORDER_FAILED
                })
            })
    }
}

export const getOrder = (number) => {
    return function (dispatch) {
        getOrderServer(number)
            .then((res) => {
                dispatch({
                    type: GET_ORDER,
                    payload: res.orders[0]
                })
            })
    }
}