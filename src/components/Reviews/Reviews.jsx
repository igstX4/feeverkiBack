import s from "./Reviews.module.scss";
import TextWithLines from "../TextWithLines/TextWithLines";
import {Play} from "./Svgs";
import ReviewModal from "../Modals/ReviewModal/ReviewModal";
import {useState} from "react";

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
                                    "url(https://i.ibb.co/rvqcyVM/screenshot-20211207-225441-video-player.jpg)",
                            }}
                        >
                            <div onClick={() => setOpen(true)}>
                                <Play/>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundImage: "url(https://i.ibb.co/px7FjXh/screenshot-6.png)",
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
                                    <img src={"https://i.ibb.co/SQp91H3/Yandex.jpg"}/>
                                    <p>Рейтинг на Yandex</p>
                                </div>
                                <div className={s.mark}>
                                    <p className={s.markText}>4.7</p>
                                    <div>
                                        <img src="https://i.ibb.co/T49t6Vw/5-zvezd.png"/>
                                        <p className={s.count1}>11 отзывов</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={s.message}>
                                <img src="https://i.ibb.co/mbRFZBq/screenshot-7.png" alt={'/'}/>
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
                                    <img src={"https://i.ibb.co/x5KdXLF/google.png"} alt={'/'}/>
                                    <p>Рейтинг на Yandex</p>
                                </div>
                                <div className={s.mark}>
                                    <p className={s.markText}>5.0</p>
                                    <div>
                                        <img src="https://i.ibb.co/9hwV6Dd/5-zvezd-1.png"/>
                                        <p className={s.count1}>5 отзывов</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className={s.message}>
                                <img src="https://i.ibb.co/cwKjgQ2/unnamed.png"/>
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
