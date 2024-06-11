import React from "react";
import TextWithLines from "../TextWithLines/TextWithLines";
import style from "./DeliveryHome.module.scss";
import O from "../../assets/0₽.png";
import dostavka from "../../assets/Время-доставки.png";
import logistika from "../../assets/Логистика.png";
import samovivoz from "../../assets/Самовывоз.png";
import oplata from "../../assets/Оплата.png";

const DeliveryHome = () => {
  return (
    <div className={style.container}>
      <TextWithLines text={"ДОСТАВКА И ОПЛАТА"} />
      <div className={style.infoContainer}>
      <div className={style.freeDelivery + " " + style.responsible}>
            <p>Бесплатная доставка по СПБ от 3000 р</p>
          </div>
        <div className={style.leftContainer}>
          <h2>По Санкт-Петербургу в пределах КАД</h2>
          <div className={style.delivery}>
            <img src={O} alt="/" />
            <div className={style.infoDiv}>
              <p style={{ fontWeight: "bold" }}>
                Заказы от 3 000 ₽ - <span>доставка бесплатно.</span>
              </p>
              <p style={{ fontWeight: "bold" }}>Заказы до 3 000 ₽ - 400 ₽</p>
            </div>
          </div>
          <div className={style.delivery}>
            <img src={O} alt="/" />
            <div className={style.infoDiv}>
              <p style={{ fontWeight: "bold" }}>
                Заказы до 12:00 доставим в этот же день.
              </p>
              <p>
                Доставка заказов сделанных после 12:00 на след. день в любое
                удобное время.
              </p>
            </div>
          </div>
          <h2>За пределы КАД и по Лен. Обл.</h2>
          <div className={style.delivery + " " + style.hide}>
            <img src={logistika} alt="/" />
            <div className={style.infoDiv}>
              <p>При заказе от 10000 ₽ - бесплатно</p>
              <p>
                При заказе до 10000 ₽ - стоимость доставки 30 ₽/км. Доставка на
                след. день.
              </p>
            </div>
          </div>
        </div>
        <div className={style.line} />
        <div className={style.rightContainer}>
        <div className={style.delivery + " " + style.responsibleDiv}>
            <img src={logistika} alt="/" />
            <div className={style.infoDiv}>
              <p>При заказе от 10000 ₽ - бесплатно</p>
              <p>
                При заказе до 10000 ₽ - стоимость доставки 30 ₽/км. Доставка на
                след. день.
              </p>
            </div>
          </div>
          <div className={style.delivery + " " + style.margin}>
            <img src={samovivoz} alt="/" />
            <div className={style.infoDiv}>
              <p>
                <b>Забрать свой заказ самостоятельно можно по адресу:</b> СПб,
                Шкиперский проток 14к6, ежедневно с 10:00 до 20:00.
              </p>
              <p>
                При заказе до 10000 ₽ - стоимость доставки 30 ₽/км. Доставка на
                след. день.
              </p>
            </div>
          </div>
          <div className={style.freeDelivery}>
            <p>Бесплатная доставка по СПБ от 3000 р</p>
          </div>
          <h2 className={style.margin}>Способы оплаты</h2>
          <div className={style.delivery + " " + style.margin}>
            <img src={oplata} alt="/" />
            <div className={style.infoDiv}>
              <p>
              <b>Оплатить заказ можно при получении картой или наличными.</b> Для юр. лиц есть возможность оплаты от организации.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHome;
