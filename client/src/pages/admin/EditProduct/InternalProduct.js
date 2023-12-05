import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import classes from "./EditProduct.module.css";
import * as actions from "../../../store/actions/index";
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
  const [item, setItem] = useState(null);
  // console.log("item: ", item);
  const [purchasing, setPurchasing] = useState(false);
  const { product } = props;

  const purchaseCancelHandler = () => setPurchasing(false);
  const getProduct = async (id) => await props.getProduct(id);

  //   const [index, setActiveStep] = useState(0);
  //   const goToNextPicture = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };
  // const history = useHistory();
  //const handleClick = (id) => {props.addToCart(id)};
  // const addToCart = (price) => {props.addToCart(price)};
  // const subtractQuantity = (id) => {props.subtractQuantity(id)};
  // const purchaseHandler = () => {setPurchasing(true)};
  // const viewCartHandler = () => {history.push('/cart');};
  // console.log("product = ", props.price);

  useEffect(() => {
    if (!product.id) {
      console.log("getProduct, no product detected");
      getProduct(id);
    } else if (product.id !== id) {
      console.log("getProduct, route id does not match saved product");
      getProduct(id);
    }
  }, []);

  useEffect(() => {
    if (product.id === id) {
      console.log("setItem product: ", product);

      setItem(product);
    }
  }, [product]);

  let details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

  if (props.loading) details = <Spinner />;

  if (item) {
    details = (
      <div className={classes.Content}>
        <div className={classes.Name}>{item.name}</div>
        {item.description ? (
          <div className={classes.Description}>{item.description}</div>
        ) : null}
        {item.default_price.unit_amount ? (
          <div className={classes.Price}>
            ${(item.default_price.unit_amount / 100).toFixed(2)}{" "}
            <span className={classes.Currency}>
              {item.default_price.currency}
            </span>
          </div>
        ) : null}
        {item.images.length > 0 ? <ImageSlider images={item.images} /> : null}

        <div className={classes.bottomContent}>
          <div className={classes.Ratings}>
            <Rating rating={item.rating} id={item.id} />(
            {item.reviewCount || "Be the first to leave a review!"})
          </div>

          <div className={classes.Availability}>
            {item.metadata.inStock ? (
              <div>In Stock: {item.metadata.inStock || 0}</div>
            ) : null}
            {item.metadata.sold ? (
              <div>Sold: {item.metadata.sold || 0}</div>
            ) : null}
          </div>
        </div>
        <Button
          click={() => props.addToCart(item)}
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

  // let width = window.innerWidth;
  // console.log('width = ',width);
  // console.log('size = ',props.width);

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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.stripe.product,
    loading: state.stripe.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(actions.getProduct(id)),
    addToCart: (product) => dispatch(actions.addToCart(product)),
  };
};

Product.propTypes = {
  resize: PropTypes.func,
  product: PropTypes.object,
  getProduct: PropTypes.func,
  addToCart: PropTypes.func,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
