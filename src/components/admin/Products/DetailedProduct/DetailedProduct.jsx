import React, {useEffect, useState} from 'react';
import style from './DetailedProduct.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {notification} from "antd";
import axios from "../../../../axios/axios";
import EditProductModal from "../../Modals/EditProductModal/EditProductModal";

const DetailedProduct = () => {
    const [product, setProduct] = useState()
    const [editModal, setEditModal] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const getProduct = async () => {
            const {data} = await axios.get(`/productById/${id}`)
            setProduct(data)
        }
        getProduct()
    }, []);

    const deleteProduct = async () => {
        try {
            await axios.delete(`/productDelete/${product?._id}`)
            notification.success({
                message: 'Успех.',
                duration: 1.5
            });
            window.location.replace('http://localhost:4000/admin')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <EditProductModal product={product} modal={editModal} setModal={setEditModal}/>
            <div className={style.container}>
                <div className={style.wrapp}>
                    <div className={style.productContainer}>
                        <div className={style.divBack}>
                            <h3 className={style.back} onClick={() => navigate('/admin/products')}>Назад ←</h3>
                        </div>
                        <h3>Информация об этом продукте</h3>
                        <div className={style.productInfo}>
                            <img src={`http://localhost:4000/internal/uploads/${product?.image}`} alt="/"/>
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
                        </div>
                        <div className={style.btnsDiv}>
                            <button onClick={() => setEditModal(true)}>Редактировать</button>
                            <button className={style.delete} onClick={deleteProduct}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedProduct;
