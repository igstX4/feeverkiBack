import React from 'react';
import s from "./Contacts.module.scss";
import wts from "../../assets/Whatsapp.png";
import tg from "../../assets/Telegram.png";
import ig from "../../assets/Инстаграм.png";
import vk from "../../assets/Вконтакте.png";
import email from "../../assets/mail_1.png";
import Header from "../../components/Header/Header";
import Layout from "../../Layouts/Layout";
import Footer from "../../components/Footer/Footer";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import doc1 from '../../assets/doc-1.png'
import doc2 from '../../assets/doc-2.png'
import { ContactBlock } from '../../components/ContactBlock/ContactBlock';


const Contacts = () => {
    return (
        <Layout>
            <div className={s.cenetered}>
            <ContactBlock />
            </div>
        </Layout>
    );
};

export default Contacts;
