import React from 'react';
import style from './ReviewsPage.module.scss'
import Layout from "../../Layouts/Layout";
import {Reviews} from "../../components/Reviews/Reviews";

const ReviewsPage = () => {

    return (
        <Layout>
            <div className={style.reviewsDiv}>
                <Reviews />
            </div>
        </Layout>
    );
};

export default ReviewsPage;
