import React, { useEffect, useState } from 'react'
import s from './Settings.module.scss'
import instance from '../../../axios/axios'
export const Settings = () => {
    const [secret, setSecret] = useState()
    console.log(secret)
    const getSecret = async () => {
        try {
            // const {status} = await instance.post('/changeIsSecret')
            const {data} = await instance.get('/secret')

            setSecret(data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getSecret()
    }, [ ])
    const changeIsSecret = async () => {
        const {status} = await instance.post('/changeIsSecret')
        console.log(status)
        if (status === 200) {
            getSecret()
        }
        console.log('hello')
    }
  return (
    <div className={s.Settings}>
        <h2>Здесь вы можете включить или выключить регистрацию по секретному ключу</h2>
        <button onClick={changeIsSecret}>{secret ? "Выключить" : "Включить"}</button>
    </div>
  )
}
