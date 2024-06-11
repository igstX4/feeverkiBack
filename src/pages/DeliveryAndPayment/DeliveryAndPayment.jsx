import React from 'react';
import Layout from "../../Layouts/Layout";
import style from './DeliveryAndPayment.module.scss'
import DeliveryHome from "../../components/DeliveryHome/DeliveryHome";

const DeliveryAndPayment = () => {
    return (
        <Layout>
            <div className={style.wrapp}>
                <DeliveryHome />
            </div>
        </Layout>
    );
};

export default DeliveryAndPayment;
