import style from "./CreateModerator.module.scss"
import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import instance from "../../../../axios/axios";


export const CreateModerator = ({isOpen, setOpen, update}) => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleCreate = async () => {
        if (email !== "" && password !== "") {
            try {
                const {data} = await instance.post('/addModerator', {email, password})
                if (data.email) {
                    notification.success({
                        message: 'Успех.',
                        description: 'Теперь отправте данные пользователю.',
                        duration: 3
                    });
                    update()
                }
            } catch (e) {
                console.log(e)
                setError(e.response?.data.message)
            }
        } else {
            setError("Заполните все поля!")
        }

    }
    const handleClose = () => {
        setEmail("")
        setPassword("")
        setError("")
        setOpen()
    }
    return (
        <div>
            <div className={`${style.modalBg} ${isOpen ? style.active : ""}`}
                 onClick={handleClose}>
                <div className={style.modalCont} onClick={(e) => e.stopPropagation()}>
                    <h3>Введите email и пароль нового модератора, затем отпрате данные пользователю</h3>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'email'}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'пароль'}/>
                    <p>{error}</p>
                    <button onClick={handleCreate}>Создать</button>
                </div>
            </div>
        </div>
    )
}