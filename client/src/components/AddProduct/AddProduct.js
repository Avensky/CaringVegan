import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./AddProduct.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
// import Pricing from "./Pricing/Pricing";
import Button from "../UI/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const AddProduct = (props) => {
  const [recurring, setRecurring] = useState(false);
  const [oneOff, setOneOff] = useState(true);

  let styles = [classes.AddProduct, classes.Close].join(" ");

  props.show ? (styles = [classes.AddProduct, classes.Open].join(" ")) : null;

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .max(45, "Maximum 45 characters"),
    unit_amount: Yup.number().required("Unit amount is required!"),
  });

  const params = { page: props.page, limit: 5 };
  console.log("ADD PRODUCT PARAMS", params);
  return (
    <>
      <Backdrop show={props.show} clicked={props.clicked} zIndex="200" />
      <div className={styles}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            unit_amount: "",
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
                <div className={classes.heading}>
                  <div className={classes.title}>Add a Product</div>
                  <div onClick={props.clicked} className={classes.close}>
                    Close X
                  </div>
                </div>

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
                      <input
                        className={classes.input}
                        type="text"
                        // component="textarea"
                        rows="4"
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
                      <div
                        className={classes.desc}
                      >{`JPEG or PNG under 2MB.`}</div>
                      <input
                        className={classes.input}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                    {/* <div className={classes.inputWrapper}>
                      <div className={classes.label}>More Options</div>
                    </div> */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.paymentWrapper}>
                        <Button
                          onClick={() => {
                            setOneOff(true);
                            setRecurring(false);
                          }}
                          type="select"
                          selected={oneOff}
                        >
                          One-off
                        </Button>
                        <Button
                          onClick={() => {
                            setRecurring(true);
                            setOneOff(false);
                          }}
                          type="select"
                          selected={recurring}
                        >
                          Recurring
                        </Button>
                      </div>
                      <div className={classes.contentWrapper}>
                        <div
                          className={classes.label}
                        >{`Amount (required)`}</div>
                        <div className={classes.pricingContent}>
                          <div className={classes.pricing}>
                            <span className={classes.dollar}>$</span>
                            <input
                              className={classes.input}
                              name="unit_amount"
                              type="number"
                              placeholder="0.00"
                              // component="input"
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.product.page,
    limit: state.product.limit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (values) => dispatch(actions.addInternalProduct(values)),
    getProducts: () => dispatch(actions.getInternalProducts()),
  };
};
AddProduct.propTypes = {
  show: PropTypes.bool,
  closed: PropTypes.func,
  clicked: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.any,
  addProduct: PropTypes.func,
  getProducts: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
