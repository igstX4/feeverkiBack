import TextWithLines from '../TextWithLines/TextWithLines'
import s from './Security.module.scss'

export const Security = () => {
    return (
        <div className={s.securityWrapper}>
            <TextWithLines text={'ТЕХНИКА БЕЗОПАСНОСТИ'} />
            <p className={s.deskr}>Соблюдение правил - залог успешного запуска фейверка.</p>
            <div className={s.blocks}>
                <div className={s.block}>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span>Ознакомьтесь</span> с инструкцией по эксплуатации!
                        </h2>
                        <p>
                            Она есть на упаковке каждого
                            пиротехнического устройства,
                            от хлопушек, до батарей салютов.
                        </p>
                    </div>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span>Проверьте срок</span> годности
                            и состояние изделия!
                        </h2>
                        <p>
                            Он есть на упаковке каждого
                            пиротехнического устройства,
                            от хлопушек, до батарей салютов.
                        </p>
                    </div>

                </div>
                <div className={s.block}>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            Используйте фейерверки
                            только на <span>открытом воздухе</span>.
                        </h2>
                        <p>
                            Вдали от зданий, деревьев
                            и линий электропередач.
                        </p>
                    </div>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            Зажигайте фейерверк
                            на <span>вытянутой руке</span>!
                        </h2>
                        <p>
                            После поджигания удалитесь на
                            безопасное расстояние
                            от 20 до 30 метров.
                        </p>
                    </div>

                </div>
                <div className={s.block}>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span className={s.red}>Не запускайте </span>
                            фейерверк в руках!
                        </h2>
                        <p>
                            Запуск с рук допускается
                            только для изделий 1-ой
                            категории опасности.
                            (Хлопушки, бенгальские огни)
                        </p>
                    </div>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span className={s.red}>Не направляйте фейерверк</span>
                            в сторону людей!
                        </h2>
                        <p>
                            Выберите подходящее место
                            для запуска. Это должна быть
                            ровная площадка,
                            расположенная на безопасном
                            расстоянии от жилых домов.
                        </p>
                    </div>

                </div>
                <div className={s.block}>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span>Не наклоняйтесь</span>
                            над фейерверком!
                        </h2>
                        <p>
                            Даже после окончания его
                            работы или в случае
                            несрабатывания.
                        </p>
                    </div>
                    <div className={s.semiBlock}>
                        <h2 className={s.title}>
                            <span>Не забирайте</span> фейерверк
                            раньше времени
                        </h2>
                        <p>
                            Забрать отработавший фейерверк
                            можно через 15 мин. после
                            окончания работы.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}