import React from 'react';
import s from "../../components/Footer/Footer.module.scss";
import wts from "../../assets/Whatsapp.png";
import tg from "../../assets/Telegram.png";
import ig from "../../assets/Инстаграм.png";
import vk from "../../assets/Вконтакте.png";
import Header from "../../components/Header/Header";

const Contacts = () => {
    return (
        <>
            <Header />
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
                                <svg
                                    className="svgicon css286"
                                    preserveAspectRatio="xMidYMid meet"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -3 24 24"
                                    style={{borderRadius: "50%"}}
                                >
                                    <rect
                                        x={0}
                                        y={-3}
                                        width={24}
                                        height={24}
                                        style={{fill: "none"}}
                                        rx={12}
                                        ry={12}
                                    />
                                    <g
                                        transform="scale(0.6) translate(8.000000000000002, 8.000000000000002)"
                                        transform-origin="0 -3"
                                    >
                                        <defs/>
                                        <title>email_marketing</title>
                                        <g id="Слой_2" data-name="Слой 2">
                                            <g id="Icons">
                                                <path
                                                    id="Email_marketing"
                                                    data-name="Email marketing"
                                                    className="cls-1"
                                                    d="M21,0H3A3,3,0,0,0,0,3V8A1,1,0,0,0,1,9H5a1,1,0,0,1,0,2H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H3a1,1,0,0,1,0,2H1.27a1,1,0,0,0-.9,1.45A3,3,0,0,0,3,18H21a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0Zm.64,3.88-7.72,6.42a3,3,0,0,1-3.84,0L2.36,3.88A1,1,0,0,1,3.64,2.35l7.72,6.42a1,1,0,0,0,1.28,0l7.72-6.42a1,1,0,0,1,1.28,1.54Z"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
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

export default Contacts;
