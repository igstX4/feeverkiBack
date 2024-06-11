import style from './Moderators.module.scss'
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import EditCategoryModal from "../Modals/EditCategoryModal/EditCategoryModal";
import axios from "../../../axios/axios";
import {CreateModerator} from "../Modals/CreateModerator/CreateModerator";
import { DeleteModerator } from '../Modals/DeleteModerator/DeleteModerator';

const Moderators = () => {
    const [value, setValue] = useState("")
    const [moderators, setModerators] = useState()
    const debouncedValue = useDebounce(value, 400)
    const [deleteModal, setDeleteModal] = useState(false)
    const [activeModerator, setActiveModerator] = useState()
    const [createModal, setCreateModal] = useState(false)

    const getModerators = async () => {
        try {
            const { data } = await axios.get("/getModerators");
            setModerators(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getModerators();
    }, []);

    const moderatorsSearch = moderators?.filter(item => item.email.toLowerCase().includes(debouncedValue.toLowerCase()))

    const handleDelete = (item) => {
        setActiveModerator(item)
        setDeleteModal(!deleteModal)
    }

    return (
        <div className={style.categoryContainer}>
            {activeModerator && <DeleteModerator isOpen={deleteModal} update={getModerators} setOpen={() => setDeleteModal(!deleteModal)} item={activeModerator} />}
            <CreateModerator update={getModerators} isOpen={createModal} setOpen={() => setCreateModal(!createModal)}/>
            <div className={style.categoryTitle}>
                <h1>Список модераторов</h1>
            </div>
            <div className={style.categoryTitle}>
                <h3>Поиск</h3>
                <input value={debouncedValue} onChange={(e) => setValue(e.target.value)} type="text" />
                <div>
                    <button onClick={() => setCreateModal(true)} className={style.addCategoryBtn}>Добавить модератора</button>
                </div>
            </div>
            <div className={style.categoryList}>
                {
                    moderators ? (
                        moderatorsSearch.map(item => (
                            <div className={style.item} key={item._id}>
                                <p>{item.email}</p>
                                <div className={style.editDiv}>
                                    <p onClick={() => {
                                        handleDelete(item)
                                    }} className={style.delete}>Удалить</p>
                                </div>
                            </div>
                        ))
                    ) : <div>loading..</div>
                }
            </div>
        </div>
    );
};

export default Moderators;
