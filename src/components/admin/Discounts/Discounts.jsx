import style from './Discounts.module.scss'
import {useEffect, useState} from "react";
import {useDebounce} from "../../../hooks/useDebounce";
import AddDiscountModal from "../Modals/AddDiscountModal/AddDiscountModal";
import axios, {redirect, url} from "../../../axios/axios";

const Discounts = () => {
    const [discounts, setDiscounts] = useState()
    const [value, setValue] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const debouncedValue = useDebounce(value, 400)
    
    const getDiscounts = async () => {
        try {
            const {data} = await axios.get("/discounts");
            setDiscounts(data);
        } catch (error) {
            console.error("Error fetching discounts:", error);
        }
    };

    useEffect(() => {
        getDiscounts();
    }, []);

    const discountsSearch = discounts?.filter(item => item.title.toLowerCase().includes(debouncedValue.toLowerCase()))
    console.log(discountsSearch)
    return (
        <div className={style.categoryContainer}>
            <AddDiscountModal update={getDiscounts} createModal={createModal} setCreateModal={setCreateModal}/>
            <div className={style.categoryTitle}>
                <h1>Список скидок</h1>
            </div>
            <div className={style.categoryTitle}>
                <h3>Поиск</h3>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"/>
                <div>
                    <button className={style.addCategoryBtn} onClick={() => setCreateModal(true)}>
                        Добавить скидку
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
                                Название
                            </th>
                            <th>
                                Описание
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {discounts ? (
                            discountsSearch.map((item) => (
                                <tr key={item._id} className={style.trItem} 
                                    onClick={() => window.location.replace(`${redirect}/admin/discount/${item._id}`)}>
                                    <td className={style.tdImg}>
                                        <img src={`${url}/uploads/${item.img}`} alt={'/'}/>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Loading...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Discounts; 