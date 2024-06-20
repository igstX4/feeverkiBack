import React, {useState, useEffect} from 'react'
import logo1 from '../../assets/logo.png'
import s from './Header.module.scss'
import {Book, Search, Cart} from './Svgs'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from 'axios';
import instance from '../../axios/axios';
import image7 from '../../assets/image7.png'
import image8 from '../../assets/image8.png'


const HeaderResponsive = ({setModal}) => {
    const navigate = useNavigate()
    const [opened, setOpened] = useState(false)
    return (
        <div className={s.responsiveHeaderWrapper}>
            <div className={s.responsiveHeader}>
                <img onClick={setModal} src={image7} alt="menu" className={s.menu}/>
                <div>
                    <button onClick={() => setOpened((op) => !op)} className={s.search}><Search/></button>
                    <div className={`${s.searchModal} ${opened ? s.opened : ""}`}>
                        <div className={s.inputDiv}>
                            <input placeholder={"Поиск салютов"}/>
                            <button><Search/></button>
                        </div>
                    </div>
                </div>
                <svg
                    className={s.image2}
                    onClick={() => navigate('/')}
                    xmlns="http://www.w3.org/2000/svg"
                    width={992}
                    height={156}
                    viewBox="0 0 992 156"
                    fill="black"
                >
                    <path
                        d="M34.304 53.984V73.696H73.856V93.28H34.304V124H8.96V34.4H79.232V53.984H34.304ZM163.021 104.416V124H91.085V34.4H161.357V53.984H116.173V69.088H155.981V88.032H116.173V104.416H163.021ZM249.021 104.416V124H177.085V34.4H247.357V53.984H202.173V69.088H241.981V88.032H202.173V104.416H249.021ZM302.253 100.192H288.429V124H263.085V34.4H304.045C312.152 34.4 319.192 35.7653 325.165 38.496C331.138 41.1413 335.746 44.9813 338.989 50.016C342.232 54.9653 343.853 60.8107 343.853 67.552C343.853 74.0373 342.317 79.712 339.245 84.576C336.258 89.3547 331.949 93.1093 326.317 95.84L345.645 124H318.509L302.253 100.192ZM318.253 67.552C318.253 63.3707 316.93 60.128 314.285 57.824C311.64 55.52 307.714 54.368 302.509 54.368H288.429V80.608H302.509C307.714 80.608 311.64 79.4987 314.285 77.28C316.93 74.976 318.253 71.7333 318.253 67.552ZM448.715 34.4L410.315 124H385.355L347.083 34.4H374.475L398.795 92.768L423.627 34.4H448.715ZM525.896 104.416V124H453.96V34.4H524.232V53.984H479.048V69.088H518.856V88.032H479.048V104.416H525.896ZM579.128 100.192H565.304V124H539.96V34.4H580.92C589.027 34.4 596.067 35.7653 602.04 38.496C608.013 41.1413 612.621 44.9813 615.864 50.016C619.107 54.9653 620.728 60.8107 620.728 67.552C620.728 74.0373 619.192 79.712 616.12 84.576C613.133 89.3547 608.824 93.1093 603.192 95.84L622.52 124H595.384L579.128 100.192ZM595.128 67.552C595.128 63.3707 593.805 60.128 591.16 57.824C588.515 55.52 584.589 54.368 579.384 54.368H565.304V80.608H579.384C584.589 80.608 588.515 79.4987 591.16 77.28C593.805 74.976 595.128 71.7333 595.128 67.552ZM669.27 91.488L659.798 101.6V124H634.71V34.4H659.798V71.648L694.486 34.4H722.39L685.782 74.08L724.31 124H694.87L669.27 91.488Z"
                        fill="black"
                    />
                    <circle cx={763} cy={104} r={20} fill="#FA5A06" />
                    <path
                        d="M881.824 77.28C886.944 79.072 890.955 81.888 893.856 85.728C896.757 89.4827 898.208 94.048 898.208 99.424C898.208 107.275 895.051 113.333 888.736 117.6C882.421 121.867 873.291 124 861.344 124H812.96V34.4H858.784C870.219 34.4 878.923 36.5333 884.896 40.8C890.869 44.9813 893.856 50.656 893.856 57.824C893.856 62.0907 892.789 65.9307 890.656 69.344C888.608 72.672 885.664 75.3173 881.824 77.28ZM838.048 52.704V69.984H855.456C863.989 69.984 868.256 67.0827 868.256 61.28C868.256 55.5627 863.989 52.704 855.456 52.704H838.048ZM859.296 105.696C868.171 105.696 872.608 102.667 872.608 96.608C872.608 90.5493 868.171 87.52 859.296 87.52H838.048V105.696H859.296ZM957.46 91.872V124H932.116V91.488L897.94 34.4H924.692L945.94 69.984L967.188 34.4H991.764L957.46 91.872Z"
                        fill="black"
                    />
                </svg> 
                <img src={image8} className={s.image} alt={"logo"} onClick={() => navigate('/')}/>

            </div>
        </div>
    )
}


