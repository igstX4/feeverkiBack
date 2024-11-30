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
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState();

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
        const formData = new FormData();
        
        // Базовые поля для всех категорий
        formData.append("name", value.name);
        formData.append("price", value.price);
        formData.append("category", value.category);
        formData.append("article", value.article);
        fileList?.forEach(item => formData.append("image", item.originFileObj));

        // Дополнительные поля в зависимости от категории
        if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(value.category)) {
            formData.append("shots", value.shots);
            formData.append("caliber", value.caliber);
            formData.append("duration", value.duration);
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(value.category)) {
            formData.append("packQuantity", value.packQuantity);
        }

        if (['Петарды', 'Рим свечи'].includes(value.category)) {
            formData.append("effect", value.effect);
        }

        if (value.category === 'Фонтаны') {
            formData.append("height", value.height);
            formData.append("video", value.video);
        }

        if (value.category === 'Бенгальские огни') {
            formData.append("length", value.length);
            formData.append("duration", value.duration);
            formData.append("video", value.video);
        }

        if (value.category === 'Ракеты') {
            formData.append("video", value.video);
        }

        try {
            const {data} = await axios.post(`/createProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data._id) {
                update();
                setCreateModal(false);
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

    // Функция для рендера дополнительных полей в зависимости от категории
    const renderCategoryFields = () => {
        if (!selectedCategory) return null;

        const fields = [];

        if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(selectedCategory)) {
            fields.push(
                <MyFormItem key="shots" name="shots" label="Количество выстрелов">
                    <Input type="number" />
                </MyFormItem>,
                <MyFormItem key="caliber" name="caliber" label="Калибр">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="duration" name="duration" label="Время">
                    <Input />
                </MyFormItem>
            );
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(selectedCategory)) {
            fields.push(
                <MyFormItem key="packQuantity" name="packQuantity" label="Количество в упаковке">
                    <Input type="number" />
                </MyFormItem>
            );
        }

        if (['Петарды', 'Рим свечи'].includes(selectedCategory)) {
            fields.push(
                <MyFormItem key="effect" name="effect" label="Эффект">
                    <Input />
                </MyFormItem>
            );
        }

        if (selectedCategory === 'Фонтаны') {
            fields.push(
                <MyFormItem key="height" name="height" label="Высота">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="video" name="video" label="Видео">
                    <Input />
                </MyFormItem>
            );
        }

        if (selectedCategory === 'Бенгальские огни') {
            fields.push(
                <MyFormItem key="length" name="length" label="Длина">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="duration" name="duration" label="Время">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="video" name="video" label="Видео">
                    <Input />
                </MyFormItem>
            );
        }

        if (selectedCategory === 'Ракеты') {
            fields.push(
                <MyFormItem key="video" name="video" label="Видео">
                    <Input />
                </MyFormItem>
            );
        }

        return fields;
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
                                <UploadButton setFileList={setFileList} />
                            </MyFormItem>
                            <MyFormItem name="name" label="Название">
                                <Input />
                            </MyFormItem>
                            <MyFormItem name="article" label="Артикул">
                                <Input />
                            </MyFormItem>
                            <MyFormItem name="category" label="Категория">
                                {categories ? (
                                    <Select
                                        defaultValue="Выберите категорию"
                                        style={{width: '95%'}}
                                        onChange={(value) => setSelectedCategory(value)}
                                        options={categories.map((item) => ({
                                            value: item.category,
                                            label: item.category
                                        }))}
                                    />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </MyFormItem>
                            <MyFormItem name="price" label="Цена">
                                <Input type="number" />
                            </MyFormItem>
                        </div>
                        <div className={style.rightCont}>
                            {renderCategoryFields()}
                        </div>
                    </div>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProductModal;
