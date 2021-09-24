import React from 'react'
import classes from '../../Pages.module.scss'
import myClasses from './Add.module.scss'
//import Auxiliary from '../../../../hoc/Auxiliary';

const add = props => (
    <div className={myClasses.Add}>
        <figure className={classes.CardThumbnail}>
            <img src={myImg} alt="add cover"/>
        </figure>
        <div className={classes.CardTitle}>
            {props.title}
        </div>
        <div className={classes.CardDescription}>{props.content}</div>
        <div className={classes.CardDetails}>
            By {props.author}
            on {props.published}
        </div>
    </div>
)

export default add;