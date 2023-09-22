import style from './form.module.css'
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../utils/burger-api";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";

function Register() {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({ name: '', email: '', password: '' })

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(values.name, values.email, values.password))
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={onSubmit}>
                <h2 className={`${style.title} text text_type_main-medium`}>Регистрация</h2>
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
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                />
                <div className={style.button}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
                <div className={style.controls}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login' className={style.link}>Войти</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;