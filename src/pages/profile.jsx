import React from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../services/selectors';
import { logout, updateProfile } from '../utils/burger-api';

function Profile() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(getUserState)
    const [value, setValue] = React.useState({
        name: user.name,
        email: user.email,
        password: ''
    })
    const profileLink = location.pathname === '/profile'

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(value.name, value.email, value.password))
        setValue({
            ...value,
            password: ''
        })
    }

    const linkActive = ({ isActive }) => isActive ? `${style.link} ${style.link_active} text text_type_main-medium` : `${style.link}  text text_type_main-medium text_color_inactive`

    const exit = () => {
        dispatch(logout())
    }

    const cancel = (e) => {
        e.preventDefault()
        setValue({
            name: user.name,
            email: user.email,
            password: ''
        })
    }

    const changeInput = user.name !== value.name || user.email !== value.email || value.password



    return (
        <div className={`${style.container}`}>
            <div className={style.row}>
                <ul className={style.list}>
                    {profileLink ? <li className={style.item}><NavLink to="/profile" className={linkActive}>Профиль</NavLink></li>
                        : <li className={style.item}><NavLink to="/profile" className={linkActive(false)}>Профиль</NavLink></li>
                    }
                    <li className={style.item}><NavLink to="/profile/orders" className={linkActive}>История заказов</NavLink></li>
                    <li className={style.item}>
                        <button className={`${style.button} text text_type_main-medium text_color_inactive`} onClick={exit}>Выход</button>
                    </li>
                    <p className='text text_type_main-default text_color_inactive pt-20'>В этом разделе вы можете просмотреть свою историю заказов</p>
                </ul>
                <Outlet />
                {profileLink && <form className={style.form} onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        value={value.name}
                        name={'name'}
                    />
                    <EmailInput
                        onChange={onChange}
                        value={value.email}
                        name={'email'}
                        isIcon={true}
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={value.password}
                        name={'password'}
                        icon="EditIcon"
                    />
                    {changeInput &&
                        <div className={style.action}>
                            <Button htmlType="button" type="secondary" size="medium" onClick={cancel}>
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>
                    }
                </form>
                }
            </div>
        </div>
    )
}

export default Profile;