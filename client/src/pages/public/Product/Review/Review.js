import React from 'react';
import classes from './Review.module.css';
import PropTypes from 'prop-types';
import Rating from '../../../../components/Rating/Rating';

const Review = props => {
    let review = (
        <div className={classes.ReviewContianer} key={props._id}>


            <div className={classes.rating}>
                <Rating 
                    rating={props.rating} />
            </div>

            <div className={classes.title}>
                <b>{props.title}</b>
            </div>
            <div className={classes.review}>
                <p>{props.review}</p>
            </div>
            <div className={classes.data}>
                <div className={classes.username}>
                    {props.username}
                </div>
                <div className={classes.date}>
                    {props.date}
                </div>
            </div>
        </div>
    );
    return (
        review
    );
};

Review.propTypes = {
    rating: PropTypes.number,
    username: PropTypes.string,
    date: PropTypes.string,
    review: PropTypes.string,
    title: PropTypes.string,
    _id: PropTypes.string,
};

export default Review;