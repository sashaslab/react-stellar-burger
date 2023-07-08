import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyle from './appHeader.module.css';

function AppHeader() {
    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.header_desktop}>
            <div className={headerStyle.logo}>
            <Logo />
            </div>
            <nav className='pl-5 pr-5 pt-4 pb-4'>
                <ul className={`${headerStyle.list} pt-4 pb-4`}>
                   <li className={headerStyle.item}><a href="#constructor" className={headerStyle.link}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default pl-2">Конструктор</p></a></li>
                   <li className={`${headerStyle.item}`}><a href="#orders" className={headerStyle.link}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p></a></li>
                   <li className={headerStyle.item}><a href="#account" className={headerStyle.link}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p></a></li> 
                </ul>
            </nav>
            </div>
        </header>
        
    )
}

export default AppHeader