import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burgerIngridients.module.css';
import Modal from "../Modal/modal";
import IngridientCard from "../IngridientCard/ingridientCard";
import IngridientDetails from "../IngridientDetails/ingridientDetails";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types"

function BurgerIngridients({ ingridients }) {
    const bun = ingridients.filter(item => item.type === 'bun');
    const sauce = ingridients.filter(item => item.type === 'sauce');
    const main = ingridients.filter(item => item.type === 'main');

    const [current, setCurrent] = React.useState('one')
    const [open, setOpen] = React.useState(false);
    const [ingridient, setIngridient] = React.useState([]);

    const tabScroll = (tab) => {
        setCurrent(tab)
        const item = document.getElementById(tab);
        if (item) {
            item.scrollIntoView({ behavior: 'smooth' });
        }
    };



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
                        <ul className={`${style.list} pl-4`}>
                            {bun.map((item) => (
                                <IngridientCard key={item._id} ingridient={item} openModal={() => { setOpen(true); setIngridient(item) }} />

                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table} pb-10`}>
                        <h2 className="text text_type_main-medium pb-6" id="two">Соусы</h2>
                        <ul className={`${style.list} pl-4`}>
                            {sauce.map((item) => (
                                <IngridientCard key={item._id} ingridient={item} openModal={() => { setOpen(true); setIngridient(item) }} />
                            ))}
                        </ul>
                    </div>
                    <div className={`${style.table}`}>
                        <h2 className="text text_type_main-medium pb-6" id="three">Ничинки</h2>
                        <ul className={`${style.list} pl-4`}>
                            {main.map((item) => (
                                <IngridientCard key={item._id} ingridient={item} openModal={() => { setOpen(true); setIngridient(item) }} />
                            ))}
                        </ul>
                    </div>
                </div>
                {open && (<Modal closeModal={() => setOpen(false)}>
                    <IngridientDetails ingridient={ingridient} />
                </Modal>)
                }
            </section>
        </>
    )
}

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerIngridients