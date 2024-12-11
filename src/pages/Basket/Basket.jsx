import React, { useState } from 'react';
import Layout from "../../Layouts/Layout";
import styles from './Basket.module.scss'
import { useForm, Controller } from "react-hook-form";
import {DatePicker, notification} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import cat from '../../assets/cat.png'
import { changeQuantity, deleteFromCart, clearCart } from '../../store/basket/basketSlice';
import { useNavigate } from 'react-router-dom';
import axios, { url } from '../../axios/axios';

const Basket = () => {
    const [open, setOpen] = useState(false)
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();
    const state = useSelector(state => state.basket)
    const dispatch = useDispatch()
    const totalPrice = state.reduce((acc, curr) => acc += curr.totalPrice, 0)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const {data : dataGet} = await axios.post('/order/create', {...data, products: state})

            if (dataGet.name) {
                notification.success({message: 'Заказ создан.', duration: 3})
            }
            reset()
            dispatch(clearCart())
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={styles.itemss}>
                    {state.length > 0 ? state.map((item) => (
                        <div className={styles.itemContainer} key={item._id}>
                            <img
                                src={`${url}/uploads/${item.img}`}
                                alt="/"
                            />
                            <div className={styles.wrapped}>
                                <div className={styles.itemInfo}>
                                    <p>{item.title}</p>
                                </div>
                                <div className={styles.btns}>
                                    <button 
                                        className={styles.btnItem} 
                                        onClick={() => dispatch(changeQuantity({ _id: item._id, func: "-" }))}
                                    >
                                        -
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button 
                                        className={styles.btnItem} 
                                        onClick={() => dispatch(changeQuantity({ _id: item._id, func: "+" }))}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className={styles.price}>
                                    <p className={styles.currentPrice}>{item.price * item.quantity} р.</p>
                                    {item.oldPrice && (
                                        <p className={styles.oldPrice}>{item.oldPrice * item.quantity} р.</p>
                                    )}
                                </div>
                                <div className={styles.btn} onClick={() => dispatch(deleteFromCart({ _id: item._id }))}>
                                    <p>X</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className={styles.clearBasket}>
                            <img src={cat} alt="/" />
                            <p>В корзине пусто.</p>
                            <button onClick={() => navigate('/')}>Перейти в каталог</button>
                        </div>
                    )}
                </div>
                {open && state.length > 0 ? (
                    <div className={styles.totalOrder}>
                        <div className={styles.getOrder}>
                            <div className={styles.headerItem}>
                                <p onClick={() => setOpen(false)} className={styles.back}>
                                    Назад
                                </p>
                                <p className={styles.totalMoney}>Итого: {totalPrice} р.</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.nameInputDiv}>
                                    <label>Имя</label>
                                    <input type="text" {...register('name', { required: true })} />
                                    {errors.name && <span className={styles.error}>Поле обязательно для заполнения</span>}
                                </div>
                                <div className={styles.nameInputDiv}>
                                    <label>Номер телефона</label>
                                    <input type="text" {...register('phoneNumber', { required: true })} />
                                    {errors.phoneNumber && <span className={styles.error}>Поле обязательно для заполнения</span>}
                                </div>
                                <div className={styles.nameInputDiv}>
                                    <label>Адрес Доставки</label>
                                    <input type="text" {...register('address', { required: true })} />
                                    {errors.address && <span className={styles.error}>Поле обязательно для заполнения</span>}
                                </div>
                                {/* <div className={styles.dateDiv}>
                                    <label>День доставки</label>
                                    <Controller
                                        name="deliveryDate"
                                        control={control}
                                        rules={{ required: 'Дата доставки обязательна' }}
                                        render={({ field }) => (
                                            <DatePicker
                                                className={styles.customDatepicker}
                                                onChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                    {errors.deliveryDate && <span className={styles.error}>{errors.deliveryDate.message}</span>}
                                </div> */}
                                <button type="submit">ОФОРМИТЬ ЗАКАЗ</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    state.length > 0 && (
                        <div className={styles.totalOrder}>
                            <div className={styles.wrapper}>
                                <p>СУММА ВАШЕГО ЗАКАЗА:</p>
                            </div>
                            <div className={styles.greyBg}>
                                <div className={styles.total}>
                                    <p>Итого: {totalPrice} р.</p>
                                </div>
                            </div>
                            <div className={styles.orderText}>
                                <p>
                                    Перерасчет суммы заказа / активация акций и скидок производится
                                    менеджером <strong>после оформления заказа! 👇</strong>
                                </p>
                            </div>
                            <button onClick={() => setOpen(true)}>ПЕРЕЙТИ К ОФОРМЛЕНИЮ</button>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
};

export default Basket;
