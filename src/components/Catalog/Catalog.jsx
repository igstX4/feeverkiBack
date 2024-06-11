import TextWithLines from "../TextWithLines/TextWithLines";
import s from './Catalog.module.scss'


export const Catalog = () => {

    return (
        <div className={s.catalog}>
            <div className={s.catalogText}>
                <TextWithLines text={"Каталог"} />
            </div>
            <div className={s.topItems}>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/nsjgzLB/allsalytes.png"} alt={"item"} />
                        <h2>ВCЕ САЛЮТЫ</h2>
                        <p>ОТ 7 ДО 364 ЗАЛПОВ</p>
                    </div>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/HFYDkgP/salyt2.png"} alt={"item"} />
                        <h2>СУПЕР САЛЮТЫ</h2>
                        <p>ОТ 10 000₽</p>
                    </div>
                </div>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/y6jsFLJ/36zalp.png"} alt={"item"} />
                        <h2>БОЛЬШИЕ САЛЮТЫ</h2>
                        <p>ОТ 3 000 ДО 10 000 ₽</p>
                    </div>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/XFDggb5/mini-Salyt.png"} alt={"item"} />
                        <h2>МАЛЫЕ САЛЮТЫ</h2>
                        <p>ДО 3 000 ₽</p>
                    </div>
                </div>
            </div>
            <div className={s.littleItems}>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/0KmKnZ4/image.png"} alt={"item2"} />
                        <h3>Фонтаны</h3>
                    </div>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/RvF0fxD/image.png"} alt={"item2"} />
                        <h3>Рим. свечи</h3>
                    </div>
                </div>

                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/GsrshYz/image.png"} alt={"item2"} />
                        <h3>Бенгал. огни</h3>
                    </div>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/KLy625H/image.png"} alt={"item2"} />
                        <h3>Хлопушки</h3>
                    </div>
                </div>
                <div className={s.item1488}>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/ZYwP25X/image.png"} alt={"item2"} />
                        <h3>Петарды</h3>
                    </div>
                    <div className={s.item}>
                        <img src={"https://i.ibb.co/R6fMsqL/image.png"} alt={"item2"} />
                        <h3>Ракеты</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}