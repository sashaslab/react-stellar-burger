import React from 'react';
import { Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import constructorStyle from './burgerConstructor.module.css'

function BurgerConstructor() {
    return (
        <>
            <div className='pl-4 pb-10'>
                <div className='ml-8 mr-4 pb-4'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${data[0].name} (верх)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                />
                </div>
                <ul className={`${constructorStyle.list} custom-scroll`}>
                    {data.map((item) => {
                        if (item.type !== 'bun') {
                            return (
                                <li key={item._id} className={`${constructorStyle.item}`}><DragIcon />
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
                    text={`${data[0].name} (низ)`}
                    price={data[0].price}
                    thumbnail={data[0].image}
                />
                </div>
            </div>
            <div className={`${constructorStyle.order} pr-4`}>
                <p className={`${constructorStyle.total} text text_type_digits-medium`} >{data.reduce((s, i) => s = s + i.price, 267)} <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </>
    )
}

export default BurgerConstructor 