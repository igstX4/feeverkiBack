import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import SuperFireworks from './pages/SuperFireworks/SuperFireworks';
import Basket from "./pages/Basket/Basket";
import DeliveryAndPayment from "./pages/DeliveryAndPayment/DeliveryAndPayment";
import DiscountsPage from "./pages/DiscountsPage/DiscountsPage";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";
import RulesOfSecurity from "./pages/RulesOfSecurity/RulesOfSecurity";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store/store";
import Contacts from "./pages/Contacts/Contacts";
import {Admin} from "./pages/admin/Admin";
import {ChangePassword} from './components/admin/ChangePassword/ChangePassword';
import Categories from "./components/admin/Categories/Categories";
import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {Login} from './components/admin/Login/Login';
import {Register} from './components/admin/Register/Register';
import Products from "./components/admin/Products/Products";
import {fetchMe} from "./store/user/userSlice";
import DetailedProduct from "./components/admin/Products/DetailedProduct/DetailedProduct";
import Moderators from "./components/admin/Moderators/Moderators";
import Orders from "./components/admin/Orders/Orders";
import {Settings} from './components/admin/Settings/Settings';
import Product from "./pages/Product/Product";
import {PhotoProvider} from 'react-photo-view';
import {ConfigProvider} from 'antd';
import ruRu from 'antd/locale/ru_RU';
import Slider from "./components/admin/Slider/Slider";
import DifferentFireworks from "./pages/DifferentFireworks/DifferentFireworks";

function App() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const ProtectedRoute = ({children}) => {
        if (!user.data) {
            if (user.status === "loading") {
                return <h1>Loading...</h1>
            } else {
                return <Navigate to="/admin/login"/>;
            }
        }
        return children
    };

    useEffect(() => {
        dispatch(fetchMe())
    }, [])

    return (
        <ConfigProvider locale={ruRu}>
            <PhotoProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/catalog/:type' element={<DifferentFireworks/>}/>
                            <Route path='/category/:name' element={<DifferentFireworks category={true}/>}/>
                            <Route path='/product/:productName' element={<Product/>}/>
                            <Route path='/paymentInfo' element={<DeliveryAndPayment/>}/>
                            <Route path='/stock' element={<DiscountsPage/>}/>
                            <Route path='/reviews' element={<ReviewsPage/>}/>
                            <Route path='/security' element={<RulesOfSecurity/>}/>
                            <Route path='/contacts' element={<Contacts/>}/>
                            <Route path='/basket' element={<Basket/>}/>
                            <Route path='/admin' element={<Admin user={user}/>}>
                                <Route path="/admin/changePassword"
                                       element={<ProtectedRoute><ChangePassword user={user}/></ProtectedRoute>}/>
                                <Route path="/admin/categories"
                                       element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
                                <Route path="/admin/slider" element={<ProtectedRoute><Slider/></ProtectedRoute>}/>
                                <Route path="/admin/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
                                <Route path="/admin/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
                                <Route path='/admin/login' element={<Login user={user}/>}/>
                                <Route path='/admin/register' element={<Register user={user}/>}/>
                                <Route path='/admin/moderators'
                                       element={<ProtectedRoute><Moderators/></ProtectedRoute>}/>
                                <Route path='/admin/settings' element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                            </Route>
                            <Route path="/admin/product/:id"
                                   element={<ProtectedRoute><DetailedProduct/></ProtectedRoute>}/>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </PhotoProvider>
        </ConfigProvider>
    );
}

export default App;
