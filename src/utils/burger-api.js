import { func } from "prop-types";

const URL = 'https://norma.nomoreparties.space/api';

const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
}
export async function getData() {
  const res = await fetch(`${URL}/ingredients`);
  return onResponse(res);
}

export async function postOrders(ingredients) {
  const res = await fetch(`${URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients
    })
  });
  return onResponse(res);
}
