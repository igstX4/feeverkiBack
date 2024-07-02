import React, { useState } from 'react';
import s from './Footer.module.scss'
import wts from "../../assets/Whatsapp.png";
import tg from "../../assets/Telegram.png";
import ig from "../../assets/Инстаграм.png";
import vk from "../../assets/Вконтакте.png";
import email from '../../assets/mail_1.png'
import doc1 from '../../assets/doc-1.png'
import doc2 from '../../assets/doc-2.png'
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const Footer = () => {

    return (
        <>

            <div className={s.hr} />
            <div className={s.container}>
               
                <div className={s.map}>
                    <iframe
                        className={s.iframe}
                        title='map1'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306.06478131609094!2d28.145101191838283!3d53.511769252294656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d9f5086e805af9%3A0x8faf5fab241ff523!2z0KHQvtCy0LXRgtGB0LrQsNGPINGD0LsuIDUsINCc0LDRgNGM0LjQvdCwINCT0L7RgNC60LAsINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQkdC10LvQsNGA0YPRgdGM!5e0!3m2!1sru!2sua!4v1719910810261!5m2!1sru!2sua"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <iframe
                        className={s.iframe}
                        title='map2'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.008084941616!2d28.161600076993462!3d53.5040509723355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d9f5b044b52ff3%3A0x150021ab40e356a8!2z0YPQuy4g0J3QvtCy0LDRjyDQl9Cw0YDRjyAzNCwg0JzQsNGA0YzQuNC90LAg0JPQvtGA0LrQsCwg0JzQuNC90YHQutCw0Y8g0L7QsdC70LDRgdGC0YwgMjIyODExLCDQkdC10LvQsNGA0YPRgdGM!5e0!3m2!1sru!2sua!4v1719655983598!5m2!1sru!2sua"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* <div className={s.contactsDiv}>
                    <div className={s.contacts}>
                        <div>
                            <h1>КОНТАКТЫ</h1>
                            <p>Для заказов: (круглосуточно)</p>
                            <div className={s.phones}>
                                <a href="tel:88129877850">8 (812) 987-78-50</a>
                                <a href="tel:88129877850">+7(996) 777-42-77</a>
                            </div>
                        </div>
                        <div className={s.line} />
                        <div className={s.socialMedias}>
                            <p>Мессенджеры и соц. сети:</p>
                            <div className={s.icons}>
                                <img src={wts} alt='/' />
                                <div style={{display: 'flex'}}>
                                    <img src={tg} alt='/' />
                                    <img src={ig} alt='/' />
                                    <img src={vk} alt='/' />
                                </div>
                            </div>
                            <p>Предложения и сотрудничество:</p>
                            <div className={s.emailContainer}>
                                <img className={s.img} src={email} alt={'/'} />
                                <a href="mailto:kypitsalyt@yandex.ru">kypitsalyt@yandex.ru</a>
                            </div>
                        </div>
                        <div className={s.line} />
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

                </div> */}
                {/* <div className={s.info}>
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
                            <PhotoView src={doc1}><img src={doc1} alt={'doc'} /></PhotoView>
                            <PhotoView src={doc2}><img src={doc2} alt={'doc'} /></PhotoView>
                        </PhotoProvider>
                    </div>
                </div> */}

            </div>
            <div className={s.footerText}>
                <p>Продолжая использование сайта, вы даете согласие на использование сайтом cookies и обработку
                    персональных данных.</p><br />
                <p>ИП Громов М.Б. | ИНН 761030104479 | ОГРН 322762700010477</p>
            </div>
        </>
    );
};

export default Footer;
