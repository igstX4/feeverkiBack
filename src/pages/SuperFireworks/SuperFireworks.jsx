import React, {useEffect, useState} from 'react'
import s from './SuperFireworks.module.scss'
import {Select, Slider} from "antd";
import Layout from '../../Layouts/Layout'
import TextWithLines from '../../components/TextWithLines/TextWithLines'
import HomeProductItem from '../../components/HomeProducts/List/HomeProductItem'
import axios from "../../axios/axios";
import {Catalog} from "../../components/Catalog/Catalog";

const SuperFireworks = () => {
    const [products, setProducts] = useState()
    const [textBlock, setTextBlock] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 78300])
    const [selectedCategory, setSelectedCategory] = useState(undefined)
    const [filteredArr, setFilteredArr] = useState()

    const getProducts = async () => {
        try {
            const {data} = await axios.get("/getAllProducts");
            setProducts(data);
            setFilteredArr(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filterArr = () => {
        if (!products) return;

        let filtered = [...products];

        // Фильтрация по категории
        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Фильтрация по диапазону цен
        filtered = filtered.filter(item => 
            item.price >= priceRange[0] && item.price <= priceRange[1]
        );

        setFilteredArr(filtered);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const categories = [
        'Супер салюты',
        'Средние салюты',
        'Малые салюты',
        'Петарды',
        'Фонтаны',
        'Рим свечи',
        'Ракеты',
        'Бенгальские огни',
        'Хлопушки'
    ];

    return (
        <Layout>
            <div className={s.wrapper}>
                <div className={s.btnText}>
                    <TextWithLines text={"КАТАЛОГ"}/>
                    <h2 className={s.textDesct}>Все товары</h2>
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
                            <p>Категория:</p>
                            <Select 
                                className={s.select} 
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                placeholder="Выберите категорию"
                                style={{ width: '100%' }}
                            >
                                {categories.map(category => (
                                    <Select.Option key={category} value={category}>
                                        {category}
                                    </Select.Option>
                                ))}
                                <Select.Option value={undefined}>Все категории</Select.Option>
                            </Select>
                        </div>
                        <div className={s.inputItem}>
                            <p>Стоимость:</p>
                            <div className={s.flexovik}>
                                <Slider
                                    className={s.slider1}
                                    range
                                    min={0}
                                    max={78300}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                />
                                <div className={s.priceDisplay}>
                                    <span>{priceRange[0]} BYN</span>
                                    <span>{priceRange[1]} BYN</span>
                                </div>
                            </div>
                        </div>
                        <div className={s.filterButtons}>
                            <button onClick={filterArr}>Применить фильтры</button>
                            <button 
                                onClick={() => {
                                    setSelectedCategory(undefined);
                                    setPriceRange([0, 78300]);
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
    )
}

export default SuperFireworks;