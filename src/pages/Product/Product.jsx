import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Layout from "../../Layouts/Layout";
import style from './Product.module.scss'
import zalp from '../../assets/Залпы2 (1).png'
import bobmbs from '../../assets/Бомбочка (1).png'
import sekundomer from '../../assets/Секундомер (1).png'
import effects from '../../assets/Эффекты1.png'
import {PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import axios from "../../axios/axios";
import deliver from '../../assets/Время-доставки.png'
import img1 from '../../assets/doc-1.png'

const Product = () => {
    const params = useParams()
    const [product, setProduct] = useState();
    

    useEffect(() => {
        const getProduct = async () => {
            const {data} = await axios.get(`/productByName/${params?.productName}`)
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
                                <PhotoView src={`http://localhost:4000/internal/uploads/${product?.image}`}>
                                    <img src={`http://localhost:4000/internal/uploads/${product?.image}`} alt="/"/>
                                </PhotoView>
                            </div>
                        </div>
                        <div className={style.descr}>
                            <div className={style.item}>
                                <img src={zalp} alt="/"/>
                                <div>
                                    <p>Залпов</p>
                                    <h3>55</h3>
                                </div>
                            </div>
                            <div className={style.item}>
                                <img src={bobmbs} alt="/"/>
                                <div>
                                    <p>Калибр</p>
                                    <h3>1 д</h3>
                                </div>
                            </div>
                            <div className={style.item}>
                                <img src={sekundomer} alt="/"/>
                                <div>
                                    <p>Время</p>
                                    <h3>60</h3>
                                </div>
                            </div>
                            <div className={style.item}>
                                <img src={effects} alt="/"/>
                                <div>
                                    <p>Эффекты</p>
                                    <h3>11</h3>
                                </div>
                            </div>
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
                                <p className={style.title}>Династия</p>
                                <p className={style.nalichie}>В наличии</p>
                                <p className={style.price}>29100 ₽</p>
                                <p className={style.kiosk}>Стоимость в киосках: <s>34920₽</s></p>
                            </div>
                            <div className={style.lowerBlock}>
                                <div className={style.block}>
                                    <img src={deliver} alt="/"/>
                                    <div>
                                        <b>Доставим этот салют бесплатно!</b>
                                        <p>Ближайшая доставка завтра.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button>Добавить в корзину</button>
                    </div>
                </div>
            </div>
            <div className={style.itemb}>
                <div className={style.leftItem}>
                    <img src={img1} alt="/"/>
                    <div>
                        <b>Без осечек!</b>
                        <p>Каждая позиция в нашем каталоге прошла контроль качества и сертифицирована.</p>
                    </div>
                </div>
                <div className={style.rightItem}>
                    <b>Описание салюта:</b>
                    <p>1. Серебряные вертушки раскрываются россыпью разноцветного жемчуга;</p>
                    <p>2. Красные пальмы с синим жемчугом и зеленым мерцанием;</p>
                    <p>3. Зеленые пальмы с пурпурным жемчугом и золотым мерцанием;</p>
                    <p>4. Золотые ивы с синим жемчугом и красным мерцанием;</p>
                    <p>5. Каскад пышных трещащих трасс;</p>
                    <p>6. Парчовые короны с красными жемчужинами и золотые хризантемы;</p>
                    <p>7. Парчовые короны с изумрудными мерцающими огоньками;</p>
                </div>
            </div>
        </Layout>
    );
};

export default Product;
