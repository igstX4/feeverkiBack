import React, {useEffect, useState} from 'react';
import style from './AddProductModal.module.scss'
import {Button, Form, Input, notification, Switch} from "antd";
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

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            
            // Базовые поля
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('category', values.category);
            formData.append('article', values.article);
            formData.append('oldPrice', values.oldPrice || '');
            formData.append('inStock', values.inStock || false);
            formData.append('video', values.video || '');

            if (fileList?.length > 0) {
                fileList.forEach(item => formData.append('image', item.originFileObj));
            }

            // Дополнительные поля в зависимости от категории
            if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(values.category)) {
                formData.append('shots', values.shots);
                formData.append('caliber', values.caliber);
                formData.append('duration', values.duration);
            }

            if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(values.category)) {
                formData.append('packQuantity', values.packQuantity);
            }

            if (values.category.toLowerCase().includes('свеч')) {
                formData.append('caliber', values.caliber);
            }

            if (values.category === 'Фонтаны') {
                formData.append('height', values.height);
                formData.append('shots', values.shots);
                formData.append('duration', values.duration);
            }

            if (values.category === 'Бенгальские огни') {
                formData.append('length', values.length);
                formData.append('duration', values.duration);
            }

            const {data} = await axios.post('/createProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data) {
                notification.success({
                    message: 'Успех.',
                    description: 'Товар успешно создан.',
                    duration: 1.5
                });
                setCreateModal(false);
                update();
            }
        } catch (e) {
            console.log(e);
            notification.error({
                message: 'Ошибка при создании товара',
                duration: 1.5
            });
        }
    };

    // Функция для рендера дополнительных полей в зависимости от категории
    const renderCategoryFields = () => {
        if (!selectedCategory) return null;

        const fields = [];

        if (selectedCategory.toLowerCase().includes('салют')) {
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

        if (selectedCategory.toLowerCase().includes('петард') || 
            selectedCategory.toLowerCase().includes('свеч') || 
            selectedCategory.toLowerCase().includes('ракет') || 
            selectedCategory.toLowerCase().includes('бенгальск')) {
            fields.push(
                <MyFormItem key="packQuantity" name="packQuantity" label="Количество в упаковке">
                    <Input type="number" />
                </MyFormItem>
            );
        }

        if (selectedCategory.toLowerCase().includes('свеч')) {
            fields.push(
                <MyFormItem key="caliber" name="caliber" label="Калибр">
                    <Input />
                </MyFormItem>
            );
        }

        if (selectedCategory.toLowerCase().includes('фонтан')) {
            fields.push(
                <MyFormItem key="height" name="height" label="Высота">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="duration" name="duration" label="Время">
                    <Input />
                </MyFormItem>
            );
        }

        if (selectedCategory.toLowerCase().includes('бенгальск')) {
            fields.push(
                <MyFormItem key="length" name="length" label="Длина">
                    <Input />
                </MyFormItem>,
                <MyFormItem key="duration" name="duration" label="Время">
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
                            <MyFormItem name="oldPrice" label="Старая цена">
                                <Input type="number" />
                            </MyFormItem>
                            <MyFormItem name="inStock" label="В наличии" valuePropName="checked">
                                <Switch defaultChecked />
                            </MyFormItem>
                            <MyFormItem name="video" label="Ссылка на видео (необязательно)">
                                <Input placeholder="https://youtube.com/..." />
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
