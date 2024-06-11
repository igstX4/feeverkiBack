import s from './Discount.module.scss'
import TextWithLines from '../TextWithLines/TextWithLines'
export const Discounts = () => {
    return (
        <div className={s.discounts}>
            <TextWithLines text={"СКИДКИ И АКЦИИ"} />
            <div className={s.blocks}>
                <div className={s.discountBlock}>
                    <div>
                        <h1>СКИДКА <span>30%</span> НА 2-й САЛЮТ В ЗАКАЗЕ</h1>
                        <p>Второй салют такой же или меньшей стоимостью, <b>со скидкой 30%!</b></p>
                    </div>
                    <img src="https://i.ibb.co/fCGjb5G/discount.png" alt='img'/>
                </div>
                <div className={s.discountBlock}>
                    <div>
                        <h1>ПОДАРКИ В <span>КАЖДЫЙ</span> ЗАКАЗ</h1>
                        <p>Получите 3 упаковки бенгальских огней и 3 хлопушки в подарок!</p>
                    </div>
                    <img src="https://i.ibb.co/T0KRWMZ/presents.png" alt='img'/>
                </div>
            </div>
        </div>
    )
}