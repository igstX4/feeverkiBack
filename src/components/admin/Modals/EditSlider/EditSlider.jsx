import React, { useEffect, useState } from 'react'
import style from './EditSlider.module.scss'
import axios from "../../../../axios/axios";
import {notification, Select} from "antd";
import UploadButton from "../../../UploadButton/UploadButton";

const EditSliderModal = ({editModal, setEditModal, item, update}) => {
    const [name, setName] = useState(item?.category)
    const [fileList, setFileList] = useState();
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axios.get('/getAllCategories')
                setCategories(data)
            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        setName(item?.category)
    }, [item])

    const handleSave = async () => {
        try {
            const formData = new FormData()
            formData.append("category", category)
            fileList?.forEach(item => formData.append("image", item.originFileObj))
            const {status} = await axios.put(`/editItemSlider`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (status === 200) {
                update()
                notification.success({
                    message: 'Успех.',
                    description: 'Вы изменили айтем слайдера.',
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
                <h2>Выберите изображение (ОБЯЗАТЕЛЬНО ОДНО ИЗОБРАЖЕНИЕ ТУТ)</h2>
                <UploadButton
                    setFileList={setFileList}
                />
                <div>
                    <h2>Выберите категорию:</h2>
                    {categories ? <Select
                        defaultValue="Выберите категорию"
                        style={{width: '37%', zIndex: "999999"}}
                        onChange={setCategory}
                        options={
                            categories.map((item) => {
                                return {
                                    value: item.category, label: item.category
                                }
                            })
                        }
                    /> : <p>Loading...</p>}
                </div>
                <button className={style.btn} onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default EditSliderModal