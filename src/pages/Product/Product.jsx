import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import style from './Product.module.scss'
import zalp from '../../assets/Залпы2 (1).png'
import bobmbs from '../../assets/Бомбочка (1).png'
import sekundomer from '../../assets/Секундомер (1).png'
import effects from '../../assets/Эффекты1.png'
import { PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import axios, { url } from "../../axios/axios";
import deliver from '../../assets/Время-доставки.png'
import img1 from '../../assets/doc-1.png'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../store/basket/basketSlice";

const Product = () => {
    const params = useParams()
    const [product, setProduct] = useState();
    const dispatch = useDispatch()
    const state = useSelector(state => state.basket)
    const isProductInBasket = state.some(item => item._id === product?._id)

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/productByName/${params?.productName}`)
            setProduct(data)
        }
        getProduct()
    }, [params?.productName])

    return (
        <Layout>
            <div className={style.container}>
                <div className={style.product}>
                    <div>
                        <div className={style.info}>
                            <div className={style.iframeItem}>
                                <iframe className="video-wrapper" frameBorder="0" allowFullScreen="true" title='s.'
                                    src={"//www.youtube.com/embed/dLVQSv6n_dQ?autoplay=1&loop=0&rel=0&modestbranding=0"}></iframe>
                            </div>
                            <div className={style.photodiv}>
                                <PhotoView src={`${url}/uploads/${product?.image}`}>
                                    <img src={`${url}/uploads/${product?.image}`} alt="/" />
                                </PhotoView>
                            </div>
                        </div>
                        <div className={style.descr}>
                            {product?.options.map((option) => (
                                <div key={option._id} className={style.item}>
                                    <img
                                        src={
                                            option.name === "Залпов"
                                                ? zalp
                                                : option.name === "Калибр"
                                                    ? bobmbs
                                                    : option.name === "Время"
                                                        ? sekundomer
                                                        : option.name === "Эффекты"
                                                            ? effects
                                                            : null
                                        }
                                        alt={option.name}
                                    />
                                    <div>
                                        <p>{option.name}</p>
                                        <h3>{option.value}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.rightSide}>
                        <div>
                            <div className={style.headerItem}>
                                <div>
                                    Хит продаж
                                </div>
                            </div>
                            <div className={style.content}>
                                <p className={style.title}>{product?.name}</p>
                                <p className={style.nalichie}>В наличии</p>
                                <p className={style.price}>{product?.price} бел. руб</p>
                                <p className={style.kiosk}>Стоимость в киосках: <s>{product?.priceKiosk} бел. руб</s></p>
                            </div>
                            <div className={style.lowerBlock}>
                                <div className={style.block}>
                                    <img src={deliver} alt="/" />
                                    <div>
                                        <b>Доставим этот салют бесплатно!</b>
                                        <p>Ближайшая доставка завтра.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        className={style.svgicon}
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
                                        className={style.svgicon}
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
            </div>
            <div className={style.itemb}>
                <div className={style.leftItem}>
                    <img src={img1} alt="/" />
                    <div>
                        <b>Без осечек!</b>
                        <p>Каждая позиция в нашем каталоге прошла контроль качества и сертифицирована.</p>
                    </div>
                </div>
                {/* <div className={style.rightItem}>
                    <b>Описание салюта:</b>
                    <p>1. Серебряные вертушки раскрываются россыпью разноцветного жемчуга;</p>
                    <p>2. Красные пальмы с синим жемчугом и зеленым мерцанием;</p>
                    <p>3. Зеленые пальмы с пурпурным жемчугом и золотым мерцанием;</p>
                    <p>4. Золотые ивы с синим жемчугом и красным мерцанием;</p>
                    <p>5. Каскад пышных трещащих трасс;</p>
                    <p>6. Парчовые короны с красными жемчужинами и золотые хризантемы;</p>
                    <p>7. Парчовые короны с изумрудными мерцающими огоньками;</p>
                </div> */}
            </div>
        </Layout>
    );
};

export default Product;
