import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import instance, {url} from "../../../axios/axios";
import style from './EditDiscount.module.scss'
import {notification} from "antd";

const EditDiscount = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [currentImage, setCurrentImage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const {data} = await instance.get(`/discount/${id}`)
                setTitle(data.title)
                setDescription(data.description)
                setCurrentImage(data.img)
            } catch (e) {
                console.error(e)
                setError("Не удалось загрузить данные скидки")
            }
        }
        fetchDiscount()
    }, [id])

    const handleUpdate = async () => {
        try {
            if (!title || !description) {
                return setError("Заполните все обязательные поля!")
            }

            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            if (image) {
                formData.append('img', image)
            }

            const {data} = await instance.put(`/discount/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data) {
                notification.success({
                    message: 'Успех',
                    description: 'Скидка успешно обновлена',
                    duration: 1.5
                })
                navigate('/admin/discounts')
            }
        } catch (e) {
            console.error(e)
            setError(e.response?.data?.message || "Произошла ошибка при обновлении")
        }
    }

    const handleDelete = async () => {
        try {
            if (window.confirm('Вы уверены, что хотите удалить эту скидку?')) {
                await instance.delete(`/discount/${id}`)
                notification.success({
                    message: 'Успех',
                    description: 'Скидка успешно удалена',
                    duration: 1.5
                })
                navigate('/admin/discounts')
            }
        } catch (e) {
            console.error(e)
            setError("Не удалось удалить скидку")
        }
    }

    return (
        <div className={style.editContainer}>
            <h1>Редактирование скидки</h1>
            <div className={style.form}>
                <div className={style.inputGroup}>
                    <label>Название:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Название скидки"
                    />
                </div>

                <div className={style.inputGroup}>
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание скидки"
                    />
                </div>

                <div className={style.inputGroup}>
                    <label>Изображение:</label>
                    {currentImage && (
                        <div className={style.currentImage}>
                            <img src={`${url}/uploads/${currentImage}`} alt="Текущее изображение"/>
                            <p>Текущее изображение</p>
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                {error && <p className={style.error}>{error}</p>}

                <div className={style.buttons}>
                    <button className={style.saveButton} onClick={handleUpdate}>
                        Сохранить изменения
                    </button>
                    <button className={style.deleteButton} onClick={handleDelete}>
                        Удалить скидку
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditDiscount 