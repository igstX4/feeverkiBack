import s from './SomeBtns.module.scss'
import delivery from '../../assets/delivery (1).png'
import skidka from '../../assets/skidka (1).png'
import bet from '../../assets/1xBet (1).png'
import csgocase from '../../assets/csgoCase (1).png'
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
                    <img src={delivery} alt='delivery' />
                    <p><span>Бесплатная</span> доставка по СПБ от <b>3 000 ₽</b></p>
                </div>
                <div className={s.block}>
                    <img src={skidka} alt='delivery' />
                    <p><span>Скидка 30%</span> на второй салют в заказе!</p>
                </div>
                <div className={s.block}>
                    <img src={bet} alt='delivery' />
                    <p><span>Выгоднее</span> чем в киосках и супермаркетах</p>
                </div>
                <div className={s.block}>
                    <img src={csgocase} alt='delivery' />
                    <p><span>Ваши 🧡 салюты!</span> Проверенных брендов</p>
                </div>
            </div>
        </div>
    )
}