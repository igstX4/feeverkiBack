import React, {useEffect, useState} from 'react'
import s from '../SuperFireworks/SuperFireworks.module.scss'
import {Select} from "antd";
import Layout from '../../Layouts/Layout'
import TextWithLines from '../../components/TextWithLines/TextWithLines'
import HomeProductItem from '../../components/HomeProducts/List/HomeProductItem'
import axios from "../../axios/axios";
import {Catalog} from "../../components/Catalog/Catalog";
import {Slider, Switch} from 'antd';
import {useNavigate, useParams} from "react-router-dom";

const DifferentFireworks = ({defaultFilter, category}) => {
    const [products, setProducts] = useState()
    const [textBlock, setTextBlock] = useState(false)
    const [count, setCount] = useState()
    const [caliber, setCaliber] = useState()
    const [duration, setDuration] = useState()
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(78300)
    const [lineText, setLineText] = useState()
    const [desk, setDesk] = useState()
    const [filteredArr, setFilteredArr] = useState()
    const [defaultFilter1, setDefaultFilter] = useState()
    const {type, name} = useParams()
    const navigate = useNavigate()
    console.log(type)


    const getProducts = async () => {
        try {
            if (!category) {
                const {data} = await axios.get("/getAllProducts");
                setProducts(data);
                setFilteredArr(data)
                if (type === "all") {
                    setFilteredArr(data)
                    setLineText('ВСЕ САЛЮТЫ')
                    setDesk('')
                } else if (type === "small") {
                    const filteredArr1 = data.filter((item) => item.price <= 3000)
                    setFilteredArr(filteredArr1)
                    setLineText('МАЛЫЕ САЛЮТЫ')
                    setDesk('Салюты до 3 000 ₽')
    
                } else if (type === "big") {
                    const filteredArr1 = data.filter((item) => item.price >= 3000)
                    const filteredArr2 = filteredArr1.filter((item) => item.price <= 10000)
                    setFilteredArr(filteredArr2)
                    setLineText('БОЛЬШИЕ САЛЮТЫ')
                    setDesk('Салюты от 3 000 ₽ до 10 000 ₽')
                } else if (type === "super") {
                    const filteredArr1 = data.filter((item) => item.price >= 10000)
                    setFilteredArr(filteredArr1)
                    setLineText('СУПЕР САЛЮТЫ')
                    setDesk('Салюты от 10 000 ₽')
                }
            } else {
                const {data} = await axios.get(`/getAllProducts/${name}`)
                console.log(data, name)
                setProducts(data);
                setFilteredArr(data)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts();
    }, [type]);

    const handleFilters = (min, max) => {
        let copiedProducts = products.concat()
        console.log(copiedProducts, 123)
        const filteredArr1 = copiedProducts.filter((item) => {
            const foundObj = item.options.find((item) => item.name === "Залпов")
            // console.log(+foundObj.value.match(/\d+(\.\d+)?/)[0], +count)
            if (+foundObj.value.match(/\d+(\.\d+)?/)[0] >= +min) {
                return true
            } else {
                return false
            }
        })
        const filteredArr2 = filteredArr1.filter((item) => {
            const foundObj = item.options.find((item) => item.name === "Залпов")
            // console.log(+foundObj.value.match(/\d+(\.\d+)?/)[0], +count)
            if (+foundObj.value.match(/\d+(\.\d+)?/)[0] <= +max) {
                return true
            } else {
                return false
            }
        })
        setFilteredArr(filteredArr2)
    }
    const filterArr = () => {
        let copiedProducts = products.concat()
        navigate('/catalog/all')
        if (products) {
            if (count) {
                const filteredArr1 = copiedProducts.filter((item) => {
                    const foundObj = item.options.find((item) => item.name === "Залпов")
                    console.log(+foundObj.value.match(/\d+(\.\d+)?/)[0], +count)
                    if (+foundObj.value.match(/\d+(\.\d+)?/)[0] >= +count) {
                        return true
                    } else {
                        return false
                    }
                })
                copiedProducts = filteredArr1
            }

            if (caliber) {
                const filteredArr1 = copiedProducts.filter((item) => {
                    const foundObj = item.options.find((item) => item.name === "Калибр")
                    if (+foundObj.value.match(/\d+(\.\d+)?/)[0] >= +caliber) {
                        return true
                    } else {
                        return false
                    }
                })
                copiedProducts = filteredArr1
            }
            if (duration) {
                const filteredArr1 = copiedProducts.filter((item) => {
                    const foundObj = item.options.find((item) => item.name === "Время")
                    if (+foundObj.value.match(/\d+(\.\d+)?/)[0] >= +duration) {
                        return true
                    } else {
                        return false
                    }
                })
                copiedProducts = filteredArr1
            }
            if (min) {
                const filteredArr1 = copiedProducts.filter((item) => item.price >= min)
                copiedProducts = filteredArr1
            }
            if (max) {
                const filteredArr1 = copiedProducts.filter((item) => item.price <= max)
                copiedProducts = filteredArr1
            }
            setFilteredArr(copiedProducts)
        }

    }
    return (
        <Layout setFilter={handleFilters}>
            <>
                <div className={s.wrapper}>
                    <div className={s.btnText}>
                        <TextWithLines text={lineText}/>
                        <h2 className={s.textDesct}>{desk}</h2>
                    </div>
                    <div className={`${s.filter} ${textBlock ? s.active : ''}`}>
                        <div onClick={() => setTextBlock(!textBlock)} className={s.textBlock}>
                            <div className={s.first}>
                                <h3>Фильтр по параметрам:</h3>
                            </div>
                            <div className={s.second}>
                                <p>+</p>
                            </div>
                        </div>
                        <div className={s.filterContent}>
                            <div className={s.inputItem}>
                                <p>Количество залпов, от:</p>
                                <Select className={s.select} defaultValue={""} onChange={setCount}>
                                    <Select.Option value="49">49</Select.Option>
                                    <Select.Option value="100">100</Select.Option>
                                    <Select.Option value="200">200</Select.Option>
                                    <Select.Option value="">-</Select.Option>
                                </Select>
                            </div>
                            <div className={s.inputItem}>
                                <p>Калибр, от (дюймов):</p>
                                <Select className={s.select} defaultValue={""} style={{width: 145, height: '35px'}}
                                        onChange={setCaliber}>
                                    <Select.Option value="0.8">0.8</Select.Option>
                                    <Select.Option value="1.0">1.0</Select.Option>
                                    <Select.Option value="1.2">1.2</Select.Option>
                                    <Select.Option value="1.5">1.5</Select.Option>
                                    <Select.Option value="2.0">2.0</Select.Option>
                                    <Select.Option value="">-</Select.Option>
                                </Select>
                            </div>
                            <div className={s.inputItem}>
                                <p>Длительность, более (сек)</p>
                                <Select className={s.select} defaultValue={""} style={{width: 145, height: '35px'}}
                                        onChange={setDuration}>
                                    <Select.Option value="30">30</Select.Option>
                                    <Select.Option value="60">60</Select.Option>
                                    <Select.Option value="90">90</Select.Option>
                                    <Select.Option value="180">180</Select.Option>
                                    <Select.Option value="">-</Select.Option>
                                </Select>
                            </div>
                            <div className={s.inputItem}>
                                <p>Стоимость от/до:</p>
                                <div className={s.flexovik}>
                                    <div className={s.slider}>
                                        <div className={s.numbers}>
                                            <div className={s.number}>0</div>
                                            <div className={s.number}>78300</div>
                                        </div>
                                        <Slider className={s.slider1} min={0} max={78300} onChange={setMin}
                                                defaultValue={30}/>
                                    </div>
                                    <div className={s.slider}>
                                        <div className={s.numbers}>
                                            <div className={s.number}>0</div>
                                            <div className={s.number}>78300</div>
                                        </div>
                                        <Slider className={s.slider1} min={0} onChange={setMax} max={78300}
                                                defaultValue={78300}/>
                                    </div>
                                </div>
                            </div>
                            <button onClick={filterArr}>Фильтровать</button>
                        </div>
                    </div>
                    <div className={s.productItem}>
                        {
                            filteredArr ? (
                                filteredArr.map((item, i) => {
                                    return <HomeProductItem product={item} key={i}/>
                                })
                            ) : <p>loading..</p>
                        }
                    </div>
                </div>
            </>
            <Catalog/>
        </Layout>
    )
}

export default DifferentFireworks