import styles from "./app.module.css";
import AppHeader from '../AppHeader/appHeader.jsx'
import BurgerIngredients from "../BurgerIngredients/burgerIngredients";
import BurgerConstructor from "../BurgerConstructor/burgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;