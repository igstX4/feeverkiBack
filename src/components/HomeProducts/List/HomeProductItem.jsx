import React from 'react'
import style from './HomeProductList.module.scss'
import zalp from '../../../assets/Залпы2.png'
import bobmbs from '../../../assets/Бомбочка.png'
import sekundomer from '../../../assets/Секундомер.png'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../../store/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { url } from '../../../axios/axios'

const HomeProductItem = ({ product }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.basket)
    const isProductInBasket = state.some(item => item._id === product._id)
    const navigate = useNavigate()

    const renderProductDetails = () => {
        const details = [];

        // Для салютов
        if (['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(product.category)) {
            details.push(
                <div key="shots" className={style.item}>
                    <img src={zalp} alt='/' />
                    <p>{product.shots} залпов</p>
                </div>,
                <div key="caliber" className={style.item}>
                    <img src={bobmbs} alt='/' />
                    <p>{product.caliber} калибр</p>
                </div>,
                <div key="duration" className={style.item}>
                    <img src={sekundomer} alt='/' style={{ height: "20px" }} />
                    <p>{product.duration}</p>
                </div>
            );
        }

        // ... остальной код renderProductDetails ...

        return details;
    };

    const formatYoutubeUrl = (url) => {
        if (!url) return '';
        
        let videoId = '';
        
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1];
        } else if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('watch?v=')[1];
        } else if (url.includes('youtube.com/embed/')) {
            videoId = url.split('embed/')[1];
        }
        
        videoId = videoId.split('&')[0];
        
        return `https://www.youtube.com/watch?v=${videoId}`;
    };

    return (
        <div className={style.itemWrapper} onClick={() => navigate(`/product/${product?.name}`)}>
            <div className={style.imgDiv}>
                <img className={style.imgf} src={`${url}/uploads/${product?.image}`} alt='/' />
            </div>
            <div className={style.titleDiv}>
                <h3>{product?.name}</h3>
                <p className={style.article}>Артикул: {product?.article}</p>
                <div className={style.priceBlock}>
                    <p className={style.price}>{product.price} BYN</p>
                    {product.oldPrice && (
                        <p className={style.oldPrice}>{product.oldPrice} BYN</p>
                    )}
                </div>
                <p className={`${style.availability} ${!product.inStock ? style.outOfStock : ''}`}>
                    {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </p>
            </div>
            <div className={style.line} />
            <div className={style.productDescr}>
                <div className={style.descrItem}>
                    {renderProductDetails()}
                </div>
            </div>
            <div className={style.addToBasket}>
                {['Фонтаны', 'Бенгальские огни', 'Ракеты'].includes(product?.category) && product?.video && (
                    <button 
                        className={style.ytBtn} 
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(formatYoutubeUrl(product.video), '_blank');
                        }}
                    >
                        СМОТРЕТЬ ВИДЕО
                    </button>
                )}
                {isProductInBasket ? (
                    <button
                        className={style.toCart}
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(deleteFromCart({
                                _id: product._id
                            }))
                        }}>
                        В КОРЗИНЕ
                    </button>
                ) : (
                    <button
                        className={`${style.toCart} ${!product.inStock ? style.disabled : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!product.inStock) return;
                            dispatch(addToCart({
                                _id: product._id,
                                title: product.name,
                                quantity: 1,
                                price: product.price,
                                oldPrice: product.oldPrice,
                                img: product.image
                            }))
                        }}>
                        {product.inStock ? 'ДОБАВИТЬ В КОРЗИНУ' : 'НЕТ В НАЛИЧИИ'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default HomeProductItem