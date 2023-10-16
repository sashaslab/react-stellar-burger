import { setUser, setAuthChecked } from "../services/actions/user";
import { AppDispatch } from "./types";

const URL = 'https://norma.nomoreparties.space/api';

export interface IFetchWithRefresh {
  method: string;
  headers: {
    "Content-Type": string;
    authorization: string;
  }
}


const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res
  }
  return Promise.reject(`Ошибка, ответ сервера: ${res}`)
}

function request(endpoint: string, options?: RequestInit) {
  return fetch(`${URL}${endpoint}`, options).then(checkResponse).then(checkSuccess)
}

export function getData() {
  return request('/ingredients')
}

export function postOrders(ingredients:string[]) {
  return request('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || ''
    },
    body: JSON.stringify({
      ingredients
    })
  })
}

export function getOrderServer(id:string) {
  return request(`/orders/${id}`)
}

export function register(name: string, email: string, password: string) {
  return (dispatch: AppDispatch) => {
    return request('/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    return request('/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        console.log(err)
      })
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    return request('/auth/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      })
    })
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err)
      })
  };
};

const refreshToken = () => {
  return request('/auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  })
};

const fetchWithRefresh = async (url: string, options: RequestInit & {headers: {authorization: string, }}) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (dispatch: AppDispatch) => {

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return Promise.reject("Access token not found");
    }


    return fetchWithRefresh(`${URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken
      }
    }).then((res) => {
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        return Promise.reject("Ошибка данных с сервера");
      }
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};

export const forgotPassword = (email:string) => {
  return request('/password-reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email
    })
  })
};

export const resetPassword = (password:string, token:string) => {
  return request('/password-reset/reset', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token
    })
  })
};

export const updateProfile = (name:string, email: string, password:string) => {
  return (dispatch: AppDispatch) => {

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return Promise.reject("Access token not found");
    }

    return request('/auth/user', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then((res) => {
        dispatch(setUser(res.user));
        refreshToken()
          .then((res) => {
            if (res.success) {
              localStorage.setItem("refreshToken", res.refreshToken);
              localStorage.setItem("accessToken", res.accessToken);
            }
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
};