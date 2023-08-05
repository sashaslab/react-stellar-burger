import { postOrders } from '../../utils/burger-api'
export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'

export const postOrder = (ingredients) => {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        postOrders(ingredients)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: POST_ORDER,
                        payload: res.order
                    })
                } else {
                    dispatch({
                        type: POST_ORDER_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: POST_ORDER_FAILED
                })
            })
    }
}