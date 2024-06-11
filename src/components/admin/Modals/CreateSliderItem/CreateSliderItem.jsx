import React, {useEffect, useState} from 'react'
import style from '../AddProductModal/AddProductModal.module.scss'
import {Button, Form, notification, Select} from "antd";
import axios from "../../../../axios/axios";
import UploadButton from "../../../UploadButton/UploadButton";

const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({name, ...props}) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const CreateCategoryModal = ({update, createModal, setCreateModal}) => {
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
        const {category} = value
        try {
            const formData = new FormData()
            formData.append("category", category)
            fileList?.forEach(item => formData.append("image", item.originFileObj))
            await axios.post(`/addItemSlider`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setCreateModal(false)
            update()
        } catch (e) {
            console.log(e)
        }
    };
    console.log(categories)
    return (
        <div className={`${style.modal} ${createModal ? style.active : ""}`}
             onClick={() => setCreateModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                    className={style.form}
                >
                    <MyFormItem name="image" label="Выберите изображение">
                        <UploadButton
                            setFileList={setFileList}
                        />
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
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateCategoryModal