import React from "react";
import style from './form.module.css'
import { EmailInput, PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../utils/burger-api";
import { useDispatch } from "react-redux";

function Register() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState({
        name: '',
        email: '',
        password: ''
    })
    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(value.name, value.email, value.password))
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={onSubmit}>
                <h2 className={`${style.title} text text_type_main-medium`}>Регистрация</h2>
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
                    isIcon={false}
                />
                <PasswordInput
                    onChange={onChange}
                    value={value.password}
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