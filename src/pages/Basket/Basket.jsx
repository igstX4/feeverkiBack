import React, { useState } from 'react';
import Layout from "../../Layouts/Layout";
import style from './Basket.module.scss'
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import cat from '../../assets/cat.png'
import { changeQuantity, deleteFromCart } from '../../store/basket/basketSlice';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
    const [open, setOpen] = useState(false)
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const state = useSelector(state => state.basket)
    const dispatch = useDispatch()
    const totalPrice = state.reduce((acc, curr) => acc += curr.totalPrice, 0)
    const navigate = useNavigate()

    const onSubmit = (data) => {

    };
    

    return (
        <Layout>
            <div className={style.wrapper}>
                <div className={style.itemss}>
                    {
                        state.length > 0 ? state.map((item, i) => (
                            <>
                                <div className={style.itemContainer} key={item._id}>
                                    <img
                                        src={`http://localhost:4000/internal/uploads/${item.img}`}
                                        alt="/"
                                    />
                                    <div className={style.wrapped}>
                                        <div className={style.itemInfo}>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className={style.btns}>
                                            <button className={style.btnItem} onClick={() => dispatch(changeQuantity({ _id: item._id, func: "-" }))}>-</button>
                                            <p>{item.quantity}</p>
                                            <button className={style.btnItem} onClick={() => dispatch(changeQuantity({ _id: item._id, func: "+" }))}>+</button>
                                        </div>
                                        <div className={style.price}>
                                            <p>{item.price * item.quantity} р.</p>
                                        </div>
                                    </div>
                                    <div className={style.btn} onClick={() => dispatch(deleteFromCart({ _id: item._id }))}>
                                        <p>X</p>
                                    </div>
                                </div>
                            </>
                        )) : (
                            <div className={style.clearBasket}>
                                <img src={cat} alt="/" />
                                <p>В корзине пусто.</p>
                                <button onClick={() => navigate('/')}>Перейти в каталог</button>
                            </div>
                        )
                    }
                </div>
                {/* <div className={style.totalOrder}> */}
                {
                    open && state.length > 0 ? (
                        <div className={style.totalOrder}>
                            <div className={style.getOrder}>
                                <div className={style.headerItem}>
                                    <p onClick={() => setOpen(false)} className={style.back}>
                                        {/* <ArrowBackIosNewIcon /> */}
                                        Назад
                                    </p>
                                    <p className={style.totalMoney}>Итого: {totalPrice} р.</p>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={style.nameInputDiv}>
                                        <label>Имя</label>
                                        <input
                                            type="text" {...register('name', { required: true })} />
                                        {errors.name &&
                                            <span className={style.error}>Поле обязательно для заполнения</span>}
                                    </div>
                                    <div className={style.nameInputDiv}>
                                        <label>Номер телефона</label>
                                        <input type="text" {...register('phoneNumber', {
                                            required: true,
                                            pattern: /^[0-9]{10}$/
                                        })} />
                                        {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                                            <span className={style.error}>Поле обязательно для заполнения</span>
                                        )}
                                        {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                                            <span className={style.error}>Неверный формат номера телефона</span>
                                        )}
                                    </div>
                                    <div className={style.nameInputDiv}>
                                        <label>Адрес Доставки</label>
                                        <input
                                            type="text" {...register('address', { required: true })} />
                                        {errors.address &&
                                            <span className={style.error}>Поле обязательно для заполнения</span>}
                                    </div>
                                    <div className={style.dateDiv}>
                                        <label>День доставки</label>
                                        <Controller
                                            name="deliveryDate"
                                            control={control}
                                            rules={{ required: 'Дата доставки обязательна' }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className={style.customDatepicker}
                                                    onChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                        {errors.deliveryDate &&
                                            <span
                                                className={style.error}>{errors.deliveryDate.message}</span>}
                                    </div>
                                    <div className={style.nameInputDiv}>
                                        <label>Время доставки</label>
                                        <select {...register('deliveryTime', { required: true })}>
                                            <option value="0">В любое время (С 10:00 до 22:00)
                                            </option>
                                            <option value="1">с 10:00 до 16:00</option>
                                            <option value="2">с 14:00 до 18:00</option>
                                            <option value="3">с 18:00 до 22:00</option>
                                        </select>
                                        {errors.deliveryTime &&
                                            <span className={style.error}>Выберите время доставки</span>}
                                    </div>
                                    <button className={style.btn} type="submit">ОФОРМИТЬ ЗАКАЗ
                                    </button>
                                </form>
                            </div>
                        </div>

                    ) : (
                        state.length > 0 && (
                            <>
                                <div className={style.totalOrder}>
                                    <div className={style.wrapper}>
                                        <p>СУММА ВАШЕГО ЗАКАЗА:</p>
                                    </div>
                                    <div className={style.greyBg}>
                                        <div className={style.total}>
                                            <p>Итого: {totalPrice} р.</p>
                                        </div>
                                    </div>
                                    <div className={style.orderText}>
                                        <p>
                                            Перерасчет суммы заказа / активация акций и скидок
                                            производится
                                            менеджером <strong>после оформления заказа! 👇</strong>
                                        </p>
                                    </div>
                                    <button onClick={() => setOpen(true)}>ПЕРЕЙТИ К ОФОРМЛЕНИЮ</button>
                                </div>
                            </>
                        )
                    )
                }
                {/* </div> */}
            </div>
        </Layout >
    );
};

export default Basket;
