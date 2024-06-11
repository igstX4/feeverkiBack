import style from './Categories.module.scss'
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import EditCategoryModal from "../Modals/EditCategoryModal/EditCategoryModal";
import CreateCategoryModal from '../Modals/CreateCategoryModal/CreateCategoryModal';
import axios from "../../../axios/axios";


const Categories = () => {
    const [value, setValue] = useState("")
    const [categories, setCategories] = useState()
    const debouncedValue = useDebounce(value, 400)
    const [editModal, setEditModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState()
    const [createModal, setCreateModal] = useState(false)

    const getCategories = async () => {
        try {
            const { data } = await axios.get("/getAllCategories");
            setCategories(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const categoriesSearch = categories?.filter(item => item.category.toLowerCase().includes(debouncedValue.toLowerCase()))
  
    const handleEdit = (item) => {
        setActiveCategory(item)
        setEditModal(!editModal)
    }

    return (
        <div className={style.categoryContainer}>
            {activeCategory && <EditCategoryModal update={getCategories} item={activeCategory} editModal={editModal} setEditModal={setEditModal} />}
            <CreateCategoryModal update={getCategories} createModal={createModal} setCreateModal={setCreateModal} />
            <div className={style.categoryTitle}>
                <h1>Список категорий</h1>
            </div>
            <div className={style.categoryTitle}>
                <h3>Поиск</h3>
                <input value={debouncedValue} onChange={(e) => setValue(e.target.value)} type="text" />
                <div>
                    <button onClick={() => setCreateModal(true)} className={style.addCategoryBtn}>Добавить категорию</button>
                </div>
            </div>
            <div className={style.categoryList}>
                {
                    categories ? (
                        categoriesSearch.map(item => (
                            <div className={style.item} key={item._id}>
                                <p>{item.category}</p>
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

export default Categories;
