import React from "react";
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import style from './form.module.css'
import { resetPassword } from "../utils/burger-api";

function ResetPassword() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState({
        password: '',
        token: ''
    })

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        resetPassword(value.password, value.token)
        .then((res) => {
            if(res.success) {
                navigate('/login')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={onSubmit}>
                <h2 className={`${style.title} text text_type_main-medium`}>Восстановление пароля</h2>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                />
                 <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={value.token}
                    name={'token'}
                />
                <div className={style.button}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                <div className={style.controls}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link></p>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;