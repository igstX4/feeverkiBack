import style from '../Categories/Categories.module.scss'
import { useEffect, useState } from "react";
import axios, { url } from "../../../axios/axios";
import EditSliderModal from "../Modals/EditSlider/EditSlider";
import CreateSliderItem from "../Modals/CreateSliderItem/CreateSliderItem";


const Slider = () => {
    const [value, setValue] = useState("")
    const [categories, setCategories] = useState()
    const [editModal, setEditModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState()
    const [createModal, setCreateModal] = useState(false)

    const getCategories = async () => {
        try {
            const { data } = await axios.get("/getItemSlider");
            setCategories(data.items);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleEdit = (item) => {
        setActiveCategory(item)
        setEditModal(!editModal)
    }
    const handleDelete = async (id) => {
        try {
            const { status } = await axios.delete(`/slide/${id}`);
            getCategories()
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    return (
        <div className={style.categoryContainer}>
            {activeCategory && <EditSliderModal update={getCategories} item={activeCategory} editModal={editModal} setEditModal={setEditModal} />}
            <CreateSliderItem update={getCategories} createModal={createModal} setCreateModal={setCreateModal} />
            <div className={style.categoryTitle}>
                <h1>Слайдер</h1>
            </div>
            <div className={style.categoryTitle}>
                <div>
                    <button onClick={() => setCreateModal(true)} className={style.addCategoryBtn}>Добавить айтем</button>
                </div>
            </div>
            <div className={style.categoryList}>
                {
                    categories ? (
                        categories.map((item, i) => (
                            <div className={style.item} key={item._id}>
                                <div>
                                    <p>{i + 1}. {item.category}</p>
                                    <img src={`${url}/uploads/${item.img}`} alt="/" style={{marginTop: "5px", width: "100px", height: "60px"}}/>
                                </div>
                                <div className={style.editDiv}>
                                    <p onClick={() => {
                                        setEditModal(true)
                                        handleEdit(item)
                                    }} className={style.edit}>
                                        Редактировать
                                    </p>
                                    <p onClick={() => handleDelete(item.id)} className={style.delete}>Удалить</p>
                                </div>
                            </div>
                        ))
                    ) : <div>loading..</div>
                }
            </div>
        </div>
    );
};

export default Slider;
