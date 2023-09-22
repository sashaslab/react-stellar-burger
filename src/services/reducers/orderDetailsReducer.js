import {
    POST_ORDER,
    POST_ORDER_REQUEST,
    POST_ORDER_FAILED,
    GET_ORDER
} from '../actions/orderDetails'

const initialState = {
    details: {},
    request: false,
    failed: false,
    order: null
}

export const orderDetailsReducer = (state = initialState, action) => {
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