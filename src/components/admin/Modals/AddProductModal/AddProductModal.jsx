import React, {useEffect, useState} from 'react';
import style from './AddProductModal.module.scss'
import {Button, Form, Input, notification} from "antd";
import {Select} from 'antd';
import UploadButton from "../../../UploadButton/UploadButton";
import axios from "../../../../axios/axios";

const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({name, ...props}) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};


const AddProductModal = ({createModal, setCreateModal, update}) => {
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

    const onFinish = async (value) => {
        const {name, price, priceKiosk, video, options1, options2, options3, options4, category, totalCount} = value
        const formData = new FormData();
        const optionsArr = [
            {
                name: "Залпов",
                value: options1
            },
            {
                name: "Калибр",
                value: options2
            },
            {
                name: "Время",
                value: options3
            },
            {
                name: "Эффекты",
                value: options4
            },
        ]
        formData.append("name", name)
        formData.append("price", price)
        formData.append("totalCount", totalCount)
        formData.append("priceKiosk", priceKiosk)
        formData.append("video", video)
        formData.append("options", JSON.stringify(optionsArr))
        formData.append("category", category)
        fileList?.forEach(item => formData.append("image", item.originFileObj))

        try {
            const {data} = await axios.post(`/createProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data._id) {
                update()
                setCreateModal(false)
                notification.success({
                    message: 'Успех.',
                    description: 'Вы добавили продукт.',
                    duration: 1.5
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={createModal ? `${style.modal} ${style.active}` : style.modal}
             onClick={() => setCreateModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                    className={style.form}
                >
                    <div className={style.formwrapp}>
                        <div>
                            <MyFormItem name="image" label="Изображение">
                                <UploadButton
                                    setFileList={setFileList}
                                />
                            </MyFormItem>
                            <MyFormItem name="name" label="Название">
                                <Input/>
                            </MyFormItem>
                            <MyFormItem name="category" label="Категория">
                                {categories ? <Select
                                    defaultValue="Выберите категорию"
                                    style={{width: '95%', zIndex: "999999"}}
                                    onChange={setCategory}
                                    options={
                                        categories.map((item) => {
                                            return {
                                                value: item.category, label: item.category
                                            }
                                        })
                                    }
                                /> : <p>Loading...</p>}
                            </MyFormItem>
                            <MyFormItem name="totalCount" label="Всего в наличии">
                                <Input placeholder={"Например: 99"}/>
                            </MyFormItem>
                            <MyFormItem name="priceKiosk" label="Цена в киосках">
                                <Input/>
                            </MyFormItem>
                            <MyFormItem name="price" label="Цена">
                                <Input/>
                            </MyFormItem>
                            <MyFormItem name="video" label="Видео на ваш товар (youtube)">
                                <Input/>
                            </MyFormItem>
                        </div>
                        <div className={style.rightCont}>
                            <MyFormItem name="options1" label="Залпов">
                                <Input placeholder={"55"}/>
                            </MyFormItem>
                            <MyFormItem name="options2" label="Калибр">
                                <Input placeholder={"1 д"}/>
                            </MyFormItem>
                            <MyFormItem name="options3" label="Время">
                                <Input placeholder={"60 сек"}/>
                            </MyFormItem>
                            <MyFormItem name="options4" label="Эффекты">
                                <Input placeholder={"11 сек"}/>
                            </MyFormItem>
                        </div>
                    </div>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProductModal;
