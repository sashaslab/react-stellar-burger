import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import style from './form.module.css'
import { resetPassword } from "../utils/burger-api";
import { useForm } from "../hooks/useForm";

function ResetPassword() {
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ password: '', token: '' })

    const onSubmit = (e) => {
        e.preventDefault();
        resetPassword(values.password, values.token)
            .then(() => {
                localStorage.removeItem('forgotPassword')
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (localStorage.getItem('forgotPassword')) {
        return (
            <div className={style.container}>
                <form className={style.form} onSubmit={onSubmit}>
                    <h2 className={`${style.title} text text_type_main-medium`}>Восстановление пароля</h2>
                    <PasswordInput
                        placeholder={'Введите новый пароль'}
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.token}
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
    } else {
        return <Navigate to='/forgot-password' />
    }
}

export default ResetPassword;