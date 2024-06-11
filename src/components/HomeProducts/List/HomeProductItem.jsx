import React from 'react'
import style from './HomeProductList.module.scss'
import zalp from '../../../assets/Залпы2.png'
import bobmbs from '../../../assets/Бомбочка.png'
import sekundomer from '../../../assets/Секундомер.png'
import effects from '../../../assets/Эффекты.png'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../store/basket/basketSlice";
import { useNavigate } from "react-router-dom";

const HomeProductItem = ({ product }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.basket)
    const isProductInBasket = state.some(item => item._id === product._id)
    const navigate = useNavigate()

    return (
        <div className={style.itemWrapper} onClick={() => navigate(`/product/${product?.name}`)}>
            <div className={style.imgDiv}>
                <img className={style.imgf} src={`http://localhost:4000/internal/uploads/${product?.image}`} alt='/' />
            </div>
            <div className={style.titleDiv}>
                <h3>{product?.name}</h3>
                <p className={style.price}>{product.price} ₽</p>
                <p className={style.descr}>Стоимость в киосках: {product?.priceKiosk}₽</p>
            </div>
            <div className={style.line} />
            <div className={style.productDescr}>
                <div className={style.descrItem}>
                    <div className={style.item}>
                        <img src={zalp} alt='/' />
                        <p>{product?.options[0].value} залпов</p>
                    </div>
                    <div className={style.item}>
                        <img src={bobmbs} alt='/' />
                        <p>{product?.options[1].value} калибр</p>
                    </div>
                </div>
                <div className={style.descrItem}>
                    <div className={style.item}>
                        <img src={sekundomer} alt='/' style={{ height: "20px" }} />
                        <p>{product?.options[2].value}</p>
                    </div>
                    <div className={style.item}>
                        <img src={effects} alt='/' style={{ height: "20px" }} />
                        <p>{product?.options[3].value} эффектов</p>
                    </div>
                </div>
            </div>
            <div className={style.addToBasket}>
                <button className={style.ytBtn} onClick={(e) => {
                    e.stopPropagation()
                    window.location.href(product?.video)
                }}>СМОТРЕТЬ ВИДЕО</button>
                {
                    isProductInBasket ? (
                        <button
                            className={style.toCart}
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(deleteFromCart({
                                    _id: product._id
                                }))
                            }}>
                            <svg
                                className="svgicon css176 css177"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 46 46"
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    style={{ fill: "none" }}
                                    rx={0}
                                    ry={0}
                                />
                                <g transform="scale(1) translate(0, 0)" transform-origin="0 0">
                                    {" "}
                                    <g>
                                        <g>
                                            <path
                                                d="M27.8,35.1c-3.2,0-5.7,2.6-5.7,5.9c0,3.2,2.6,5.9,5.7,5.9s5.7-2.6,5.7-5.9C33.5,37.8,30.9,35.1,27.8,35.1z" />
                                            <path
                                                d="M12.6,35.1c-3.2,0-5.7,2.6-5.7,5.9c0,3.2,2.6,5.9,5.7,5.9s5.7-2.6,5.7-5.9C18.3,37.8,15.7,35.1,12.6,35.1z" />
                                        </g>
                                        <path
                                            d="M25.9,13.6c-0.9-0.6-2.1-0.3-2.7,0.6l-2,3V7c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v10.2l-2-3c-0.6-0.9-1.8-1.2-2.7-0.6 c-0.9,0.6-1.2,1.8-0.6,2.7l5.6,8.5c0.4,0.6,1,0.9,1.6,0.9s1.3-0.3,1.6-0.9l5.6-8.5C27.1,15.4,26.8,14.2,25.9,13.6z" />
                                        <path
                                            d="M45.5,1.2h-9.1c-1,0-1.8,0.7-1.9,1.6l-1.2,7h-6.5c0.4,0.2,0.8,0.3,1.2,0.6c1.3,0.9,2.2,2.2,2.5,3.7c0.3,1.5,0,3.1-0.8,4.4 L24.2,27c-1.1,1.7-2.9,2.7-4.9,2.7c-2,0-3.8-1-4.9-2.7l-5.6-8.5c-1.8-2.7-1-6.4,1.7-8.1c0.4-0.2,0.8-0.4,1.2-0.6H2.5 c-0.6,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.5,1.1-0.3,1.7l4.8,18.2c0.2,0.9,1,1.5,1.9,1.5h24.6c1,0,1.8-0.7,1.9-1.6L37,11.3l1.1-6.3h7.4 c1.1,0,2-0.9,2-2S46.6,1.2,45.5,1.2z" />
                                    </g>
                                </g>
                            </svg>
                            В КОРЗИНЕ
                        </button>
                    ) : (
                        <button
                            className={style.toCart}
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(addToCart({
                                    _id: product._id,
                                    title: product.name,
                                    quantity: 1,
                                    price: product.price,
                                    img: product.image,
                                    totalQuantity: product.totalCount
                                }))
                            }}>
                            <svg
                                className="svgicon css176 css177"
                                preserveAspectRatio="xMidYMid meet"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 46 46"
                            >
                                <rect
                                    x={0}
                                    y={0}
                                    style={{ fill: "none" }}
                                    rx={0}
                                    ry={0}
                                />
                                <g transform="scale(1) translate(0, 0)" transform-origin="0 0">
                                    {" "}
                                    <g>
                                        <g>
                                            <path
                                                d="M27.8,35.1c-3.2,0-5.7,2.6-5.7,5.9c0,3.2,2.6,5.9,5.7,5.9s5.7-2.6,5.7-5.9C33.5,37.8,30.9,35.1,27.8,35.1z" />
                                            <path
                                                d="M12.6,35.1c-3.2,0-5.7,2.6-5.7,5.9c0,3.2,2.6,5.9,5.7,5.9s5.7-2.6,5.7-5.9C18.3,37.8,15.7,35.1,12.6,35.1z" />
                                        </g>
                                        <path
                                            d="M25.9,13.6c-0.9-0.6-2.1-0.3-2.7,0.6l-2,3V7c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v10.2l-2-3c-0.6-0.9-1.8-1.2-2.7-0.6 c-0.9,0.6-1.2,1.8-0.6,2.7l5.6,8.5c0.4,0.6,1,0.9,1.6,0.9s1.3-0.3,1.6-0.9l5.6-8.5C27.1,15.4,26.8,14.2,25.9,13.6z" />
                                        <path
                                            d="M45.5,1.2h-9.1c-1,0-1.8,0.7-1.9,1.6l-1.2,7h-6.5c0.4,0.2,0.8,0.3,1.2,0.6c1.3,0.9,2.2,2.2,2.5,3.7c0.3,1.5,0,3.1-0.8,4.4 L24.2,27c-1.1,1.7-2.9,2.7-4.9,2.7c-2,0-3.8-1-4.9-2.7l-5.6-8.5c-1.8-2.7-1-6.4,1.7-8.1c0.4-0.2,0.8-0.4,1.2-0.6H2.5 c-0.6,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.5,1.1-0.3,1.7l4.8,18.2c0.2,0.9,1,1.5,1.9,1.5h24.6c1,0,1.8-0.7,1.9-1.6L37,11.3l1.1-6.3h7.4 c1.1,0,2-0.9,2-2S46.6,1.2,45.5,1.2z" />
                                    </g>
                                </g>
                            </svg>
                            ДОБАВИТЬ В КОРЗИНУ
                        </button>
                    )
                }

            </div>
        </div>
    )
}

export default HomeProductItem