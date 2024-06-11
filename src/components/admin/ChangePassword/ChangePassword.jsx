import s from './ChangePassword.module.scss'
import {useState} from "react";
import instance from "../../../axios/axios";
import {notification} from "antd";
import {set} from "react-hook-form";

export const ChangePassword = ({user}) => {
    const [oldOwnPassword, setOldOwnPassword] = useState('')
    const [newOwnPassword, setNewOwnPassword] = useState('')
    const [oldSecretPassword, setOldSecretPassword] = useState('')
    const [newSecretPassword, setNewSecretPassword] = useState('')
    const [error, setError] = useState('')
    const handleChange = async () => {
       try {
           if (oldOwnPassword.trim() !== "" && newOwnPassword.trim() !== "") {
               const {data} = await instance.post('/changePassword', {oldPassword: oldOwnPassword, newPassword: newOwnPassword})

               if (data.success) {
                   notification.success({
                       message: 'Успех.',
                       description: 'Вы успешно изменили пароль(ЖОПА).',
                       duration: 1.5
                   });
                   setOldOwnPassword("")
                   setNewOwnPassword("")
               }
           }
           if (oldSecretPassword.trim() !== "" && newSecretPassword.trim() !== "") {
               const {data} = await instance.post('/changeSecret', {oldSecret: oldSecretPassword, newSecret: newSecretPassword})

               if (data.success) {
                   notification.success({
                       message: 'Успех.',
                       description: 'Вы успешно изменили пароль(ЖОПА).',
                       duration: 1.5
                   });
                   setOldSecretPassword("")
                   setNewSecretPassword("")
               }
           }
       } catch (e) {
           setError(e.response.data.message)
       }
    }
    return (
        <div className={s.ChangePassword}>
            <div className={s.ownPassword}>
                <h1>Смена своего пароля</h1>

                <div className={s.inputBlog}>
                    <h2>Старый пароль</h2>
                    <input value={oldOwnPassword} onChange={(e) => setOldOwnPassword(e.target.value)}/>
                </div>

                <div className={s.inputBlog}>
                    <h2>Новый пароль</h2>
                    <input value={newOwnPassword} onChange={(e) => setNewOwnPassword(e.target.value)}/>
                </div>
            </div>

            {user.role !== 'admin' ? <div className={s.ownPassword}>
                <h1>Смена секретного пароля</h1>

                <div className={s.inputBlog}>
                    <h2>Старый пароль</h2>
                    <input value={oldSecretPassword} onChange={(e) => setOldSecretPassword(e.target.value)}/>
                </div>

                <div className={s.inputBlog}>
                    <h2>Новый пароль</h2>
                    <input value={newSecretPassword} onChange={(e) => setNewSecretPassword(e.target.value)}/>
                </div>
            </div> : null}
            <p style={{marginTop: '20px'}}>{error}</p>
            <button onClick={handleChange} className={s.btn}>Изменить</button>
        </div>
    )
}