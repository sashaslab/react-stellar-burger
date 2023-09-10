import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './form.module.css'
import { Link } from "react-router-dom"
import { login } from "../utils/burger-api"
import { useDispatch } from "react-redux"
import { useForm } from "../hooks/useForm"

function Login() {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({ email: '', password: '' })
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(values.email, values.password))
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={onSubmit}>
                <h2 className={`${style.title} text text_type_main-medium`}>Вход</h2>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                />
                <div className={style.button}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                </div>
                <div className={style.controls}>
                    <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь? <Link to='/register' className={style.link}>Зарегистрироваться</Link></p>
                    <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password' className={style.link}> Восстановить пароль</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login;