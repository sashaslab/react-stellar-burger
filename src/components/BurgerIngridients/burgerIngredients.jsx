import React from "react";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from "../../utils/data.js";
import ingridientsStyle from './burgerIngridients.module.css';


function BurgerIngridients() {
    const [current, setCurrent] = React.useState('one')
    const ref = React.useRef(null);

    const handleClickScroll = (current) => {
        setCurrent(current)
        const element = document.getElementById(current);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    
    

    return (
        <>
            <div className={`${ingridientsStyle.tab} pb-10`}>
                <Tab value="one" active={current === 'one'} onClick={handleClickScroll}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={handleClickScroll}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={handleClickScroll}>
                    Начинки
                </Tab>
            </div>
            <div className={`${ingridientsStyle.products} custom-scroll`}>
                <div className={`${ingridientsStyle.container} pb-10`}>
                    <h2 ref={ref} className="text text_type_main-medium" id="one">Булки</h2>
                    <ul className={`${ingridientsStyle.list} pl-4`}>
                        {data.map((item) => {
                            if (item.type === 'bun') {
                                return (
                                    <li key={item._id} className={ingridientsStyle.item}>
                                        <img className="mr-4 ml-4 mb-2" src={item.image} />
                                        <p className={`${ingridientsStyle.price} text_type_digits-default pb-2`}>{item.price}  <CurrencyIcon type="primary" /></p>
                                        <h3 className="text text_type_main-default">{item.name}</h3>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className={`${ingridientsStyle.table} pb-10`}>
                    <h2 ref={ref} className="text text_type_main-medium pb-6" id="two">Соусы</h2>
                    <ul className={`${ingridientsStyle.list} pl-4`}>
                        {data.map((item) => {
                            if (item.type === 'sauce') {
                                return (
                                    <li key={item._id} className={ingridientsStyle.item}>
                                        <img className="mr-4 ml-4 mb-2" src={item.image} />
                                        <p className={`${ingridientsStyle.price} text_type_digits-default pb-2`}>{item.price}  <CurrencyIcon type="primary" /></p>
                                        <h3 className="text text_type_main-default">{item.name}</h3>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className={`${ingridientsStyle.table}`}>
                    <h2 ref={ref} className="text text_type_main-medium pb-6" id="three">Ничинки</h2>
                    <ul className={`${ingridientsStyle.list} pl-4`}>
                        {data.map((item) => {
                            if (item.type === 'main') {
                                return (
                                    <li key={item._id} className={ingridientsStyle.item}>
                                        <img className="mr-4 ml-4 mb-2" src={item.image} />
                                        <p className={`${ingridientsStyle.price} text_type_digits-default pb-2`}>{item.price}  <CurrencyIcon type="primary" /></p>
                                        <h3 className="text text_type_main-default">{item.name}</h3>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BurgerIngridients