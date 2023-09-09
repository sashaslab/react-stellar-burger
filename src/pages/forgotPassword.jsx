import React from "react";
import style from './form.module.css'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { forgotPassword } from "../utils/burger-api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState({
        email: ''
    })

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        forgotPassword(value.email)
            .then((res) => {
                if (res.success) {
                    navigate('/reset-password')
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
                <EmailInput
                    placeholder={'Укажите e-mail'}
                    onChange={onChange}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                />
                <div className={style.button}>
                    <Button htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <div className={style.controls}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link></p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword