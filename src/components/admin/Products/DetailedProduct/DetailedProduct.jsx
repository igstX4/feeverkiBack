import React, {useEffect, useState} from 'react';
import style from './DetailedProduct.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {notification} from "antd";
import axios, {redirect, url} from "../../../../axios/axios";
import EditProductModal from "../../Modals/EditProductModal/EditProductModal";

const DetailedProduct = ({order}) => {
    const [product, setProduct] = useState()
    const [editModal, setEditModal] = useState(false)
    const [prices, setPrices] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getProduct = async () => {
            if (!order) {
                const {data} = await axios.get(`/productById/${id}`)
                setProduct(data)
            } else {
                const {data} = await axios.get(`/order/${id}`)
                const newData = data.products.reduce((acc, curr) => acc += +curr.totalPrice, 0)
                setPrices(newData)
                setProduct(data)
            }
        }
        getProduct()
    }, []);

    const deleteProduct = async () => {
        try {
            if (!order) {
                await axios.delete(`/productDelete/${product?._id}`)
            } else {
                await axios.delete(`/order/${id}`)
            }
            notification.success({
                message: 'Успех.',
                duration: 1.5
            });
            window.location.replace(`${redirect}/admin`)
        } catch (e) {
            console.log(e)
        }
    }

    const calculateDiscount = () => {
        if (!product) return null;
        if (product.oldPrice && product.price) {
            const discount = ((product.oldPrice - product.price) / product.oldPrice) * 100;
            return Math.round(discount);
        }
        return null;
    }

    const discount = product ? calculateDiscount() : null;

    const renderProductDetails = () => {
        if (!product) return <p>loading..</p>;

        const details = [];

        // Базовые поля
        details.push(
            <img key="image" src={`${url}/uploads/${product.image}`} alt="/"/>,
            <p key="name" className={style.title}>Название: <span>{product.name}</span></p>,
            <p key="article" className={style.title}>Артикул: <span>{product.article}</span></p>,
            <p key="category" className={style.title}>Категория: <span>{product.category}</span></p>,
            <p key="inStock" className={style.title}>Наличие: <span className={product.inStock ? style.inStock : style.outOfStock}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span></p>,
            <div key="prices" className={style.priceInfo}>
                <p className={style.price}>Цена: <span>{product.price} BYN</span></p>
                {product.oldPrice && (
                    <p className={style.oldPrice}>Старая цена: <span>{product.oldPrice} BYN</span></p>
                )}
            </div>
        );

        // Дополнительные поля в зависимости от категории
        if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(product.category)) {
            details.push(
                <p key="shots" className={style.title}>Количество выстрелов: <span>{product.shots}</span></p>,
                <p key="caliber" className={style.title}>Калибр: <span>{product.caliber}</span></p>,
                <p key="duration" className={style.title}>Время: <span>{product.duration}</span></p>
            );
        }

        if (['Петарды', 'Рим свечи', 'Ракеты', 'Бенгальские огни'].includes(product.category)) {
            details.push(
                <p key="packQuantity" className={style.title}>Количество в упаковке: <span>{product.packQuantity}</span></p>
            );
        }

        if (['Петарды', 'Рим свечи'].includes(product.category)) {
            details.push(
                <p key="effect" className={style.title}>Эффект: <span>{product.effect}</span></p>
            );
        }

        if (product.category === 'Фонтаны') {
            details.push(
                <p key="height" className={style.title}>Высота: <span>{product.height}</span></p>,
                <p key="video" className={style.title}>Видео: <a href={product.video}>{product.video}</a></p>
            );
        }

        if (product.category === 'Бенгальские огни') {
            details.push(
                <p key="length" className={style.title}>Длина: <span>{product.length}</span></p>,
                <p key="duration" className={style.title}>Время: <span>{product.duration}</span></p>,
                <p key="video" className={style.title}>Видео: <a href={product.video}>{product.video}</a></p>
            );
        }

        if (product.category === 'Ракеты') {
            details.push(
                <p key="video" className={style.title}>Видео: <a href={product.video}>{product.video}</a></p>
            );
        }

        return details;
    };

    return (
        <>
            {!order ? <EditProductModal product={product} modal={editModal} setModal={setEditModal}/> : null}
            <div className={style.container}>
                <div className={style.wrapp}>
                    <div className={style.productContainer}>
                        <div className={style.divBack}>
                            <h3 className={style.back} onClick={() => navigate(order ? '/admin/orders' : '/admin/products')}>
                                Назад ←
                            </h3>
                        </div>
                        <h3>Информация об этом продукте</h3>
                        <div className={style.productInfo}>
                            {!order ? (
                                renderProductDetails()
                            ) : (
                                <>
                                    <p className={style.title}>Имя: <span>{product?.products.map((item) => <p key={item.id}>{item.title}</p>)}</span></p>
                                    <p className={style.title}>Номер телефона: <span>{product?.phoneNumber}</span></p>
                                    <p className={style.title}>Количество: <span>{product?.products.map((item) => <p key={item.id}>{item.quantity}</p>)}</span></p>
                                    <p className={style.title}>Адрес: <span>{product?.address}</span></p>
                                    <p className={style.title}>Общая сумма: <span>{prices}</span></p>
                                </>
                            )}
                        </div>
                        <div className={style.btnsDiv}>
                            {!order && <button onClick={() => setEditModal(true)}>Редактировать</button>}
                            <button className={style.delete} onClick={deleteProduct}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedProduct;
