import {useState, useEffect} from 'react';
import s from './Admin.module.scss'
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Login} from '../../components/admin/Login/Login';
import {useDispatch} from "react-redux";
import {signOut} from "../../store/user/userSlice";
import BurgerAdmin from '../../components/BurgerAdmin/BurgerAdmin';

export const Admin = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const handleExit = () => {
        dispatch(signOut())
        navigate('/admin/login')
    }
    console.log(user)
    const [opened, setOpened] = useState(false)
    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/changePassword')
        }
    }, [])
    return (
        <>
            <BurgerAdmin isOpened={opened} setOpened={() => setOpened(!opened)}/>
            <div>
                <div className={s.header}>
                    <button onClick={() => setOpened(true)}>☰</button>
                    <h2>Админ панель</h2>
                    <p>{user.data?.email}</p>
                </div>
                <div className={s.AdminWrapper2}>
                    <div className={s.Admin}>
                        {user.data ? <>
                            <div className={s.sidebar}>
                                <Link to="/admin/changePassword" className={s.item}>
                                    <h3>Смена пароля</h3>
                                </Link>
                                <Link to="/admin/slider" className={s.item}>
                                    <h3>Слайдер</h3>
                                </Link>
                                <Link to="/admin/categories" className={s.item}>
                                    <h3>Категории</h3>
                                </Link>
                                <Link to="/admin/orders" className={s.item}>
                                    <h3>Заказы</h3>
                                </Link>
                                <Link to="/admin/products" className={s.item}>
                                    <h3>Продукция</h3>
                                </Link>
                                <Link to="/admin/moderators" className={s.item}>
                                    <h3>Модераторы</h3>
                                </Link>
                                <Link to="/admin/settings" className={s.item}>
                                    <h3>Настройки</h3>
                                </Link>
                                <div onClick={handleExit} className={s.item + " " + s.exit}>
                                    <h3>Выйти</h3>
                                </div>
                            </div>
                            <div className={s.line}></div>
                            <div className={s.content}>
                                <Outlet/>
                            </div>
                        </> : <Outlet/>}
                    </div>
                </div>
            </div>
        </>
    )
}
//
