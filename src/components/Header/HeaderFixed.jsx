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
                <NavLink>
                    РИМСКИЕ СВЕЧИ
                </NavLink>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className={s.itemLink}>
                <NavLink>
                    РАКЕТЫ
                </NavLink>
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div className={s.itemLink}>
                <NavLink>
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
                <h1 className={s.number}>+375293570821</h1>
                <svg
                className={s.image}
                onClick={() => navigate('/basket')}
                    xmlns="http://www.w3.org/2000/svg"
                    width={27}
                    height={27}
                    viewBox="0 0 27 27"
                    fill="none"
                >
                    <g clipPath="url(#clip0_2_50)">
                        <path
                            d="M26.7798 7.48827C26.6228 7.26552 26.3672 7.13221 26.0947 7.13221H23.4647L18.0562 2.5228C17.3981 1.86468 16.3291 1.86383 15.6701 2.5228L10.3528 7.13221H8.18774L6.83184 2.45783C6.30028 0.616769 5.03718 0.418488 4.51912 0.418488H0.904494C0.441275 0.418488 0.0666504 0.793956 0.0666504 1.25633C0.0666504 1.71871 0.442119 2.09418 0.904494 2.09418H4.51828C4.63303 2.09418 4.98149 2.09418 5.21943 2.91599L9.88284 20.0534C9.98409 20.4145 10.314 20.6643 10.6895 20.6643H22.0792C22.4328 20.6643 22.7483 20.4432 22.8673 20.1099L26.8819 8.25271C26.9747 7.99621 26.9359 7.71018 26.7789 7.48742L26.7798 7.48827ZM16.8632 3.71586L20.8718 7.13305H12.8528L16.8632 3.71586ZM21.4903 18.9894H11.3265L8.6594 8.80874H24.9041L21.4903 18.9894ZM19.8281 22.3627C18.6629 22.3627 17.7187 23.3069 17.7187 24.4721C17.7187 25.6373 18.6629 26.5815 19.8281 26.5815C20.9933 26.5815 21.9375 25.6373 21.9375 24.4721C21.9375 23.3069 20.9933 22.3627 19.8281 22.3627ZM12.2344 22.3627C11.0691 22.3627 10.125 23.3069 10.125 24.4721C10.125 25.6373 11.0691 26.5815 12.2344 26.5815C13.3996 26.5815 14.3437 25.6373 14.3437 24.4721C14.3437 23.3069 13.3996 22.3627 12.2344 22.3627Z"
                            fill="#3D3D3D"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_2_50">
                            <rect width={27} height={27} fill="white" />
                        </clipPath>
                    </defs>
                </svg>

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
                    <NavLink to={"/catalog/super"}>СУПЕР САЛЮТЫ</NavLink>
                    <NavLink to={"/catalog/big"}>БОЛЬШИЕ САЛЮТЫ</NavLink>
                    <NavLink to={"/catalog/small"}>МАЛЫЕ САЛЮТЫ</NavLink>
                    {/* <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <NavLink to={"/catalog/superFireworks"}>ЕЩЁ...</NavLink>
                            </Space>
                        </a>
                    </Dropdown> */}
                    <h1 className={s.number}>+375293570821</h1>
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
