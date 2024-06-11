import style from './DiscountsPage.module.scss'
import Layout from "../../Layouts/Layout";
import {Discounts} from "../../components/Discounts/Discounts";

const DiscountsPage = () => {
    return (
        <Layout>
            <div className={style.div}>
                <Discounts />
            </div>
        </Layout>
    );
};

export default DiscountsPage;
