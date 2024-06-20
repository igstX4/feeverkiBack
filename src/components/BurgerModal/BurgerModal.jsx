import s from './BurgerModal.module.scss'
import {Cart, Cross} from "../Header/Svgs";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import whatsapp from '../../assets/Whatsapp.png'


export const BurgerModal = ({opened, setOpened}) => {
    const navigate = useNavigate()

    return (
        <div onClick={setOpened} className={`${s.bgModal} ${opened ? s.opened : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${s.content} ${opened ? s.contentOpened : ""}`}>
                <div className={s.top}>
                    <div className={s.header}>
                        <button onClick={setOpened} className={s.cross}><Cross/></button>
                        <h2>Меню</h2>
                    </div>
                    <div className={s.links}>
                        <NavLink to={"/"}>Главная</NavLink>
                        <NavLink to={"/catalog/superFireworks"}>Каталог</NavLink>
                        <NavLink to={"/paymentInfo"}>Доставка и оплата</NavLink>
                        <NavLink to={"/stock"}>Акции</NavLink>
                        <NavLink to={"/reviews"}>Отзывы</NavLink>
                        <NavLink to={"/security"}>Техника безопасности</NavLink>
                        <NavLink to={"/security"}>Сертификаты</NavLink>
                        <NavLink to={"/security"}>Сотрудничество</NavLink>
                        <NavLink to={"/security"}>Контакты</NavLink>
                    </div>
                </div>
                <div className={s.bottom}>
                    <div className={s.cart} onClick={() => navigate("/basket")}>
                        <Cart/>
                        <p>Корзина (0)</p>
                    </div>
                    <div className={s.line}/>
                    <h1 className={s.number}>8(812)987-78-51</h1>
                    <button className={s.whatsup}><img src={whatsapp} alt={"XD"}/>
                    </button>
                    <button className={s.catalog}>Запросить звонок</button>
                </div>
            </div>
        </div>
    )
}