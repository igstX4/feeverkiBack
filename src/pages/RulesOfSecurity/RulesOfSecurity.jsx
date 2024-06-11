import style from './RulesOfSecurity.module.scss'
import Layout from "../../Layouts/Layout";
import TextWithLines from "../../components/TextWithLines/TextWithLines";

const RulesOfSecurity = () => {
    return (
        <Layout>
            <div className={style.securityContainer}>
                <div className={style.headerSecurity}>
                    <TextWithLines text={"ТЕХНИКА БЕЗОПАСНОСТИ"}/>
                    <h2 className={style.descr}>Соблюдение правил - залог успешного запуска фейерверка.</h2>
                </div>
                <div className={style.rules}>
                    <div className={style.item}>
                        <p>
                            <span>Ознакомьтесь с инструкцией по эксплуатации!</span>
                            <div>
                                Она есть на упаковке каждого пиротехнического устройства, от хлопушек, до батарей
                                салютов.
                            </div>
                        </p>
                        <div className={style.secondBlock}>
                            <h4>Проверьте срок годности и состояние изделия!</h4>
                            <p>Убедитесь, что на упаковке нет механических повреждений.</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <strong style={{fontSize: "14px"}}>Подберите место для запуска</strong>
                        <p>
                            <span>Используйте фейерверки только на открытом воздухе.</span>
                            <div>
                                Вдали от зданий, деревьев и линий электропередач.
                            </div>
                        </p>
                        <div className={style.secondBlock}>
                            <h4>Зажигайте фейерверк на вытянутой руке!</h4>
                            <p>После поджигания удалитесь на безопасное расстояние от 20 до 30 метров.</p>
                        </div>
                    </div>
                    <div className={style.item}>
                        <p className={style.warning}>Не запускайте фейерверк в руках!</p>
                        <div className={style.secondBlock}>
                            <p>Запуск с рук допускается только для изделий 1-ой категории опасности. (Хлопушки,
                                бенгальские огни)</p>
                        </div>
                        <p className={style.warning}>Не направляйте фейерверк в сторону людей!</p>
                    </div>
                    <div className={style.item}>
                        <p className={style.warning}>Не наклоняйтесь над фейерверком!</p>
                        <div className={style.secondBlock}>
                            <p>Даже после окончания его работы или в случае несрабатывания.</p>
                        </div>
                        <p>Забрать отработавший фейерверк <span className={style.green}>можно через 15 мин.</span> после
                            окончания работы.</p>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default RulesOfSecurity;
