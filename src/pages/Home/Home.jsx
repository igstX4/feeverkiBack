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

const Home = () => {


    return (
        <Layout>
            <div className={style.items}>
                <SlidersHome />
                <SomeBtns />
                <HomeProducts />
                <DeliveryHome />
                <Discounts />
                <Reviews />
                <Catalog />
            </div>
        </Layout>
    )
}

export default Home