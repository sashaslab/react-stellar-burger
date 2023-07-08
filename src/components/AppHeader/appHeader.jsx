import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './appHeader.module.css';

function AppHeader() {
    return (
        <header className={style.header}>
            <div className={style.header_desktop}>
                <div className={style.logo}>
                    <Logo />
                </div>
                <nav className='pl-5 pr-5 pt-4 pb-4'>
                    <ul className={`${style.list} pt-4 pb-4`}>
                        <li className={style.item}><a href="#constructor" className={style.link}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2">Конструктор</p></a></li>
                        <li className={`${style.item}`}><a href="#orders" className={style.link}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p></a></li>
                        <li className={style.item}><a href="#account" className={style.link}>
                            <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p></a></li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}

export default AppHeader