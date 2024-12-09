import React, {useEffect, useState} from 'react'
import s from '../SuperFireworks/SuperFireworks.module.scss'
import {Select, Slider} from "antd";
import Layout from '../../Layouts/Layout'
import TextWithLines from '../../components/TextWithLines/TextWithLines'
import HomeProductItem from '../../components/HomeProducts/List/HomeProductItem'
import axios from "../../axios/axios";
import {Catalog} from "../../components/Catalog/Catalog";
import {useParams} from "react-router-dom";

const DifferentFireworks = ({defaultFilter, category}) => {
    const [products, setProducts] = useState()
    const [textBlock, setTextBlock] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 3000])
    const [lineText, setLineText] = useState('')
    const [desk, setDesk] = useState()
    const [filteredArr, setFilteredArr] = useState()
    const [sortOrder, setSortOrder] = useState('default')
    const {type, name} = useParams()

    const getProducts = async () => {
        try {
            if (!category) {
                const {data} = await axios.get("/getAllProducts");
                // Фильтруем только салюты
                const fireworksOnly = data.filter(item => 
                    ['Супер салюты', 'Средние салюты', 'Малые салюты'].includes(item.category)
                );

                setProducts(fireworksOnly);
                
                if (type === "all") {
                    setFilteredArr(fireworksOnly);
                    setLineText('ВСЕ САЛЮТЫ');
                    setDesk('');
                } else if (type === "small") {
                    const filteredData = fireworksOnly.filter(item => item.price <= 289);
                    setFilteredArr(filteredData);
                    setLineText('МАЛЫЕ САЛЮТЫ');
                    setDesk('Салюты до 289 BYN');
                } else if (type === "big") {
                    const filteredData = fireworksOnly.filter(item => item.price >= 290 && item.price <= 599);
                    setFilteredArr(filteredData);
                    setLineText('БОЛЬШИЕ САЛЮТЫ');
                    setDesk('Салюты от 290 до 599 BYN');
                } else if (type === "super") {
                    const filteredData = fireworksOnly.filter(item => item.price >= 600);
                    setFilteredArr(filteredData);
                    setLineText('СУПЕР САЛЮТЫ');
                    setDesk('Салюты от 600 BYN');
                }
            } else {
                const {data} = await axios.get(`/getAllProducts/${name}`);
                setProducts(data);
                setFilteredArr(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [type, name, category]);

    const filterArr = () => {
        if (!products) return;

        // Фильтрация по диапазону цен
        let filtered = products.filter(item => 
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        // Сортировка
        switch(sortOrder) {
            case 'priceAsc':
                filtered = [...filtered].sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filtered = [...filtered].sort((a, b) => b.price - a.price);
                break;
            default:
                // Оставляем исходный порядок
                break;
        }

        setFilteredArr(filtered);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
        setTimeout(filterArr, 0);
    };

    return (
        <Layout>
            <div className={s.wrapper}>
                <div className={s.btnText}>
                    <TextWithLines text={lineText || name}/>
                    {desk && <h2 className={s.textDesct}>{desk}</h2>}
                </div>
                <div className={`${s.filter} ${textBlock ? s.active : ''}`}>
                    <div onClick={() => setTextBlock(!textBlock)} className={s.textBlock}>
                        <div className={s.first}>
                            <h3>Фильтр по параметрам:</h3>
                        </div>
                        <div className={s.second}>
                            <p style={{marginBottom: "10px"}}>{textBlock ? '-' : '+'}</p>
                        </div>
                    </div>
                    <div className={s.filterContent}>
                        <div className={s.inputItem}>
                            <p>Стоимость:</p>
                            <div className={s.flexovik}>
                                <Slider
                                    className={s.slider1}
                                    range
                                    min={0}
                                    max={3000}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                />
                                <div className={s.priceDisplay}>
                                    <span>{priceRange[0]} BYN</span>
                                    <span>{priceRange[1]} BYN</span>
                                </div>
                            </div>
                        </div>
                        <div className={s.inputItem}>
                            <p>Сортировка:</p>
                            <Select
                                style={{ width: '100%' }}
                                value={sortOrder}
                                onChange={handleSortChange}
                                options={[
                                    { value: 'default', label: 'По умолчанию' },
                                    { value: 'priceAsc', label: 'Сначала дешевле' },
                                    { value: 'priceDesc', label: 'Сначала дороже' }
                                ]}
                            />
                        </div>
                        <div className={s.filterButtons}>
                            <button onClick={filterArr}>Применить фильтры</button>
                            <button 
                                onClick={() => {
                                    setPriceRange([0, 3000]);
                                    setSortOrder('default');
                                    setFilteredArr(products);
                                }}
                                className={s.resetButton}
                            >
                                Сбросить
                            </button>
                        </div>
                    </div>
                </div>
                <div className={s.productItem}>
                    {filteredArr?.length > 0 ? (
                        filteredArr.map((item) => (
                            <HomeProductItem product={item} key={item._id}/>
                        ))
                    ) : (
                        <p className={s.noProducts}>Товары не найдены</p>
                    )}
                </div>
            </div>
            <Catalog/>
        </Layout>
    );
};

export default DifferentFireworks;