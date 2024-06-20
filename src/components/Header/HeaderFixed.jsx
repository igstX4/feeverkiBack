import React, {useState, useEffect} from "react";
import logo1 from "../../assets/logo.png";
import {Dropdown, Space} from 'antd';
import s from "./Header.module.scss";
import {Book, Search, Cart} from "./Svgs";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import image7 from '../../assets/image7.png'
import image8 from '../../assets/image8.png'

const items = [
    {
        key: '1',
        label: (
            <div className={s.itemLink}>
                <NavLink to="https://www.antgroup.com">
                    РИМСКИЕ СВЕЧИ
                </NavLink>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className={s.itemLink}>
                <NavLink to="https://www.antgroup.com">
                    РАКЕТЫ
                </NavLink>
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div className={s.itemLink}>
                <NavLink to="https://www.antgroup.com">
                    ХЛОПУШКИ
                </NavLink>
            </div>
        ),
    },
    {
        key: '4',
        label: (
            <div className={s.itemLink}>
                <NavLink to="https://www.antgroup.com">
                    ПЕТАРДЫ
                </NavLink>
            </div>
        ),
    },
    {
        key: '5',
        label: (
            <div className={s.itemLink}>
                <NavLink to="https://www.antgroup.com">
                    ДЫМЫ, ФАЕРЫ
                </NavLink>
            </div>
        ),
    },
];
const HeaderFixedResponsible = ({setModal, open}) => {
    const navigate = useNavigate()
    return (
        <div className={`${s.HeaderResponsibleFixedWrapper} ${open ? s.openedFixed : ""}`}>
            <div className={s.topItems}>
                <img onClick={setModal} src={image7} alt="menu" className={s.menu}/>
                <h1 className={s.number}>8(812)987-78-51</h1>
                <img src={image8} className={s.image} alt={"logo"}
                 onClick={() => navigate('/')}/>
            </div>
            <div className={s.bottomItems}>
                <p>СУПЕР САЛЮТЫ</p>
                <p>БОЛЬШИЕ САЛЮТЫ</p>
                <p>МАЛЫЕ САЛЮТЫ</p>
            </div>
        </div>
    )
}
const HeaderFixed = ({setModal}) => {
    const [catalogOpened, setCatalog] = useState(false);
    const [scroll, setScroll] = useState(0);
    const navigate = useNavigate()
    const state = useSelector(state => state.basket)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <>
            <HeaderFixedResponsible open={scroll >= 100} setModal={setModal}/>
            <div
                className={`${s.headerWrapperFixed} ${scroll >= 100 ? s.visible : s.hidden
                }`}
            >
                <div className={s.headerDiv}>
                    <NavLink to={"/catalog/superFireworks"}>СУПЕР САЛЮТЫ</NavLink>
                    <NavLink to={"/catalog/superFireworks"}>БОЛЬШИЕ САЛЮТЫ</NavLink>
                    <NavLink to={"/catalog/superFireworks"}>МАЛЫЕ САЛЮТЫ</NavLink>
                    <NavLink to={"/catalog/superFireworks"}>ФОНТАНЫ</NavLink>
                    <NavLink to={"/catalog/superFireworks"}>БЕНГАЛЬСКИЕ ОГНИ</NavLink>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <NavLink to={"/catalog/superFireworks"}>ЕЩЁ...</NavLink>
                            </Space>
                        </a>
                    </Dropdown>
                    <h1 className={s.number}>8(812)987-78-51</h1>
                    <div className={s.cart} onClick={() => navigate('/basket')}>
                        <Cart/>
                        <p>Корзина ({state.length})</p>
                    </div>
                    <img
                        onClick={setModal}
                        src={image7}
                        alt="menu"
                        className={s.menu}
                    />
                </div>
            </div>
        </>
    );
};

export default HeaderFixed;
