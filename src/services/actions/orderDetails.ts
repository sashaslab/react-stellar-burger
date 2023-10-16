import { AppDispatch, IOrder } from '../../utils/types';
import { getOrderServer, postOrders } from '../../utils/burger-api'
export const POST_ORDER: 'POST_ORDER' = 'POST_ORDER';
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const GET_ORDER: 'GET_ORDER' = 'GET_ORDER'

export interface IPostOrder {
    readonly type: typeof POST_ORDER;
    readonly payload: IOrder
}

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED
}

export interface IGetOrder {
    readonly type: typeof GET_ORDER
    readonly payload: IOrder
}

export type TOrderDetailsAction =
    | IPostOrder
    | IPostOrderRequest
    | IPostOrderFailed
    | IGetOrder


export const postOrder = (ingredients: string[]) => {
    return function (dispatch: AppDispatch) {
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

export const getOrder = (number: string) => {
    return function (dispatch: AppDispatch) {
        getOrderServer(number)
            .then((res) => {
                dispatch({
                    type: GET_ORDER,
                    payload: res.orders[0]
                })
            })
    }
}