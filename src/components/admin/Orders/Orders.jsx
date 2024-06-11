import React, {useEffect, useState} from 'react';
import style from './Orders.module.scss'
import AddProductModal from "../Modals/AddProductModal/AddProductModal";
import {useDebounce} from "../../../hooks/useDebounce";
import axios from "../../../axios/axios";

const Orders = () => {
    const [orders, setOrders] = useState()
    const [value, setValue] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const debouncedValue = useDebounce(value, 400)

    const getOrders = async () => {
        try {
            const {data} = await axios.get("/orders");
            setOrders(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);
    console.log(orders)
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
                                Имя
                            </th>
                            <th>
                                Почта
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
                                Изображение
                            </th>
                            <th>
                                Название Товара
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
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.count}</td>
                                    <td onClick={() => window.location.replace(`http://localhost:3000/admin/product/${item.product._id}`)}>
                                        <img className={style.img} src={`http://localhost:4000/internal/uploads/${item.product.image}`} alt="/"/>
                                    </td>
                                    <td onClick={() => window.location.replace(`http://localhost:3000/admin/product/${item.product._id}`)}>
                                        {item.product.name}
                                    </td>
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
