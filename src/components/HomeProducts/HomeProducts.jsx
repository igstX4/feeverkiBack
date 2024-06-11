import React, {useEffect, useState} from 'react'
import style from './HomeProducts.module.scss'
import HomeProductItem from './List/HomeProductItem'
import TextWithLines from '../TextWithLines/TextWithLines'
import axios from "../../axios/axios";

const HomeProducts = () => {
    const [products, setProducts] = useState()

    const getProducts = async () => {
        try {
            const {data} = await axios.get("/getAllProducts");
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={style.wrapper}>
            <div className={style.textRecommend}>
                <div className={style.titleContainer}>
                    <TextWithLines text={"Рекомендуем"}/>
                    <p className={style.descr}>Выбрав один из этих салютов, вы точно не прогадаете!</p>
                </div>

            </div>
            <div className={style.productItem}>
                {
                    products ? (
                        products.map((item, i) => {
                            return <HomeProductItem product={item} key={i}/>
                        })
                    ) : <p>loading..</p>
                }
            </div>
        </div>
    )
}

export default HomeProducts