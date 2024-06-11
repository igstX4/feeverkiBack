import instance from '../../../../axios/axios'
import style from './DeleteModerator.module.scss'
import {notification} from "antd";
export const DeleteModerator = ({isOpen, setOpen, item, update}) => {
    console.log(item)
    const handleDelete = async () => {
        try {
            const {status} = await instance.post('/delete', {email: item.email})
            console.log(item.email)
            if (status === 200) {
                update()
                notification.success({
                    message: 'Успех.',
                    description: `Вы удалили ${item.email}.`,
                    duration: 1.5
                });
                setOpen()
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className={`${style.modalBg} ${isOpen ? style.active : ""}`}
                 onClick={setOpen}>
                <div className={style.modalCont} onClick={(e) => e.stopPropagation()}>
                   <h2>Вы уверены что хотите удалить модератора: {item.email}</h2>
                   <div className={setOpen.btns}>
                    <button className={style.close} onClick={() => setOpen()}>Отмена</button>
                    <button onClick={handleDelete}>Удалить</button>
                   </div>
                </div>
            </div>
        </div>
    )
}