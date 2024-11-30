import style from './AddDiscountModal.module.scss'
import {useState} from "react";
import {notification} from "antd";
import instance from "../../../../axios/axios";

const AddDiscountModal = ({createModal, setCreateModal, update}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")

    const handleCreate = async () => {
        try {
            if (!title || !description || !image) {
                return setError("Заполните все поля!")
            }

            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('img', image)

            console.log('Отправляемые данные:', {
                title,
                description,
                image: image?.name
            })

            const {data} = await instance.post('/discount/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Ответ сервера:', data)

            if (data) {
                notification.success({
                    message: 'Успех.',
                    description: 'Скидка успешно создана.',
                    duration: 1.5
                });
                setCreateModal(false)
                setTitle("")
                setDescription("")
                setImage(null)
                setError("")
                update()
            }
        } catch (e) {
            console.log(e)
            setError(e.response?.data?.message || "Произошла ошибка")
        }
    }

    const handleClose = () => {
        setTitle("")
        setDescription("")
        setImage(null)
        setError("")
        setCreateModal(false)
    }

    return (
        <div className={`${style.modalBg} ${createModal ? style.active : ""}`} onClick={handleClose}>
            <div className={style.modalCont} onClick={(e) => e.stopPropagation()}>
                <h2>Создание скидки</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название скидки"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание скидки"
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />
                {error && <p className={style.error}>{error}</p>}
                <button onClick={handleCreate}>Создать</button>
            </div>
        </div>
    )
}

export default AddDiscountModal; 