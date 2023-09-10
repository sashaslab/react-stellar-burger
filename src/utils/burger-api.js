import { setUser, setAuthChecked } from "../services/actions/user";

const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res
  }
  return Promise.reject(`Ошибка, ответ сервера: ${res}`)
}

function request(endpoint, options) {
  return fetch(`${URL}${endpoint}`, options).then(checkResponse).then(checkSuccess)
}

export function getData() {
  return request('/ingredients')
}

export function postOrders(ingredients) {
  return request('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients
    })
  })
}

export function register(name, email, password) {
  return (dispatch) => {
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

export const login = (email, password) => {
  return (dispatch) => {
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
  return (dispatch) => {
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
        dispatch(setAuthChecked(false));
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

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
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
  return (dispatch) => {
    return fetchWithRefresh(`${URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken")
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
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
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

export const forgotPassword = (email) => {
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

export const resetPassword = (password, token) => {
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

export const updateProfile = (name, email, password) => {
  return (dispatch) => {
    return request('/auth/user', {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
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