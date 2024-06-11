import React, {useState} from 'react';
import s from './Footer.module.scss'
import wts from "../../assets/Whatsapp.png";
import tg from "../../assets/Telegram.png";
import ig from "../../assets/Инстаграм.png";
import vk from "../../assets/Вконтакте.png";
import email from '../../assets/email.png'
import doc1 from '../../assets/doc-1.png'
import doc2 from '../../assets/doc-2.png'
import {PhotoProvider, PhotoView} from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const Footer = () => {

    return (
        <>
            <div className={s.hr}/>
            <div className={s.container}>
                <div className={s.contactsDiv}>
                    <div className={s.contacts}>
                        <div>
                            <h1>КОНТАКТЫ</h1>
                            <p>Для заказов: (круглосуточно)</p>
                            <div className={s.phones}>
                                <a href="tel:88129877850">8 (812) 987-78-50</a>
                                <a href="tel:88129877850">+7(996) 777-42-77</a>
                            </div>
                        </div>
                        <div className={s.line}/>
                        <div className={s.socialMedias}>
                            <p>Мессенджеры и соц. сети:</p>
                            <div className={s.icons}>
                                <img src={wts} alt='/'/>
                                <img src={tg} alt='/'/>
                                <img src={ig} alt='/'/>
                                <img src={vk} alt='/'/>
                            </div>
                            <p>Предложения и сотрудничество:</p>
                            <div className={s.emailContainer}>
                                <img className={s.img} src={email} alt={'/'}/>
                                <a href="mailto:kypitsalyt@yandex.ru">kypitsalyt@yandex.ru</a>
                            </div>
                        </div>
                        <div className={s.line}/>
                        <div className={s.catalogs}>
                            <p>Разделы сайта:</p>
                            <div className={s.items}>
                                <p>Каталог</p>
                                <p>Доставка и оплата</p>
                                <p>Акции</p>
                                <p>Сертификаты</p>
                                <p>Открыть франшизу</p>
                                <p>Техника безопасности</p>
                                <p>Контакты</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.deliveryPlace}>
                        <p>
                            <strong>Наш склад - пункт выдачи заказов:</strong><br/>
                            Санкт-Петербург, Шкиперский проток 14к6
                            ежедневно с 10:00 до 21:00.
                        </p>
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.title}>
                        <div className={s.line}></div>
                        <p>БЕЗ ОСЕЧЕК!</p>
                        <div className={s.line}></div>
                    </div>
                    <p className={s.someText}>
                        Вся продукция прошла контроль качества и сертифицирована.
                        <strong>
                            В случае брака, мы произведем замену или вернем деньги в день обращения!
                        </strong>
                    </p>
                    <div className={s.docs}>
                       <PhotoProvider>
                           <PhotoView src={doc1}><img src={doc1} alt={'doc'}/></PhotoView>
                           <PhotoView src={doc2}><img src={doc2} alt={'doc'}/></PhotoView>
                       </PhotoProvider>
                    </div>
                </div>

            </div>
            <div className={s.footerText}>
                <p>Продолжая использование сайта, вы даете согласие на использование сайтом cookies и обработку
                    персональных данных.</p><br/>
                <p>ИП Громов М.Б. | ИНН 761030104479 | ОГРН 322762700010477</p>
            </div>
        </>
    );
};

export default Footer;
