import React from "react";
import PropTypes from "prop-types";
import classes from "./UpdateProduct.module.css";
import Button from "../../UI/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Header from "../Header/Header";
import Frequency from "../Frequency/Frequency";
import { formatPrice } from "../../../utility/utility";

const UpdateProduct = (props) => {
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .max(45, "Maximum 45 characters"),
    unit_amount: Yup.number().required("Unit amount is required!"),
  });

  const params = { page: props.page, limit: 5 };
  console.log("ADD PRODUCT PARAMS", params);

  return (
    <Formik
      initialValues={{
        name: props.product.name,
        description: props.product.description,
        unit_amount: formatPrice(props.product.default_price.unit_amount),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, submitProps) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          props.addProduct(values);
          submitProps.setSubmitting(false);
          submitProps.resetForm();
          props.closed();
        }, 1000);
      }}
      // enableReinitialize
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <>
          <div className={classes.contentWrapper}>
            <Header clicked={props.clicked} title="Update Product" />

            <form onSubmit={handleSubmit}>
              <div className={classes.content}>
                <div className={classes.inputWrapper}>
                  <div className={classes.label}>{`Name (required)`}</div>
                  <div
                    className={classes.desc}
                  >{`Name of the product or service, visible to all customers`}</div>
                  <input
                    className={classes.input}
                    name="name"
                    type="text"
                    // component="textarea"
                    // rows="1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <div className={classes.ErrorMessage}>
                    {errors.name ? <div>{errors.name}</div> : null}

                    {/* <ErrorMessage name="name" component="div" /> */}
                  </div>
                </div>
                <div className={classes.inputWrapper}>
                  <div className={classes.label}>{`Description`}</div>
                  <div
                    className={classes.desc}
                  >{`Description of the product or service, visible to all customers`}</div>
                  <textarea
                    className={classes.input}
                    type="text"
                    rows="5"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <div className={classes.ErrorMessage}>
                    {errors.description ? (
                      <div>{errors.description}</div>
                    ) : null}
                    {/* <ErrorMessage name="description" component="div" /> */}
                  </div>
                </div>
                <div className={classes.inputWrapper}>
                  <div className={classes.label}>{`Image `}</div>
                  <div className={classes.desc}>{`JPEG or PNG under 2MB.`}</div>
                  <input
                    className={classes.input}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
                <div className={classes.inputWrapper}>
                  <Frequency />
                </div>
                <div className={classes.inputWrapper}>
                  <div className={classes.contentWrapper}>
                    <div className={classes.label}>{`Amount (required)`}</div>
                    <div className={classes.pricingContent}>
                      <div className={classes.pricing}>
                        <span className={classes.dollar}>$</span>
                        <input
                          className={classes.input}
                          name="unit_amount"
                          type="number"
                          placeholder="0"
                          step="0.01"
                          pattern="^\d*(\.\d{0,2})?$"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.unit_amount}
                        />
                      </div>
                      <div className={classes.currency}>USD</div>
                    </div>
                    <div className={classes.ErrorMessage}>
                      {errors.unit_amount ? (
                        <div>{errors.unit_amount}</div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className={classes.more}>More pricing options</div> */}
                </div>
                {/* <div className={classes.inputWrapper}>
                        <div className={classes.label}>{`Metadata`}</div>
                      </div> */}
              </div>
            </form>
          </div>
          <div className={classes.submit}>
            <Button onClick={props.clicked} type="rounded" style="">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              style="Purple"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.product.page,
    limit: state.product.limit,
    product: state.product.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (values) => dispatch(actions.addInternalProduct(values)),
    getProducts: () => dispatch(actions.getInternalProducts()),
  };
};
UpdateProduct.propTypes = {
  closed: PropTypes.func,
  clicked: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.any,
  addProduct: PropTypes.func,
  getProducts: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  product: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
