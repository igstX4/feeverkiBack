import React, {useEffect, useState} from 'react'
import s from './Register.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchLogin, fetchRegister} from "../../../store/user/userSlice";
import {notification} from "antd";
import {set} from "react-hook-form";
export const Register = ({user}) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [error, setError] = useState()

    const handleSubmit = (e) => {
        if (password.trim() === "" || secondPassword.trim() === "" || email.trim() === "" || secret.trim() === "") {
            setError("Заполните все поля")
        } else {
            if (password !== secondPassword) {
                return setError("Пароли не совпадают")
            }
            dispatch(fetchRegister({email, password, secret}))
        }
    }

    useEffect(() => {
        setError(user.error)
        if (user.data) {
            navigate('/admin/changePassword')
            notification.success({
                message: 'Успех.',
                description: 'Вы успешно ввошли в аккаунт.',
                duration: 1.5
            });
        }
    }, [user]);
  return (
    <div className={s.register}>
        <div className={s.content}>
            <h1>Зарегистрируйтесь</h1>

            <div className={s.inputs}>
                <div className={s.inputDiv}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Почта'/>
                </div>
                <div className={s.inputDiv}>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Пароль'/>
                </div>
                <div className={s.inputDiv}>
                    <input value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} type='password' placeholder='Повторите пароль'/>
                </div>
                <div className={s.inputDiv}>
                    <input value={secret} onChange={(e) => setSecret(e.target.value)} type='password' placeholder='Секретный код'/>
                </div>
                <button onClick={handleSubmit} className={s.btn}>Создать аккаунт</button>
                <p>{error}</p>
                <p>Или <span onClick={() => navigate('/admin/login')}>Войдите</span> использую email и пароль</p>
            </div>
        </div>
    </div>
  )
}
