import {
    POST_ORDER,
    POST_ORDER_REQUEST,
    POST_ORDER_FAILED,
    GET_ORDER,
    TOrderDetailsAction
} from '../actions/orderDetails'

import { IOrder } from '../../utils/types'

export type TOrderDetailsState = {
    details: IOrder | null,
    request: boolean,
    failed: boolean,
    order: IOrder | null
}

const initialState: TOrderDetailsState = {
    details: null,
    request: false,
    failed: false,
    order: null
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsAction): TOrderDetailsState => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                request: true
            }
        }
        case POST_ORDER: {
            return {
                ...state,
                request: false,
                details: action.payload
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                failed: true,
            }
        }
        case GET_ORDER: {
            return {
                ...state,
                order: action.payload
            }
        }
        default: {
            return state
        }
    }
}