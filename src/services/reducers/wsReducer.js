import {
    WS_CONNECTION_OPEN,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_GET_MESSAGE
} from '../actions/ws'

const initialState = {
    wsConnected: false,
    orders: null,
    error: undefined
};


export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_OPEN:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSE:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                orders: action.payload
            };
        default:
            return state;
    }
}; 