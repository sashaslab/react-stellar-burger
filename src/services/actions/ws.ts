import { IOrders } from "../../utils/types";

export const CONNECT: 'CONNECT' = 'CONNECT';
export const DISCONNECT: 'DISCONNECT' = 'DISCONNECT';
export const WS_CONNECTION_OPEN: 'WS_CONNECTION_OPEN' = 'WS_CONNECTION_OPEN';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IConnect {
    readonly type: typeof CONNECT;
    readonly payload: string
}

export interface IDisconnect {
    readonly type: typeof DISCONNECT;
    readonly payload: any;
}

export interface IWsConnectionOpen {
    readonly type: typeof WS_CONNECTION_OPEN;
    readonly payload: any;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any
}

export interface IWsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
    readonly payload: any;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IOrders
}

export interface IWsSendMEssage {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: any;
}

export type TWsAction = 
    | IConnect
    | IDisconnect
    | IWsConnectionOpen
    | IWsConnectionError
    | IWsConnectionClose
    | IWsGetMessage
    | IWsSendMEssage

export const wsActions = {
    wsConnect: CONNECT,
    wsDisconnect: DISCONNECT,
    wsOnOpen: WS_CONNECTION_OPEN,
    wsOnError: WS_CONNECTION_ERROR,
    wsOnClose: WS_CONNECTION_CLOSE,
    wsOnMessage: WS_GET_MESSAGE,
    wsSendMessage: WS_SEND_MESSAGE
}


export const connect = (url: string): IConnect => {
    return {
        type: CONNECT,
        payload: url
    }
}

export const disconnect = (): IDisconnect => {
    return {
        type: DISCONNECT,
        payload: null
    }
}