import React, {useEffect, useState} from 'react';
import style from './EditProductModal.module.scss'
import {Button, Form, Input, notification} from 'antd';
import {Select} from 'antd'
import UploadButton from "../../../UploadButton/UploadButton";
import axios from "../../../../axios/axios";


function toArr(str) {
    return Array.isArray(str) ? str : [str];
}


const MyFormItemContext = React.createContext([]);

const MyFormItem = ({name, ...props}) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const EditProductModal = ({product, modal, setModal}) => {
    const [values, setValues] = useState({
        name: '',
        category: '',
        video: '',
        price: '',
        priceKiosk: '',
        totalCount: '',
        options1: '',
        options2: '',
        options3: '',
        options4: '',
        image: ''
    });
    const {name, category, video, priceKiosk, options1, options2, options3, options4, price, image, totalCount} = values;
    const [categories, setCategories] = useState()
    const [fileList, setFileList] = useState();

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

    const handleCategory = (item) => {
        setValues(prevValues => ({
            ...prevValues,
            category: item
        }));
    }

    const loadProfile = () => {
        setValues(prev => {
            return {
                ...prev,
                name: product?.name,
                category: product?.category,
                video: product?.video,
                totalCount: product?.totalCount,
                priceKiosk: product?.priceKiosk,
                options1: product?.options[0].value,
                options2: product?.options[1].value,
                options3: product?.options[2].value,
                options4: product?.options[3].value,
                image: product?.image,
                price: product?.price
            };
        });
    }
    useEffect(() => {
        loadProfile();
    }, [product]);

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
        formData.append("priceKiosk", priceKiosk)
        formData.append("video", video)
        formData.append("totalCount", totalCount)
        formData.append("options", JSON.stringify(optionsArr))
        formData.append("category", category)
        fileList?.forEach(item => formData.append("image", item.originFileObj))

        try {
            await axios.put(`/editProduct/${product?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload()
            notification.success({
                message: 'Успех.',
                duration: 1.5
            });
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div className={modal ? `${style.modal} ${style.active}` : style.modal}
             onClick={() => setModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                    className={style.form}
                    fields={[
                        {
                            name: ["name"],
                            value: name,
                        },
                        {
                            name: ["category"],
                            value: category,
                        },
                        {
                            name: ["totalCount"],
                            value: totalCount,
                        },
                        {
                            name: ["video"],
                            value: video,
                        },
                        {
                            name: ["priceKiosk"],
                            value: priceKiosk,
                        },
                        {
                            name: ["options1"],
                            value: options1,
                        },
                        {
                            name: ["options2"],
                            value: options2,
                        },
                        {
                            name: ["options3"],
                            value: options3,
                        },
                        {
                            name: ["options4"],
                            value: options4,
                        },
                        {
                            name: ["price"],
                            value: price,
                        },
                        {
                            name: ["image"],
                            value: image,
                        },
                    ]}
                >
                    <div className={style.formwrapp}>
                        <div>
                            <MyFormItem name="image" label="Загрузить новое фото">
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
                                    onChange={handleCategory}
                                    options={
                                        categories.map((item) => {
                                            return {
                                                value: item.category, label: item.category
                                            }
                                        })
                                    }
                                /> : <p>Loading...</p>}
                            </MyFormItem>
                            <MyFormItem name="totalCount" label="В наличии">
                                <Input/>
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

export default EditProductModal;
