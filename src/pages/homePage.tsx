import BurgerConstructor from "../components/BurgerConstructor/burgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/burgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './homePage.module.css';
import { FC } from "react";

const HomePage: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    )
}

export default HomePage;