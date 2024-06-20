import TextWithLines from "../TextWithLines/TextWithLines";
import s from './Catalog.module.scss'
import allsalytes from '../../assets/allsalytes.png'
import zalp from '../../assets/36zalp.png'
import salyt2 from '../../assets/salyt2.png'
import miniSalyt from '../../assets/mini-Salyt.png'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'
import image4 from '../../assets/image4.png'
import image5 from '../../assets/image5.png'
import image6 from '../../assets/image6.png'

export const Catalog = () => {

    return (
        <div className={s.catalog}>
            <div className={s.catalogText}>
                <TextWithLines text={"Каталог"} />
            </div>
            <div className={s.topItems}>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={allsalytes} alt={"item"} />
                        <h2>ВCЕ САЛЮТЫ</h2>
                        <p>ОТ 7 ДО 364 ЗАЛПОВ</p>
                    </div>
                    <div className={s.item}>
                        <img src={salyt2} alt={"item"} />
                        <h2>СУПЕР САЛЮТЫ</h2>
                        <p>ОТ 10 000₽</p>
                    </div>
                </div>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={zalp} alt={"item"} />
                        <h2>БОЛЬШИЕ САЛЮТЫ</h2>
                        <p>ОТ 3 000 ДО 10 000 ₽</p>
                    </div>
                    <div className={s.item}>
                        <img src={miniSalyt} alt={"item"} />
                        <h2>МАЛЫЕ САЛЮТЫ</h2>
                        <p>ДО 3 000 ₽</p>
                    </div>
                </div>
            </div>
            <div className={s.littleItems}>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={image1} alt={"item2"} />
                        <h3>Фонтаны</h3>
                    </div>
                    <div className={s.item}>
                        <img src={image2} alt={"item2"} />
                        <h3>Рим. свечи</h3>
                    </div>
                </div>

                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={image3} alt={"item2"} />
                        <h3>Бенгал. огни</h3>
                    </div>
                    <div className={s.item}>
                        <img src={image4} alt={"item2"} />
                        <h3>Хлопушки</h3>
                    </div>
                </div>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={image5} alt={"item2"} />
                        <h3>Петарды</h3>
                    </div>
                    <div className={s.item}>
                        <img src={image6} alt={"item2"} />
                        <h3>Ракеты</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}