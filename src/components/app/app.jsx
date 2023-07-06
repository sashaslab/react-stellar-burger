import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../AppHeader/appHeader.jsx'
import BurgerIngridients from "../BurgerIngridients/burgerIngredients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={`${styles.section} pt-10 ml-5`}>
          <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
          <BurgerIngridients />
        </section>
        <section className={`${styles.section} pt-25 mr-5`}>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;