import React from 'react'
import style from './TextWithLines.module.scss'

const TextWithLines = ({text}) => {
    return (
        <div className={style.title}>
            <div className={style.line}></div>
            <p>{text}</p>
            <div className={style.line}></div>
        </div>
    )
}

export default TextWithLines