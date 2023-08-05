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

function BurgerIngredients() {
    const { ingredients } = useSelector(state => state.burgerIngredients);
    const bun = ingredients.filter(item => item.type === 'bun');
    const sauce = ingredients.filter(item => item.type === 'sauce');
    const main = ingredients.filter(item => item.type === 'main');
    const [current, setCurrent] = React.useState('one')
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [oneRef, oneInView] = useInView({ threshold: 0.1 })
    const [twoRef, twoInView] = useInView({ threshold: 0.1 })
    const [threeRef, threeInView] = useInView({ threshold: 0.1 })

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
        if (oneInView) {
            setCurrent('one')
        } else if (twoInView) {
            setCurrent('two')
        } else if (threeInView) {
            setCurrent('three')
        }
    }, [oneInView, twoInView, threeInView])

    return (
        <>
            <section className={`${style.section} pt-10 ml-5`}>
                <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
                <div className={`${style.tab} pb-10`}>
                    <Tab value="one" active={current === 'one'} onClick={tabScroll}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={tabScroll}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={tabScroll}>
                        Начинки
                    </Tab>
                </div>
                <div className={`${style.products} custom-scroll`}>
                    <div className={`${style.container} pb-10`}>
                        <h2 className="text text_type_main-medium" id="one">Булки</h2>
                        <ul ref={oneRef} className={`${style.list} pl-4`}>
                            {bun.map((item) => (
                                <IngredientCard key={item._id} ingredient={item} openModal={() => {
                                    setOpen(true)
                                    openModal(item)
                                }} />

                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table} pb-10`}>
                        <h2 className="text text_type_main-medium pb-6" id="two">Соусы</h2>
                        <ul ref={twoRef} className={`${style.list} pl-4`}>
                            {sauce.map((item) => (
                                <IngredientCard key={item._id} ingredient={item} openModal={() => {
                                    setOpen(true)
                                    openModal(item)
                                }} />
                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table}`}>
                        <h2 className="text text_type_main-medium pb-6" id="three">Ничинки</h2>
                        <ul ref={threeRef} className={`${style.list} pl-4`}>
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