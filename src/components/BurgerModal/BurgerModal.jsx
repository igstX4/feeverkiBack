import s from './BurgerModal.module.scss'
import { Cart, Cross } from "../Header/Svgs";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import whatsapp from '../../assets/Whatsapp.png'


export const BurgerModal = ({ opened, setOpened }) => {
    const navigate = useNavigate()

    return (
        <div onClick={setOpened} className={`${s.bgModal} ${opened ? s.opened : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${s.content} ${opened ? s.contentOpened : ""}`}>
                <div className={s.top}>
                    <div className={s.header}>
                        <button onClick={setOpened} className={s.cross}><Cross /></button>
                        <h2>Меню</h2>
                    </div>
                    <div className={s.links}>
                        <NavLink to={"/"}>Главная</NavLink>
                        <NavLink to={"/catalog/superFireworks"}>Каталог</NavLink>
                        <NavLink to={"/stock"}>Акции</NavLink>
                        <NavLink to={"/security"}>Техника безопасности</NavLink>
                        {/* <NavLink to={"/security"}>Сотрудничество</NavLink> */}
                        <NavLink to={"/contacts"}>Контакты</NavLink>
                    </div>
                </div>
                <div className={s.bottom}>
                    <div className={s.cart} onClick={() => navigate("/basket")}>
                        <Cart />
                        <p>Корзина (0)</p>
                    </div>
                    <div className={s.line} />
                    <h1 className={s.number}>+375293570821</h1>
                    <button className={s.whatsup}><svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={100}
                        height={100}
                        viewBox="0 0 50 50"
                    >
                        <path d="M 24.425781 3 C 23.0625 3.007813 21.695313 3.089844 20.316406 3.257813 C 17.679688 3.582031 15.066406 4.121094 12.558594 5.273438 C 8.570313 7.105469 5.742188 10.214844 4.921875 14.734375 C 4.574219 16.640625 4.292969 18.574219 4.132813 20.519531 C 3.824219 24.296875 4.015625 28.085938 5.085938 31.808594 C 5.929688 34.742188 7.484375 37.378906 10.207031 39.089844 C 11.359375 39.8125 12.878906 40.164063 13.671875 40.53125 C 13.894531 40.636719 13.949219 40.699219 13.960938 40.714844 C 13.972656 40.726563 14.003906 40.753906 14 40.988281 C 13.972656 43.378906 14 48.003906 14 48.003906 L 14.003906 49 L 15.789063 49 L 16.078125 48.71875 C 16.078125 48.71875 20.613281 44.355469 22.253906 42.558594 C 22.550781 42.238281 22.703125 42.058594 22.734375 42.039063 C 22.761719 42.019531 22.714844 42.007813 23.019531 42 C 25.171875 41.957031 27.320313 41.875 29.46875 41.757813 C 32.300781 41.601563 35.1875 41.332031 37.964844 40.171875 C 40.382813 39.160156 42.402344 37.507813 43.625 35.03125 C 44.875 32.492188 45.542969 29.800781 45.792969 27.015625 C 46.207031 22.378906 46.0625 17.734375 44.78125 13.15625 C 44.027344 10.472656 42.511719 8.203125 40.1875 6.601563 C 37.40625 4.6875 34.269531 3.96875 31.199219 3.511719 C 29.40625 3.246094 27.601563 3.070313 25.789063 3.015625 C 25.335938 3.003906 24.882813 2.996094 24.425781 3 Z M 25.734375 5.015625 C 27.457031 5.0625 29.179688 5.230469 30.90625 5.488281 C 33.867188 5.929688 36.660156 6.601563 39.054688 8.25 C 40.996094 9.585938 42.207031 11.390625 42.855469 13.691406 C 44.050781 17.972656 44.203125 22.359375 43.800781 26.839844 C 43.570313 29.421875 42.957031 31.855469 41.828125 34.148438 C 40.832031 36.171875 39.277344 37.457031 37.191406 38.328125 C 34.769531 39.339844 32.136719 39.609375 29.363281 39.761719 C 27.238281 39.878906 25.109375 39.957031 22.980469 40 C 22.445313 40.011719 21.921875 40.152344 21.550781 40.425781 C 21.179688 40.699219 21.011719 40.953125 20.78125 41.203125 C 19.609375 42.484375 17.273438 44.738281 16 45.972656 C 15.992188 44.480469 15.980469 42.675781 16 41.011719 C 16.007813 40.5 15.890625 39.976563 15.597656 39.5625 C 15.304688 39.148438 14.902344 38.898438 14.515625 38.71875 C 13.386719 38.195313 11.910156 37.796875 11.269531 37.394531 C 9.03125 35.988281 7.761719 33.878906 7.007813 31.253906 C 6.019531 27.820313 5.832031 24.285156 6.125 20.6875 C 6.28125 18.820313 6.550781 16.949219 6.890625 15.09375 C 7.601563 11.183594 9.835938 8.722656 13.390625 7.089844 C 15.636719 6.058594 18.035156 5.550781 20.5625 5.242188 C 22.285156 5.03125 24.007813 4.964844 25.734375 5.015625 Z M 26.15625 10 C 25.332031 10 24.53125 10.09375 23.753906 10.265625 C 23.21875 10.390625 22.878906 10.925781 23 11.464844 C 23.121094 12.003906 23.660156 12.339844 24.199219 12.21875 C 24.828125 12.074219 25.484375 12 26.15625 12 C 31.039063 12 34.976563 15.9375 34.976563 20.816406 C 34.976563 21.492188 34.902344 22.148438 34.757813 22.78125 C 34.636719 23.316406 34.972656 23.855469 35.511719 23.976563 C 36.050781 24.097656 36.585938 23.757813 36.707031 23.21875 C 36.882813 22.445313 36.976563 21.644531 36.976563 20.816406 C 36.976563 14.855469 32.121094 10 26.15625 10 Z M 16.179688 12.003906 C 16.015625 11.996094 15.847656 12.007813 15.671875 12.046875 C 13.855469 12.449219 12.050781 13.765625 12 16.117188 C 12.050781 16.445313 12.046875 16.796875 12.167969 17.09375 C 12.761719 18.546875 13.277344 20.046875 14.019531 21.421875 C 17.632813 28.101563 23.097656 32.746094 30.0625 35.695313 C 30.894531 36.046875 31.753906 36.121094 32.59375 35.769531 C 33.75 35.289063 34.730469 34.546875 35.382813 33.480469 C 36.277344 32.015625 36.289063 31 34.816406 29.917969 C 33.851563 29.207031 32.902344 28.476563 31.925781 27.78125 C 30.4375 26.726563 28.828125 26.542969 27.71875 28.394531 C 27.660156 28.488281 27.574219 28.566406 27.5 28.644531 C 26.929688 29.25 26.230469 29.398438 25.488281 29.09375 C 22.671875 27.933594 20.496094 26.0625 19.183594 23.277344 C 18.410156 21.640625 18.621094 20.820313 20.066406 19.730469 C 20.210938 19.625 20.347656 19.511719 20.480469 19.390625 C 21.113281 18.8125 21.28125 18.125 20.90625 17.347656 C 20.058594 15.574219 18.929688 13.992188 17.5 12.628906 C 17.113281 12.261719 16.671875 12.03125 16.179688 12.003906 Z M 26.140625 13 C 25.699219 13 25.261719 13.035156 24.832031 13.109375 C 24.46875 13.15625 24.160156 13.398438 24.027344 13.738281 C 23.894531 14.082031 23.960938 14.46875 24.195313 14.75 C 24.433594 15.027344 24.808594 15.15625 25.167969 15.078125 C 25.480469 15.027344 25.808594 15 26.140625 15 C 29.390625 15 32 17.609375 32 20.859375 C 32 21.191406 31.972656 21.519531 31.921875 21.832031 C 31.84375 22.191406 31.972656 22.566406 32.25 22.804688 C 32.53125 23.039063 32.917969 23.105469 33.261719 22.972656 C 33.601563 22.839844 33.84375 22.53125 33.890625 22.167969 C 33.964844 21.738281 34 21.300781 34 20.859375 C 34 16.53125 30.46875 13 26.140625 13 Z M 26 16 C 25.640625 15.996094 25.304688 16.183594 25.121094 16.496094 C 24.941406 16.808594 24.941406 17.191406 25.121094 17.503906 C 25.304688 17.816406 25.640625 18.003906 26 18 C 27.667969 18 29 19.332031 29 21 C 28.996094 21.359375 29.183594 21.695313 29.496094 21.878906 C 29.808594 22.058594 30.191406 22.058594 30.503906 21.878906 C 30.816406 21.695313 31.003906 21.359375 31 21 C 31 18.25 28.75 16 26 16 Z" />
                    </svg>
                    Написать в вайбер
                    </button>
                    <button className={s.catalog}>Запросить звонок</button>
                </div>
            </div>
        </div>
    )
}