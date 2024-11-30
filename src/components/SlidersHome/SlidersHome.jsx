import React, { useEffect, useRef, useState } from 'react'
import style from './SlidersHome.module.scss'
import { data } from '../../utils/slider_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios, { url } from "../../axios/axios";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Slider.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import salyt2 from '../../assets/salyt2.png'
import zalp from '../../assets/36zalp.png'
import mini from '../../assets/mini-Salyt.png'
import image12 from '../../assets/image12.png'
import skidka from '../../assets/skidka1.png'
import firstImg from '../../assets/firstImage.jpg'


const SlidersHome = () => {
    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliders, setSliders] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getSliders = async () => {
            try {
                const { data } = await axios.get('/getItemSlider')
                setSliders(data.items)
            } catch (e) {
                console.log(e)
            }
        }
        getSliders()
    }, [])

    return (
        <>
            {/* <div className={style.responsibleDivs}>
                <div className={style.topItem}>
                    <div className={style.item}>
                        <img src={salyt2} alt='item' />
                        <div className={style.information}>
                            <h1>СУПЕР САЛЮТЫ</h1>
                            <p>ОТ 10 000 ₽</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <img src={zalp} className={style.smaller} alt='item' />
                        <div className={style.information}>
                            <h1>БОЛЬШИЕ САЛЮТЫ</h1>
                            <p>ОТ 3 000 ДО 10 000 ₽</p>
                        </div>
                    </div>
                </div>
                <div className={style.topItem}>
                    <div className={style.item}>
                        <img src={mini} className={style.smaller} alt='item' />
                        <div className={style.information}>
                            <h1>МАЛЫЕ САЛЮТЫ</h1>
                            <p>ДО 3 000 ₽</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <img src={image12} style={{ height: "100px" }} alt='item' />
                        <div className={style.information}>
                            <h1 style={{ fontSize: "12px" }}>МЕЛКАЯ ПИРОТЕХНИКА</h1>
                            <p>Фонтаны, петарды и т.д.</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={style.globalDivSliders}>
                <div className={style.wrapper}>


                </div>
                <div className={style.someFireworks}>
                    <button onClick={() => navigate('/catalog/all')}>
                        <p>Каталог</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SlidersHome