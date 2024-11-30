import s from './Discount.module.scss'
import TextWithLines from '../TextWithLines/TextWithLines'
import {useEffect, useState} from "react";
import instance, {url} from "../../axios/axios";

export const Discounts = () => {
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const {data} = await instance.get("/discounts")
                setDiscounts(data)
            } catch (error) {
                console.error("Error fetching discounts:", error)
            }
        }
        fetchDiscounts()
    }, [])

    return (
        <div className={s.discounts}>
            <TextWithLines text={"СКИДКИ И АКЦИИ"} />
            <div className={s.blocks}>
                {discounts.map((discount) => (
                    <div key={discount._id} className={s.discountBlock}>
                        <div>
                            <h1>{discount.title}</h1>
                            <p>{discount.description}</p>
                        </div>
                        <img src={`${url}/uploads/${discount.img}`} alt={discount.title}/>
                    </div>
                ))}
            </div>
        </div>
    )
}