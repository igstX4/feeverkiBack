import style from './Products.module.scss'
import {useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";
import AddProductModal from "../Modals/AddProductModal/AddProductModal";
import axios, {redirect, url} from "../../../axios/axios";

const Products = () => {
    const [products, setProducts] = useState()
    const [value, setValue] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const debouncedValue = useDebounce(value, 400)
    
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

    const productsSearch = products?.filter(item => item.name.toLowerCase().includes(debouncedValue.toLowerCase()))

    return (
        <div className={style.categoryContainer}>
            <AddProductModal update={getProducts} createModal={createModal} setCreateModal={setCreateModal}/>
            <div className={style.categoryTitle}>
                <h1>Список товаров</h1>
            </div>
            <div className={style.categoryTitle}>
                <h3>Поиск</h3>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
                <div>
                    <button className={style.addCategoryBtn} onClick={() => setCreateModal(true)}>Добавить товар
                    </button>
                </div>
            </div>
            <main className={style.table}>
                <section className={style.tableBody}>
                    <table style={{marginTop: "10px"}}>
                        <thead>
                        <tr className={style.tr}>
                            <th>
                                Изображение
                            </th>
                            <th>
                                Товар
                            </th>
                            <th>
                                Категория
                            </th>
                            <th>
                                Цена в киосках
                            </th>
                            <th>
                                Цена
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products ? (
                            productsSearch.map((item, i) => (
                                <tr className={style.trItem} onClick={() => window.location.replace(`${redirect}/admin/product/${item._id}`)}>
                                    <td className={style.tdImg}>
                                        <img src={`${url}/uploads/${item.image}`} alt={'/'}/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.priceKiosk}</td>
                                    <td>
                                        <strong>{item.price}</strong>
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

export default Products;
