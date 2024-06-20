import s from "./Reviews.module.scss";
import TextWithLines from "../TextWithLines/TextWithLines";
import {Play} from "./Svgs";
import ReviewModal from "../Modals/ReviewModal/ReviewModal";
import {useState} from "react";
import video1 from '../../assets/video1.jpg'
import video2 from '../../assets/video2.png'
import yandex from '../../assets/Yandex.jpg'
import fivestars from '../../assets/5-zvezd.png'
import image10 from '../../assets/image10.png'
import image11 from '../../assets/image10.png'
import google from '../../assets/google.png'



export const Reviews = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ReviewModal open={open} setOpen={setOpen}/>
            <div className={s.Reviews}>

                <TextWithLines text="ЭМОЦИИ КЛИЕНТОВ"/>
                <p className={s.emotion}>
                    Зарядитесь эмоциями клиентов или поделитесь своими впечатлениями!
                </p>
                <div className={s.blocks}>
                    <div className={s.videos}>
                        <div
                            className={s.video}
                            style={{
                                backgroundImage:
                                    `url(${video1})`,
                            }}
                        >
                            <div onClick={() => setOpen(true)}>
                                <Play/>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundImage: `url(${video2})`,
                            }}
                            className={s.video}
                        >
                            <div onClick={() => setOpen(true)}>
                                <Play />
                            </div>
                        </div>
                    </div>
                    <div className={s.ReviewsBlocks}>
                        <div className={s.block}>
                            <div className={s.top}>
                                <div className={s.yandex}>
                                    <img src={yandex}/>
                                    <p>Рейтинг на Yandex</p>
                                </div>
                                <div className={s.mark}>
                                    <p className={s.markText}>4.7</p>
                                    <div>
                                        <img src={fivestars}/>
                                        <p className={s.count1}>11 отзывов</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={s.message}>
                                <img src={image10} alt={'/'}/>
                                <div>
                                    <h3>Катя Лобова</h3>
                                    <p>
                                        Заказывали салют "Королевский". Не пожалели, что выбрали
                                        именно его.
                                    </p>
                                </div>
                            </div>
                            <p className={s.more}>Еще отзывы...</p>
                        </div>
                        <div className={s.block}>
                            <div className={s.top}>
                                <div className={s.yandex}>
                                    <img src={google} alt={'/'}/>
                                    <p>Рейтинг на Yandex</p>
                                </div>
                                <div className={s.mark}>
                                    <p className={s.markText}>5.0</p>
                                    <div>
                                        <img src={fivestars}/>
                                        <p className={s.count1}>5 отзывов</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={s.message}>
                                <img src={image11}/>
                                <div>
                                    <h3>Пётр Громов</h3>
                                    <p>
                                        Ребята, вы всё знаете, какие салюты клёвые. Заранее подготовился к Новому году)
                                        Главное заранее не выстрелить) Благодарю за рекомендацию! +++
                                    </p>
                                </div>
                            </div>
                            <p className={s.more}>Еще отзывы...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
