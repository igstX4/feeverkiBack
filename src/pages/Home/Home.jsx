import React from 'react'
import style from './Home.module.scss'
import Layout from '../../Layouts/Layout'
import SlidersHome from '../../components/SlidersHome/SlidersHome'
import { SomeBtns } from '../../components/SomeBtns/SomeBtns'
import HomeProducts from '../../components/HomeProducts/HomeProducts'
import DeliveryHome from '../../components/DeliveryHome/DeliveryHome'
import { Discounts } from '../../components/Discounts/Discounts'
import { Reviews } from '../../components/Reviews/Reviews'
import {Catalog} from "../../components/Catalog/Catalog";
import { ContactBlock } from '../../components/ContactBlock/ContactBlock'
import { Security } from '../../components/Security/Security'

const Home = () => {


    return (
        <Layout>
            <div className={style.items}>
                <SlidersHome />
                <Catalog />
                <SomeBtns />
                <ContactBlock />
                <div className={style.discountWrapp}>
                    <Discounts />
                </div>
                <HomeProducts />
                {/* <DeliveryHome /> */}
                <Security />
                {/* <Reviews /> */}
                
            </div>
        </Layout>
    )
}

export default Home