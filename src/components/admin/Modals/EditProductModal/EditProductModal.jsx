import React, {useEffect, useState} from 'react';
import style from './EditProductModal.module.scss'
import {Button, Form, Input, notification, Switch} from 'antd';
import {Select} from 'antd'
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

const EditProductModal = ({product, modal, setModal}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState();
    const [form] = Form.useForm();

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

    // Устанавливаем значения формы при изменении product
    useEffect(() => {
        if (product) {
            setSelectedCategory(product.category);
            form.setFieldsValue({
                name: product.name,
                category: product.category,
                article: product.article,
                price: product.price,
                oldPrice: product.oldPrice,
                inStock: product.inStock,
                shots: product.shots,
                caliber: product.caliber,
                duration: product.duration,
                packQuantity: product.packQuantity,
                effect: product.effect,
                height: product.height,
                length: product.length,
                video: product.video
            });
        }
    }, [product, form]);

    const renderCategoryFields = () => {
        if (!selectedCategory) return null;

        const fields = [];

        // Проверяем содержит ли категория слово "салют"
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

        // Проверяем для петард, римских свечей, ракет и бенгальских огней
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

        // Добавляем калибр для римских свечей
        if (selectedCategory.toLowerCase().includes('свеч')) {
            fields.push(
                <MyFormItem key="caliber" name="caliber" label="Калибр">
                    <Input />
                </MyFormItem>
            );
        }

        // Проверяем для фонтанов
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

        // Проверяем для бенгальских огней
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

    const onFinish = async (values) => {
        const formData = new FormData();
        
        // Базовые поля
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category", values.category);
        formData.append("article", values.article);
        formData.append("oldPrice", values.oldPrice || "");
        formData.append("inStock", values.inStock || false);
        formData.append("video", values.video || "");
        
        if (fileList?.length > 0) {
            fileList.forEach(item => formData.append("image", item.originFileObj));
        }

        // Дополнительные поля в зависимости от категории
        if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(values.category)) {
            formData.append("shots", values.shots);
            formData.append("caliber", values.caliber);
            formData.append("duration", values.duration);
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(values.category)) {
            formData.append("packQuantity", values.packQuantity);
        }

        if (values.category.toLowerCase().includes('свеч')) {
            formData.append('caliber', values.caliber);
        }

        if (values.category === 'Фонтаны') {
            formData.append("height", values.height);
            formData.append("shots", values.shots);
            formData.append("duration", values.duration);
        }

        if (values.category === 'Бенгальские огни') {
            formData.append("length", values.length);
            formData.append("duration", values.duration);
        }

        try {
            await axios.put(`/editProduct/${product?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.reload();
            notification.success({
                message: 'Успех.',
                duration: 1.5
            });
        } catch(e) {
            console.log(e);
            notification.error({
                message: 'Ошибка при обновлении продукта',
                duration: 1.5
            });
        }
    }

    if (!product || !categories.length) {
        return null; // или можно показать спиннер загрузки
    }

    return (
        <div className={modal ? `${style.modal} ${style.active}` : style.modal}
             onClick={() => setModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    form={form}
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ inStock: true }}
                    className={style.form}
                >
                    <div className={style.formwrapp}>
                        <div>
                            <MyFormItem name="image" label="Загрузить новое фото">
                                <UploadButton setFileList={setFileList} />
                            </MyFormItem>
                            <MyFormItem name="name" label="Название">
                                <Input/>
                            </MyFormItem>
                            <MyFormItem name="article" label="Артикул">
                                <Input/>
                            </MyFormItem>
                            <MyFormItem name="category" label="Категория">
                                <Select
                                    style={{width: '95%'}}
                                    onChange={(value) => setSelectedCategory(value)}
                                    options={categories.map((item) => ({
                                        value: item.category,
                                        label: item.category
                                    }))}
                                />
                            </MyFormItem>
                            <MyFormItem name="price" label="Цена">
                                <Input type="number"/>
                            </MyFormItem>
                            <MyFormItem name="oldPrice" label="Старая цена">
                                <Input type="number"/>
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
                        Сохранить
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EditProductModal;
