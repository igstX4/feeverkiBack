import React from 'react'
import s from './BurgerAdmin.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../store/user/userSlice'
const BurgerAdmin = ({isOpened, setOpened}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleExit = () => {
        dispatch(signOut())
        navigate('/admin/login')
    }
  return (
    <div onClick={setOpened} className={`${s.BurgerAdminWrapper} ${isOpened ? s.activeWrapper : ""}`}>
        <div onClick={(e) => e.stopPropagation()} className={`${s.BurgerAdmin} ${isOpened ? s.active : ""}`}>
        <div className={s.header}>
            <h3>Выберите страницу</h3>
            <button onClick={setOpened} className={s.close}>
                ✖
            </button>
        </div>
        
        <div className={s.sidebar}>
                    <div>
                    <Link onClick={setOpened} to="/admin/changePassword" className={s.item}>
                        <h3>Смена пароля</h3>
                    </Link>
                    <Link onClick={setOpened} to="/admin/categories" className={s.item}>
                        <h3>Категории</h3>
                    </Link>
                    <Link onClick={setOpened} to="/admin/orders" className={s.item}>
                        <h3>Заказы</h3>
                    </Link>
                    <Link onClick={setOpened} to="/admin/products" className={s.item}>
                        <h3>Продукция</h3>
                    </Link>
                    <Link onClick={setOpened} to="/admin/moderators" className={s.item}>
                        <h3>Модераторы</h3>
                    </Link>
                    <Link onClick={setOpened} to="/admin/settings" className={s.item}>
                        <h3>Настройки</h3>
                    </Link>
                    </div>
                    <div onClick={handleExit} className={s.item + " " + s.exit}>
                        <h3>Выйти</h3>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default BurgerAdmin