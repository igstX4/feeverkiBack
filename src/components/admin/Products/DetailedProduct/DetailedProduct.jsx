import React, {useEffect, useState} from 'react';
import style from './DetailedProduct.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {notification} from "antd";
import axios, { url } from "../../../../axios/axios";
import EditProductModal from "../../Modals/EditProductModal/EditProductModal";

const DetailedProduct = ({order}) => {
    const [product, setProduct] = useState()
    const [editModal, setEditModal] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const getProduct = async () => {
            if (!order) {
                const {data} = await axios.get(`/productById/${id}`)
                setProduct(data)
            } else {
                const {data} = await axios.get(`/order/${id}`)
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
            window.location.replace('https://feeverki-back.vercel.app/admin')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {!order ? <EditProductModal product={product} modal={editModal} setModal={setEditModal}/> : null}
            <div className={style.container}>
                <div className={style.wrapp}>
                    <div className={style.productContainer}>
                        <div className={style.divBack}>
                            <h3 className={style.back} onClick={() => navigate(order ? '/admin/orders' : '/admin/products')}>Назад ←</h3>
                        </div>
                        <h3>Информация об этом продукте</h3>
                        <div className={style.productInfo}>
                            {
                                !order ?<> <img src={`${url}/uploads/${product?.image}`} alt="/"/>
                                <p className={style.title}>Название: <span>{product?.name}</span></p>
                                <p className={style.title}>Категория: <span>{product?.category}</span></p>
                                <p className={style.title}>Цена: <span>{product?.price} ₽</span></p>
                                <p className={style.title}>Цена в киосках: <span>{product?.priceKiosk} ₽</span></p>
                                <p className={style.title}>Ютуб видео: <a href={product?.video}>{product?.video}</a></p>
                                {
                                    product ? (
                                        product?.options.map(item => (
                                            <p className={style.title}>{item.name}: <span>{item.value}</span></p>
                                        ))
                                    ) : <p>loading..</p>
                                }
                                </> : <>
                                    <p className={style.title}>Имя: <span>{product?.name}</span></p>
                                    <p className={style.title}>Почта: <span>{product?.email}</span></p>
                                    <p className={style.title}>Номер телефона: <span>{product?.phoneNumber} </span></p>
                                    <p className={style.title}>Количество: <span>{product?.count} </span></p>
                                    <p className={style.title}>Изображение: <a href={product?.video}>{product?.image}</a></p>
                                    <p className={style.title}>Адрес: <a href={product?.video}>{product?.address}</a></p>
                                </>
                            }
                        </div>
                        <div className={style.btnsDiv}>
                            {order ? null : <button onClick={() => setEditModal(true)}>Редактировать</button>
                        }
                            <button className={style.delete} onClick={deleteProduct}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedProduct;
