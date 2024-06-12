import React, {useState, useEffect} from 'react'
import logo1 from '../../assets/logo.png'
import s from './Header.module.scss'
import {Book, Search, Cart} from './Svgs'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from 'axios';
import instance from '../../axios/axios';


const HeaderResponsive = ({setModal}) => {
    const navigate = useNavigate()
    const [opened, setOpened] = useState(false)
    return (
        <div className={s.responsiveHeaderWrapper}>
            <div className={s.responsiveHeader}>
                <img onClick={setModal} src={"https://i.ibb.co/Sr9DGwd/image.png"} alt="menu" className={s.menu}/>
                <div>
                    <button onClick={() => setOpened((op) => !op)} className={s.search}><Search/></button>
                    <div className={`${s.searchModal} ${opened ? s.opened : ""}`}>
                        <div className={s.inputDiv}>
                            <input placeholder={"Поиск салютов"}/>
                            <button><Search/></button>
                        </div>
                    </div>
                </div>
                <img src={'https://i.ibb.co/LhWHCrW/ulufmh1r1ib88n4fi8xg.png'} className={s.image2} alt={"logo"} onClick={() => navigate('/')}/>
                <img src={'https://i.ibb.co/dt7qwSt/image.png'} className={s.image} alt={"logo"} onClick={() => navigate('/')}/>

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
                   <img src={'https://i.ibb.co/LhWHCrW/ulufmh1r1ib88n4fi8xg.png'} className={s.image} alt={"logo"} onClick={() => navigate('/')}/>
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
                                       <p onClick={() => {
                                        handleFilter(0, 25)
                                        navigate('/catalog/all')
                                        }}>ДО 25 ЗАЛПОВ</p>
                                       <p onClick={() => {
                                        handleFilter(25, 49)
                                        navigate('/catalog/all')
                                        }}>ОТ 25 ДО 49 ЗАЛПОВ</p>
                                       <p onClick={() => {
                                        handleFilter(49, 100)
                                        navigate('/catalog/all')
                                        }}>ОТ 49 ДО 100 ЗАЛПОВ</p>
                                       <p onClick={() => {
                                        handleFilter(100, 364)
                                        navigate('/catalog/all')
                                        }}>ОТ 100 ДО 364 ЗАЛПОВ</p>
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
                   <img onClick={setModal} src={"https://i.ibb.co/Sr9DGwd/image.png"} alt="menu" className={s.menu}/>
               </div>
           </div>
           <HeaderResponsive setModal={setModal}/>
       </>
    )
}

export default Header