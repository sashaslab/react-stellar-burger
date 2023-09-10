import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../services/selectors';
import { logout, updateProfile } from '../utils/burger-api';
import { useForm } from '../hooks/useForm';

function Profile() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(getUserState)
    const { values, handleChange, setValues } = useForm({ name: user.name, email: user.email, password: '' })
    const profileLink = location.pathname === '/profile'

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(values.name, values.email, values.password))
        setValues({
            ...values,
            password: ''
        })
    }

    const linkActive = ({ isActive }) => isActive ? `${style.link} ${style.link_active} text text_type_main-medium` : `${style.link}  text text_type_main-medium text_color_inactive`

    const exit = () => {
        dispatch(logout())
    }

    const cancel = (e) => {
        e.preventDefault()
        setValues({
            name: user.name,
            email: user.email,
            password: ''
        })
    }

    const changeInput = user.name !== values.name || user.email !== values.email || values.password



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
                        onChange={handleChange}
                        value={values.name}
                        name={'name'}
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        isIcon={true}
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
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