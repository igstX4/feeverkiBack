import s from './SomeBtns.module.scss'
import delivery from '../../assets/delivery (1).png'
import skidka from '../../assets/skidka (1).png'
import bet from '../../assets/1xBet (1).png'
import csgocase from '../../assets/csgoCase (1).png'
import { Delivery, Discount, FireWork, Premium } from './Svgs'
import { useNavigate } from 'react-router-dom'
export const SomeBtns = () => {
    const navigate = useNavigate()
    return (
        <div className={s.SomeBtns}>
            <div className={s.infoBlocks}>
                <div className={s.block}>
                    <Delivery />
                    <p><span>Бесплатная</span> доставка от 100р Минск - Минский район.</p>
                </div>
                <div className={s.block}>
                    <FireWork />
                    <p><span>Выгоднее</span> чем в киосках и супермаркетах</p>
                </div>
                <div className={s.block}>
                    <Premium />
                    <p><span>Ваши 🧡 салюты!</span> Проверенных брендов</p>
                </div>
            </div>
            <p className={s.littleText}>Подборки салютов:</p>
            <div className={s.btns}>
                <button onClick={() => navigate('/catalog/all')} className={s.orangeBtn}>Хиты продаж</button>
                <button onClick={() => navigate('/catalog/big')} className={s.blueBtn}>Крупный калибр</button>
                <button onClick={() => navigate('/catalog/big')} className={s.pinkBtn}>От 100 залпов</button>
                <button onClick={() => navigate('/catalog/super')} className={s.darkBtn}>Элитные салюты</button>
            </div>
            <div className={s.btnsResponsible}>
                <div className={s.item}>
                    <button onClick={() => navigate('/catalog/all')} className={s.orangeBtn}>Хиты продаж</button>
                    <button onClick={() => navigate('/catalog/big')} className={s.blueBtn}>Крупный калибр</button>
                </div>
                <div className={s.item}>
                    <button onClick={() => navigate('/catalog/super')} className={s.pinkBtn}>От 100 залпов</button>
                    <button onClick={() => navigate('/catalog/super')} className={s.darkBtn}>Элитные салюты</button>
                </div>
            </div>
        </div>
    )
}