import React, {useState} from 'react'
import Header from '../components/Header/Header'
import HeaderFixed from '../components/Header/HeaderFixed'
import Footer from "../components/Footer/Footer";
import {BurgerModal} from "../components/BurgerModal/BurgerModal";

const Layout = ({children, setFilter}) => {
    const [opened, setOpened] = useState(false)
    return (
        <>
            <BurgerModal opened={opened} setOpened={() => setOpened(!opened)}/>
            <HeaderFixed setModal={() => setOpened(!opened)}/>
            <Header setFilter={setFilter} setModal={() => setOpened(!opened)}/>
            {children}
            <Footer />
        </>
    )
}

export default Layout