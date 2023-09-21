export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const WS_CONNECTION_OPEN = 'WS_CONNECTION_OPEN';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';


export const connect = (url) => {
    return {
        type: CONNECT,
        payload: url
    }
}

export const disconnect = () => {
    return {
        type: DISCONNECT
    }
}