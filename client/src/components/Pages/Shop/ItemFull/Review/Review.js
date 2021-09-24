import React from 'react'
import classes from './Review.module.css'

const Review = props => {
    let rating, star_border, star,star_half, quantity

    star_border = <i className="material-icons">star_border</i>
    star = <i className="material-icons">star</i>
    star_half = <i className="material-icons">star_half</i>

    let key = props.rating
    console.log('rating ', key)

        switch (true) {
            case key ==5 : rating = [star,star,star,star,star]
                break;
            case key>=4.5 && key<5 : rating = [star,star,star,star,star_half]
                break;
            case key>=4 && key<4.5 : rating = [star,star,star,star,star_border]
                break;
            case key>=3.5 && key<4 : rating = [star,star,star,star_half,star_border]
                break;
            case key>=3 && key<3.5 : rating = [star,star,star,star_border,star_border]
                break;
            case key>=2.5 && key<3: rating = [star,star,star_half,star_border,star_border]
                break;
            case key>=2 && key<=2.5: rating = [star,star,star_border,star_border,star_border]
                break;
            case key>=1.5 && key<2 : rating = [star,star_half,star_border,star_border,star_border]
                break;
            case key>=1 && key<1.5 : rating = [star,star_border,star_border,star_border,star_border]
                break;
            case key>=.5 && key<1 : rating = [star_half,star_border,star_border,star_border,star_border]
                break;
            case key>=0 && key<.5 : rating = [star_border,star_border,star_border,star_border,star_border]
                break;
        }

    let review = (
        <div className={classes.Reviews}>
            <div className={classes.username}>
                <b>{props.username}</b>
            </div>
            <div className={classes.rating}>
                <p>{rating}</p>
            </div>
            <div className={classes.date}>
                <p>{props.date}</p>
            </div>
            <div className={classes.item}>
                <b>{props.item}</b>
            </div>
            <div className={classes.review}>
                <p>{props.review}</p>
            </div>
        </div>
    )
    return (
        review
    )

}

export default Review