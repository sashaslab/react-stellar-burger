import React from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burgerConstructor.module.css';
import Modal from "../Modal/modal";
import OrderDetails from "../OrderDetails/orderDetails";
import PropTypes from "prop-types";

function BurgerConstructor({ ingridients }) {
    const [open, setOpen] = React.useState(false);


    return (
        <section className={`${style.section} pt-25 mr-5`}>
            <div className='pl-4 pb-10'>
                <div className='ml-8 mr-4 pb-4'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${ingridients[0].name} (верх)`}
                        price={ingridients[0].price}
                        thumbnail={ingridients[0].image}
                    />
                </div>
                <ul className={`${style.list} custom-scroll`}>
                    {ingridients.map((item) => {
                        if (item.type !== 'bun') {
                            return (
                                <li key={item._id} className={`${style.item}`}><DragIcon />
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    /></li>
                            )
                        }
                    })}
                </ul>
                <div className='ml-8 mr-4 pt-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${ingridients[0].name} (низ)`}
                        price={ingridients[0].price}
                        thumbnail={ingridients[0].image}
                    />
                </div>
            </div>
            <div className={`${style.order} pr-4`}>
                <p className={`${style.total} text text_type_digits-medium`} >19010 <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpen(true)}>
                    Оформить заказ
                </Button>
            </div>
            {open && (<Modal closeModal={() => setOpen(false)}><OrderDetails /> </Modal>)}
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    }))
}

export default BurgerConstructor 