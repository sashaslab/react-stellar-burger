import { Middleware } from "redux";
import { TWsAction } from "./actions/ws";
import { IWsActions } from "../utils/types";

type TMiddleware = (wsAction: IWsActions) => Middleware

export const socketMiddleware: TMiddleware = (wsActions) => {
  return store => {
    let socket: WebSocket | null = null;

    return next => (action: TWsAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { 
        wsConnect,
        wsDisconnect,
        wsOnOpen,
        wsOnError,
        wsOnClose,
        wsOnMessage,
        wsSendMessage } = wsActions

      if (type === wsConnect) {
        if (!socket) {
          socket = new WebSocket(payload);
        }
      }

      if (type === wsDisconnect) {
        socket?.close()
        socket = null
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsOnOpen, payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: wsOnError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: wsOnMessage, payload: JSON.parse(data) });
        };
        socket.onclose = event => {
          dispatch({ type: wsOnClose, payload: event });
        };
        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
}; 