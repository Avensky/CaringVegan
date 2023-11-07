import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import classes from "./Product.module.css";
import * as actions from "../../../store/actions/index";
import Review from "./Review/Review";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Rating from "../../../components/UI/Rating/Rating";
import ImageSlider from "../../../components/ImageSlider/ImageSlider";
// import ImageGallery from "../../../components/ImageGallery/ImageGallery";
import Button from "../../../components/UI/Button/Button";
import PropTypes from "prop-types";

const Product = (props) => {
  const id = useParams().id;
  // console.log("id = ", id);
  // console.log("product price = ", props.price);

  const [purchasing, setPurchasing] = useState(false);
  const price = props.price;
  const product = props.product;
  //   const [index, setActiveStep] = useState(0);

  //   const goToNextPicture = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  // const history = useHistory();

  //   const handleClick = (id) => {
  //     //props.addToCart(id);
  //   };
  // const addToCart = (price) => {
  //   console.log("add to cart");
  //   props.addToCart(price);
  // };

  //   const subtractQuantity = (id) => {
  //     //props.subtractQuantity(id);
  //   };
  //   const purchaseHandler = () => {
  //     setPurchasing(true);
  //   };
  const purchaseCancelHandler = () => setPurchasing(false);
  //   const viewCartHandler = () => {
  //     //history.push('/cart');
  //   };
  const getProduct = async (id) => await props.getProduct(id);
  // console.log("product = ", props.price);

  useEffect(() => {
    //get product if not loaded
    if (price.id !== id) {
      // console.log("id: ", id);
      getProduct(id);
      console.log("get product");
    }
    // console.log("product = ", props.price);
    // if (props.price) {
    //   //If Product exists reload
    //   console.log("check product in memory= ", props.price);
    //   if (props.price._id !== id) {
    //     getProduct(id);
    //   }
    // }
  }, []);

  useEffect(() => {
    const getPrice = async (priceid, productid) => {
      console.log("get price");
      await props.getPrice(priceid, productid, "product");
    };
    if (product.id && !price.price) {
      getPrice(product.default_price, product.id);
    }
  }, [props.product]);

  let details;
  // let details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

  //   const url = "https://caring-vegan.s3.us-west-2.amazonaws.com/";

  // let width = window.innerWidth;
  //    console.log('width = ',width);
  //    console.log('size = ',props.width);

  if (props.loading) details = <Spinner />;

  if (price.id) {
    details = (
      <div className={classes.Content}>
        <div className={classes.Name}>{props.price.name}</div>
        {price.description ? (
          <div className={classes.Description}>{price.description}</div>
        ) : null}
        {price.price ? (
          <div className={classes.Price}>
            ${(price.price.unit_amount / 100).toFixed(2)}{" "}
            <span className={classes.Currency}>{price.price.currency}</span>
          </div>
        ) : null}
        {price.images.length > 0 ? (
          <ImageSlider images={props.price.images} />
        ) : null}

        <div className={classes.bottomContent}>
          <div className={classes.Ratings}>
            <Rating rating={price.rating} id={price.id} />(
            {price.reviewCount || "Be the first to leave a review!"})
          </div>

          <div className={classes.Availability}>
            {price.metadata.inStock ? (
              <div>In Stock: {price.metadata.inStock || 0}</div>
            ) : null}
            {price.metadata.sold ? (
              <div>Sold: {price.metadata.sold || 0}</div>
            ) : null}
          </div>
        </div>
        <Button
          click={() => props.addToCart(price)}
          disabled={false}
          type="success"
        >
          ADD TO CART
        </Button>
      </div>
    );

    // if (props.width >= 1025 || width >= 1025) {
    //   details = (
    //     <div className={classes.Content}>
    //       <div className={classes.ImageWrapper}>
    //         <ImageGallery
    //           collection={props.price.imageData}
    //           alt={props.price.name}
    //         />
    //       </div>
    //       <div className={classes.ProductDetails}>
    //         <div className={classes.Heading}>
    //           <div className={classes.Name}>
    //             {props.price ? props.price.name : ""}
    //           </div>
    //         </div>
    //         <div className={classes.Heading}>
    //           <div className={classes.Rating}>
    //             {props.price ? (
    //               <>
    //                 <Rating
    //                   rating={props.price.rating}
    //                   id={props.price._id}
    //                   key={props.price.id}
    //                 />
    //                 ({props.price.reviewCount || 0})
    //               </>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </div>

    //         <div className={classes.DetailsWrapper}>
    //           <div className={classes.Options}></div>
    //           <div className={classes.PriceWrapper}>
    //             <div
    //               className={classes.Price}
    //             >{` $${props.price.price.toFixed(2)}`}</div>
    //           </div>
    //           <div className={classes.Availability}>
    //             <div>In Stock: {props.price.stock || 0}</div>
    //             <div>Sold: {props.price.sold || 0}</div>
    //           </div>
    //           <button
    //             type="button"
    //             className={classes.Button}
    //             onClick={addToCart}
    //           >
    //             Add to cart
    //           </button>
    //           <div className={classes.Desc}>{props.price.desc}</div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  }

  let reviewsArray = [
    {
      _id: "lskjd;lfkasd",
      title: "Great Gift!",
      username: "poly",
      rating: 3.5,
      date: "November 30th 2022",
      // item: 'be yourself',
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      _id: "lskjd;lsd",
      title: "Great Gift!",
      username: "poly",
      rating: 4.5,
      date: "November 30th 2022",
      // item: 'be yourself',
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  let reviews;
  if (reviewsArray) {
    reviews = (
      <div className={classes.Reviews}>
        <div className={classes.ReviewsHeading}>REVIEWS</div>
        {reviewsArray.map((review) => {
          return (
            <Review
              key={review._id}
              _id={review._id}
              title={review.title}
              username={review.username}
              rating={review.rating}
              date={review.date}
              // item={review.item}
              review={review.review}
            />
          );
        })}
      </div>
    );
  }

  //   let checkout;
  //   props.totalItems > 0 ? (checkout = purchaseHandler) : (checkout = null);

  useLayoutEffect(() => {
    window.addEventListener("resize", props.resize);
  }, []);

  return (
    <div className="page-wrapper">
      <div className={classes.Product}>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {/* {orderSummary} */}
        </Modal>
        {details}
      </div>
      {reviews}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    price: state.product.price,
    loading: state.product.loading,
    width: state.product.width,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(actions.getProduct(id)),
    getPrice: (priceid, productid, mode) =>
      dispatch(actions.getPrice(priceid, productid, mode)),
    resize: () => dispatch(actions.resize()),
    addToCart: (product) => dispatch(actions.addToCart(product)),
  };
};

Product.propTypes = {
  width: PropTypes.number,
  resize: PropTypes.func,
  product: PropTypes.object,
  price: PropTypes.object,
  getProduct: PropTypes.func,
  getPrice: PropTypes.func,
  addToCart: PropTypes.func,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
