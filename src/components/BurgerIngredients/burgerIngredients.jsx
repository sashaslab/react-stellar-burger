import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burgerIngredients.module.css';
import Modal from "../Modal/modal";
import IngredientCard from "../IngredientCard/ingredientCard";
import IngredientDetails from "../IngredientDetails/ingredientDetails";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions/burgerIngredients";
import { detailsOpen, detailsClose } from "../../services/actions/ingredientDetails";
import { useInView } from "react-intersection-observer";
import { getBurgerIngredients } from "../../services/selectors";

function BurgerIngredients() {
    const { ingredients } = useSelector(getBurgerIngredients);
    const bun = ingredients.filter(item => item.type === 'bun');
    const sauce = ingredients.filter(item => item.type === 'sauce');
    const main = ingredients.filter(item => item.type === 'main');
    const [current, setCurrent] = React.useState('buns')
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [bunRef, bunInView] = useInView({ threshold: 0.1 })
    const [sauceRef, sauceInView] = useInView({ threshold: 0.1 })
    const [mainRef, mainInView] = useInView({ threshold: 0.1 })

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]
    );

    function openModal(item) {
        dispatch(detailsOpen(item))
    }

    function closeModal() {
        dispatch(detailsClose())
    }

    const tabScroll = (tab) => {
        setCurrent(tab)
        const item = document.getElementById(tab);
        if (item) {
            item.scrollIntoView({ behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        if (bunInView) {
            setCurrent('bun')
        } else if (sauceInView) {
            setCurrent('sauce')
        } else if (mainInView) {
            setCurrent('main')
        }
    }, [bunInView, sauceInView, mainInView])

    return (
        <>
            <section className={`${style.section} pt-10 ml-5`}>
                <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
                <div className={`${style.tab} pb-10`}>
                    <Tab value="bun" active={current === 'bun'} onClick={tabScroll}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={tabScroll}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={tabScroll}>
                        Начинки
                    </Tab>
                </div>
                <div className={`${style.products} custom-scroll`}>
                    <div className={`${style.container} pb-10`}>
                        <h2 className="text text_type_main-medium" id="bun">Булки</h2>
                        <ul ref={bunRef} className={`${style.list} pl-4`}>
                            {bun.map((item) => (
                                <IngredientCard key={item._id} ingredient={item} openModal={() => {
                                    setOpen(true)
                                    openModal(item)
                                }} />

                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table} pb-10`}>
                        <h2 className="text text_type_main-medium pb-6" id="sauce">Соусы</h2>
                        <ul ref={sauceRef} className={`${style.list} pl-4`}>
                            {sauce.map((item) => (
                                <IngredientCard key={item._id} ingredient={item} openModal={() => {
                                    setOpen(true)
                                    openModal(item)
                                }} />
                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table}`}>
                        <h2 className="text text_type_main-medium pb-6" id="main">Ничинки</h2>
                        <ul ref={mainRef} className={`${style.list} pl-4`}>
                            {main.map((item) => (
                                <IngredientCard key={item._id} ingredient={item} openModal={() => {
                                    setOpen(true)
                                    openModal(item)
                                }} />
                            ))}
                        </ul>
                    </div>
                </div>
                {open && <Modal closeModal={() => {
                    setOpen(false);
                    closeModal();
                }}>
                    <IngredientDetails />
                </Modal>
                }
            </section>
        </>
    )
}

export default BurgerIngredients