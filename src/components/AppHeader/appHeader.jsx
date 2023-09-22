import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './appHeader.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

function AppHeader() {
    const linkActive = ({ isActive }) => isActive ? `${style.link} ${style.link_active} text text_type_main-default` : `${style.link}  text text_type_main-default text_color_inactive`
    const location = useLocation();
    const iconActive = (link) => {
        if (location.pathname === link) {
            return 'primary'
        } else {
            return 'secondary'
        }
    }

    return (
        <header className={style.header}>
            <div className={style.header_desktop}>
                <div className={style.logo}>
                    <Link to="/"><Logo /></Link>
                </div>
                <nav className='pl-5 pr-5 pt-4 pb-4'>
                    <ul className={`${style.list} pt-4 pb-4`}>
                        <li className={style.item}>
                            <NavLink to="/" className={linkActive}>
                                <BurgerIcon type={iconActive('/')} />
                                Конструктор
                            </NavLink>
                        </li>
                        <li className={`${style.item}`}>
                            <NavLink to="/feed" className={linkActive}>
                                <ListIcon type={iconActive('/feed')} />
                                Лента заказов
                            </NavLink>
                        </li>
                        <li className={style.item}>
                            <NavLink to="/profile" className={linkActive}>
                                <ProfileIcon type={iconActive('/profile')} />
                                Личный кабинет
                            </NavLink>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}

export default AppHeader