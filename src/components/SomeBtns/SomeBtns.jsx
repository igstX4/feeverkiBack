import s from './SomeBtns.module.scss'

export const SomeBtns = () => {
    return (
        <div className={s.SomeBtns}>
            <p className={s.littleText}>Подборки салютов:</p>
            <div className={s.btns}>
                <button className={s.orangeBtn}>Хиты продаж</button>
                <button className={s.blueBtn}>Крупный калибр</button>
                <button className={s.pinkBtn}>От 100 залпов</button>
                <button className={s.darkBtn}>Элитные салюты</button>
            </div>
            <div className={s.btnsResponsible}>
                <div className={s.item}>
                    <button className={s.orangeBtn}>Хиты продаж</button>
                    <button className={s.blueBtn}>Крупный калибр</button>
                </div>
                <div className={s.item}>
                    <button className={s.pinkBtn}>От 100 залпов</button>
                    <button className={s.darkBtn}>Элитные салюты</button>
                </div>
            </div>
            <div className={s.line} />
            <div className={s.infoBlocks}>
                <div className={s.block}>
                    <img src={"https://i.ibb.co/HD2PQkv/delivery.png"} alt='delivery' />
                    <p><span>Бесплатная</span> доставка по СПБ от <b>3 000 ₽</b></p>
                </div>
                <div className={s.block}>
                    <img src={"https://i.ibb.co/NFp1M77/skidka.png"} alt='delivery' />
                    <p><span>Скидка 30%</span> на второй салют в заказе!</p>
                </div>
                <div className={s.block}>
                    <img src={"https://i.ibb.co/K77vfbC/1xBet.png"} alt='delivery' />
                    <p><span>Выгоднее</span> чем в киосках и супермаркетах</p>
                </div>
                <div className={s.block}>
                    <img src={"https://i.ibb.co/Scz4sSq/csgoCase.png"} alt='delivery' />
                    <p><span>Ваши 🧡 салюты!</span> Проверенных брендов</p>
                </div>
            </div>
        </div>
    )
}