import style from '../Categories/Categories.module.scss'
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import EditCategoryModal from "../Modals/EditCategoryModal/EditCategoryModal";
import CreateCategoryModal from '../Modals/CreateCategoryModal/CreateCategoryModal';
import axios from "../../../axios/axios";
import EditSliderModal from "../Modals/EditSlider/EditSlider";
import CreateSliderItem from "../Modals/CreateSliderItem/CreateSliderItem";


const Slider = () => {
    const [value, setValue] = useState("")
    const [categories, setCategories] = useState()
    const debouncedValue = useDebounce(value, 400)
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
                                    <img src={`http://localhost:4000/internal/uploads/${item.img}`} alt="/" style={{marginTop: "5px", width: "100px", height: "60px"}}/>
                                </div>
                                <div className={style.editDiv}>
                                    <p onClick={() => {
                                        setEditModal(true)
                                        handleEdit(item)
                                    }} className={style.edit}>
                                        Редактировать
                                    </p>
                                    <p className={style.delete}>Удалить</p>
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
