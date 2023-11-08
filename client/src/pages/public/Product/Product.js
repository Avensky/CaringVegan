import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
// import { useParams, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import classes from "./Product.module.css";
import * as actions from "../../../store/actions/index";
import Reviews from "./Reviews";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Rating from "../../../components/UI/Rating/Rating";
import ImageSlider from "../../../components/ImageSlider/ImageSlider";
// import ImageGallery from "../../../components/ImageGallery/ImageGallery";
import Button from "../../../components/UI/Buttonx/Button";
import PropTypes from "prop-types";

const Product = (props) => {
  const id = useParams().id;
  // console.log("id = ", id);
  // console.log("product price = ", props.price);
  const [item, setItem] = useState(null);
  console.log("item: ", item);
  const [purchasing, setPurchasing] = useState(false);
  const { price, product } = props;

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
    const getPrice = async (priceid, productid) => {
      await props.getPrice(priceid, productid, "product");
    };

    // if (product.id === id) {

    //   console.log("getPrice, Priced item id matches loaded product");
    //   getPrice(product.default_price, product.id);
    // }

    if (product.id) {
      console.log("Product detected");

      if (!price.id) {
        console.log("getPrice, product with no price detected");
        getPrice(product.default_price, product.id);
      }

      if (price.id) {
        console.log("Priced product detected");
        if (product.id !== price.id) {
          console.log("getPrice, priced product id does not match product id");
          getPrice(product.default_price, product.id);
        }
      }
    }
  }, [product]);

  useEffect(() => {
    if (price.id) {
      console.log("setItem price: ", price);
      // console.log("setItem price: ", price.price.product);
      // console.log("priced product detected");
      if (price.price.product === id) {
        console.log("setItem, priced product matches route id");
        setItem(price);
      }
    }
  }, [price]);

  let details = <p style={{ textAlign: "center" }}>Please select an item!</p>;

  if (props.loading) details = <Spinner />;

  if (item) {
    details = (
      <div className={classes.Content}>
        <div className={classes.Name}>{item.name}</div>
        {item.description ? (
          <div className={classes.Description}>{item.description}</div>
        ) : null}
        {item.price ? (
          <div className={classes.Price}>
            ${(price.price.unit_amount / 100).toFixed(2)}{" "}
            <span className={classes.Currency}>{item.price.currency}</span>
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
      <Reviews />
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
