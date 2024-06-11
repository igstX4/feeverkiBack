import React, {useState, useEffect} from 'react'
import s from './Login.module.scss'
import {useDispatch} from 'react-redux'
import {fetchLogin} from '../../../store/user/userSlice'
import {useNavigate} from "react-router-dom";
import {notification} from "antd";

export const Login = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = (e) => {
        if (email.trim().length > 0 && password.trim().length > 0) {
            dispatch(fetchLogin({email: email, password: password}))
        } else {
            setError('Заполните все поля')
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
        <div className={s.Login}>
            <div className={s.content}>
                <h1>Войдите в аккаунт</h1>

                <div className={s.inputs}>
                    <div className={s.inputDiv}>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Почта'/>
                    </div>
                    <div className={s.inputDiv}>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль'/>
                    </div>
                    <button onClick={handleSubmit} className={s.btn}>Войти</button>
                    <p>{error}</p>
                    <p>Или <span onClick={() => navigate('/admin/register')}>зарегистрируйтесь</span> по секретному коду</p>
                </div>

            </div>
        </div>
    )
}
