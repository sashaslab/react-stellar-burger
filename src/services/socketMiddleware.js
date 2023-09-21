import { CONNECT, DISCONNECT, WS_CONNECTION_OPEN, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSE, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../services/actions/ws'

export const socketMiddleware = () => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === CONNECT) {
        if (!socket) {
          socket = new WebSocket(payload);
        }
      }

      if (type === DISCONNECT) {
        socket.close()
        socket = null
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_OPEN, payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: WS_GET_MESSAGE, payload: JSON.parse(data) });
        };
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSE, payload: event });
        };
        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
}; 