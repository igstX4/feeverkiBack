import { useEffect, useState } from 'react'
import style from './EditCategoryModal.module.scss'
import axios from "../../../../axios/axios";
import {notification} from "antd";

const EditCategoryModal = ({editModal, setEditModal, item, update}) => {
    const [name, setName] = useState(item?.category)

    useEffect(() => {
        setName(item?.category)
    }, [item])

    const handleSave = async () => {
        try {
            const {status} = await axios.put(`/editCategory/${item._id}`, {category: name})
            if (status === 200) {
                update()
                notification.success({
                    message: 'Успех.',
                    description: 'Вы изменили название категории.',
                    duration: 1.5
                });
                setEditModal(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onClick={() => setEditModal(false)} className={`${style.modalBg} ${editModal ? style.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={style.modalCont}>
                <h2>Введите новое название:</h2>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default EditCategoryModal