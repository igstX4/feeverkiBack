import React, {useEffect, useState} from 'react';
import style from './Orders.module.scss'
import AddProductModal from "../Modals/AddProductModal/AddProductModal";
import {useDebounce} from "../../../hooks/useDebounce";
import axios, { redirect } from "../../../axios/axios";

const Orders = () => {
    const [orders, setOrders] = useState()
    const [value, setValue] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const [prices, setPrices] = useState(null)
    const debouncedValue = useDebounce(value, 400)
    // const totalPrice = state.reduce((acc, curr) => acc += curr.totalPrice, 0)

    const getOrders = async () => {
        try {
            const {data} = await axios.get("/orders");
            const newData = data.map((item) => item.products.reduce((acc, curr) => acc += +curr.totalPrice, 0))
            setPrices(newData)
            setOrders(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className={style.categoryContainer}>
            {/*<AddProductModal update={getProducts} createModal={createModal} setCreateModal={setCreateModal}/>*/}
            <div className={style.categoryTitle}>
                <h1>Список заказов</h1>
            </div>
            <div className={style.categoryTitle}>
                <h3>Поиск</h3>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
            </div>
            <main className={style.table}>
                <section className={style.tableBody}>
                    <table style={{marginTop: "10px"}}>
                        <thead>
                        <tr className={style.tr}>
                            <th>
                                Название Товара
                            </th>
                            <th>
                                Имя
                            </th>
                            <th>
                                Номер телефона
                            </th>
                            <th>
                                Адрес
                            </th>
                            <th>
                                Количество
                            </th>
                            <th>
                                Общая стоимость
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders ? (
                            orders.map((item, i) => (
                                <tr className={style.trItem}>
                                    {/*<td className={style.tdImg}>*/}
                                    {/*    <img src={`http://localhost:4000/internal/uploads/${item.image}`} alt={'/'}/>*/}
                                    {/*</td>*/}
                                    <td onClick={() => window.location.replace(`${redirect}/admin/order/${item._id}`)}>
                                        <div style={{}}>
                                            {item.products.map((item) => <p>{item.title}</p>)}
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.products.map((item) => <p>{item.quantity}</p>)}</td>
                                    <td>{prices[i]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Loading...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Orders;