const Header = ({setModal, setFilter}) => {
    const [catalogOpened, setCatalog] = useState(false)
    const navigate = useNavigate()
    const state = useSelector(state => state.basket)
    const [categories, setCategories] = useState()
    const getCategories = async() => {
        try {
            const {data} = await instance.get('/getAllCategories')
            if (data) {
                setCategories(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    console.log(categories)
    const handleFilter = (min, max) => {
        if (setFilter) {
            setFilter(min, max)
        }
    }
    return (
       <>
           <div className={s.headerWrapper}>
               <div className={s.headerDiv}>
               <svg
                    className={s.imgae2}
                    onClick={() => navigate('/')}
                    xmlns="http://www.w3.org/2000/svg"
                    width={992}
                    height={156}
                    viewBox="0 0 992 156"
                    fill="black"
                >
                    <path
                        d="M34.304 53.984V73.696H73.856V93.28H34.304V124H8.96V34.4H79.232V53.984H34.304ZM163.021 104.416V124H91.085V34.4H161.357V53.984H116.173V69.088H155.981V88.032H116.173V104.416H163.021ZM249.021 104.416V124H177.085V34.4H247.357V53.984H202.173V69.088H241.981V88.032H202.173V104.416H249.021ZM302.253 100.192H288.429V124H263.085V34.4H304.045C312.152 34.4 319.192 35.7653 325.165 38.496C331.138 41.1413 335.746 44.9813 338.989 50.016C342.232 54.9653 343.853 60.8107 343.853 67.552C343.853 74.0373 342.317 79.712 339.245 84.576C336.258 89.3547 331.949 93.1093 326.317 95.84L345.645 124H318.509L302.253 100.192ZM318.253 67.552C318.253 63.3707 316.93 60.128 314.285 57.824C311.64 55.52 307.714 54.368 302.509 54.368H288.429V80.608H302.509C307.714 80.608 311.64 79.4987 314.285 77.28C316.93 74.976 318.253 71.7333 318.253 67.552ZM448.715 34.4L410.315 124H385.355L347.083 34.4H374.475L398.795 92.768L423.627 34.4H448.715ZM525.896 104.416V124H453.96V34.4H524.232V53.984H479.048V69.088H518.856V88.032H479.048V104.416H525.896ZM579.128 100.192H565.304V124H539.96V34.4H580.92C589.027 34.4 596.067 35.7653 602.04 38.496C608.013 41.1413 612.621 44.9813 615.864 50.016C619.107 54.9653 620.728 60.8107 620.728 67.552C620.728 74.0373 619.192 79.712 616.12 84.576C613.133 89.3547 608.824 93.1093 603.192 95.84L622.52 124H595.384L579.128 100.192ZM595.128 67.552C595.128 63.3707 593.805 60.128 591.16 57.824C588.515 55.52 584.589 54.368 579.384 54.368H565.304V80.608H579.384C584.589 80.608 588.515 79.4987 591.16 77.28C593.805 74.976 595.128 71.7333 595.128 67.552ZM669.27 91.488L659.798 101.6V124H634.71V34.4H659.798V71.648L694.486 34.4H722.39L685.782 74.08L724.31 124H694.87L669.27 91.488Z"
                        fill="black"
                    />
                    <circle cx={763} cy={104} r={20} fill="#FA5A06" />
                    <path
                        d="M881.824 77.28C886.944 79.072 890.955 81.888 893.856 85.728C896.757 89.4827 898.208 94.048 898.208 99.424C898.208 107.275 895.051 113.333 888.736 117.6C882.421 121.867 873.291 124 861.344 124H812.96V34.4H858.784C870.219 34.4 878.923 36.5333 884.896 40.8C890.869 44.9813 893.856 50.656 893.856 57.824C893.856 62.0907 892.789 65.9307 890.656 69.344C888.608 72.672 885.664 75.3173 881.824 77.28ZM838.048 52.704V69.984H855.456C863.989 69.984 868.256 67.0827 868.256 61.28C868.256 55.5627 863.989 52.704 855.456 52.704H838.048ZM859.296 105.696C868.171 105.696 872.608 102.667 872.608 96.608C872.608 90.5493 868.171 87.52 859.296 87.52H838.048V105.696H859.296ZM957.46 91.872V124H932.116V91.488L897.94 34.4H924.692L945.94 69.984L967.188 34.4H991.764L957.46 91.872Z"
                        fill="black"
                    />
                </svg> 
                   <div>
                       <button onClick={() => setCatalog((catalog) => !catalog)} className={s.catalog}><Book/>Каталог
                       </button>
                       <div className={`${s.catalogDiv} ${catalogOpened ? s.visible : s.hidden}`}>
                           <div className={s.miniArrow}></div>
                           <div className={s.miniModal}>
                               <div className={s.vertical}>
                                   <div className={s.infoDiv}>
                                       <h3>Салюты по цене:</h3>
                                       <p onClick={() => navigate('/catalog/super')}>ОТ 10000 ₽</p>
                                       <p onClick={() => navigate('/catalog/big')}>ОТ 3000 ДО 10000 ₽</p>
                                       <p onClick={() => navigate('/catalog/small')}>ДО 3000 ₽</p>
                                       <p onClick={() => navigate('/catalog/all')}>ВСЕ САЛЮТЫ</p>
                                   </div>
                                   <hr/>
                               </div>
                               <div className={s.vertical}>
                                   <div className={s.infoDiv}>
                                       <h3>По кол-ву залпов:</h3>
                                       <p onClick={() => handleFilter(0, 25)}>ДО 25 ЗАЛПОВ</p>
                                       <p onClick={() => handleFilter(25, 49)}>ОТ 25 ДО 49 ЗАЛПОВ</p>
                                       <p onClick={() => handleFilter(49, 100)}>ОТ 49 ДО 100 ЗАЛПОВ</p>
                                       <p onClick={() => handleFilter(100, 364)}>ОТ 100 ДО 364 ЗАЛПОВ</p>
                                   </div>
                               </div>
                               <div className={s.vertical + " " + s.lastOne}>
                                   <div className={s.infoDiv}>
                                       <h3>Актуальные</h3>
                                       {categories && categories.map((item) => <p onClick={() => navigate(`/category/${item.category}`)}>{item.category}</p>)}
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className={s.inputDiv}>
                       <input placeholder={"Поиск салютов"}/>
                       <button><Search/></button>
                   </div>
                   <h1 className={s.number}>8(812)987-78-51</h1>
                   <div className={s.cart} onClick={() => navigate("/basket")}>
                       <Cart/>
                       <p>Корзина ({state.length})</p>
                   </div>
                   <img onClick={setModal} src={image7} alt="menu" className={s.menu}/>
               </div>
           </div>
           <HeaderResponsive setModal={setModal}/>
       </>
    )
}

export default Header