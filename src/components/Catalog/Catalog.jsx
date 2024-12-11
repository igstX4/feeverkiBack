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
import { useNavigate } from "react-router-dom";

export const Catalog = () => {
    const navigate = useNavigate()

    const categories = {
        salutes: [
            {
                path: '/catalog/all',
                image: allsalytes,
                title: 'ВCЕ САЛЮТЫ',
                description: 'ОТ 7 ДО 364 ЗАЛПОВ'
            },
            {
                path: '/catalog/super',
                image: salyt2,
                title: 'СУПЕР САЛЮТЫ',
                description: 'ОТ 500 BYN'
            },
            {
                path: '/catalog/big',
                image: zalp,
                title: 'БОЛЬШИЕ САЛЮТЫ',
                description: 'ОТ 200 ДО 500 BYN'
            },
            {
                path: '/catalog/small',
                image: miniSalyt,
                title: 'МАЛЫЕ САЛЮТЫ',
                description: 'ДО 199 BYN'
            }
        ],
        other: [
            {
                path: '/category/Фонтаны. Дымы.',
                image: image1,
                title: 'Фонтаны'
            },
            {
                path: '/category/Рим свечи',
                image: image2,
                title: 'Рим. свечи'
            },
            {
                path: '/category/Бенгальские огни',
                image: image3,
                title: 'Бенгал. огни'
            },
            {
                path: '/category/Хлопушки',
                image: image4,
                title: 'Хлопушки'
            },
            {
                path: '/category/Петарды',
                image: image5,
                title: 'Петарды'
            },
            {
                path: '/category/Ракеты. Летающие шутихи.',
                image: image6,
                title: 'Ракеты'
            }
        ]
    };

    const handleNavigate = (path) => {
        navigate(path);
        window.scroll({ top: 0 });
    };

    return (
        <div className={s.catalog}>
            <div className={s.catalogText}>
                <TextWithLines text={"Каталог"} />
            </div>
            <div className={s.topItems}>
                <div className={s.item1488}>
                    {categories.salutes.slice(0, 2).map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleNavigate(item.path)} 
                            className={s.item}
                        >
                            <img src={item.image} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className={s.item1488}>
                    {categories.salutes.slice(2, 4).map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleNavigate(item.path)} 
                            className={s.item}
                        >
                            <img src={item.image} alt={item.title} />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.littleItems}>
                {[0, 2, 4].map(startIndex => (
                    <div key={startIndex} className={s.item1488}>
                        {categories.other.slice(startIndex, startIndex + 2).map((item, index) => (
                            <div 
                                key={index}
                                onClick={() => handleNavigate(item.path)} 
                                className={s.item}
                            >
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}