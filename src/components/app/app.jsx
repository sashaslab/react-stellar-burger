import styles from "./app.module.css";
import AppHeader from '../AppHeader/appHeader.jsx'
import BurgerIngridients from "../BurgerIngridients/burgerIngredients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import React from 'react'

function App() {

  const [state, setState] = React.useState([]);
  const URL = `https://norma.nomoreparties.space/api/ingredients`;

  React.useEffect(() => {
    getIngridients()
  }, [])

  const onResponse = (res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`);
  }
  const getData = () => {
    return fetch(URL)
      .then(onResponse)
      .catch((err) => {
        console.log(err)
      })
  }

  function getIngridients() {
    getData()
      .then((res) => {
        setState(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {state.length && (<BurgerIngridients ingridients={state} />)}
        {state.length && (<BurgerConstructor ingridients={state} />)}
      </main>
    </div>
  );
}

export default App;