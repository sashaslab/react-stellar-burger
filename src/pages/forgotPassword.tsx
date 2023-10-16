import style from './form.module.css'
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { forgotPassword } from "../utils/burger-api";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { FC } from 'react';

const ForgotPassword: FC = () => {
    const navigate = useNavigate();
    const { values, handleChange } = useForm({ email: '' })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        forgotPassword(values.email)
            .then((res) => {
                localStorage.setItem("forgotPassword", res.success)
                navigate('/reset-password')
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
                    onChange={handleChange}
                    value={values.email}
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