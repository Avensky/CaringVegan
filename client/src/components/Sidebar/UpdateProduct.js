import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button/Button";
import Header from "./Header/Header";
import Frequency from "./Frequency/Frequency";
import { formatPrice } from "../../utility/utility";
import Modal from "../UI/Modal/Modal";

const Sidebar = (props) => {
  let styles = [classes.Wrapper, classes.Close].join(" ");
  props.show ? (styles = [classes.Wrapper, classes.Open].join(" ")) : null;
  const [showCancelModal, setShowCancelModal] = useState(false);

  let resetPresForm = {}; // You will have to define this before useEffect

  const ResettingForm = () => {
    const { resetForm } = useFormikContext();
    resetPresForm = resetForm; // Store the value of resetForm in this variable
    return null;
  };

  const formRef = useRef(); // get access to formik props

  const closeHandler = () => {
    if (formRef.current.dirty) {
      setShowCancelModal(true);
    } else props.closed(true);
  };

  const continueHandler = (dirty) => {
    setShowCancelModal(false);
    props.closed(true);
    if (dirty) {
      resetPresForm();
    }
  };

  const product = props.product;
  console.log("product ", product.name);

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .max(45, "Maximum 45 characters"),
    unit_amount: Yup.number()
      .required("Unit amount is required!")
      .test("is-decimal", "invalid decimal", (value) =>
        (value + "").match(/^\d*(\.\d{0,2})?$/)
      ),
  });

  let initialValues = {
    // _id: product._id,
    name: product.name,
    description: product.description,
    unit_amount: formatPrice(product.default_price.unit_amount),
  };

  return (
    <>
      <Backdrop show={props.show} clicked={closeHandler} zInded="200" />
      <div className={styles}>
        <Modal
          show={showCancelModal}
          modalClosed={() => setShowCancelModal()}
          title="Close Sidebar"
          message="All progress will be lost, do you wish to continue?"
          cancel="Cancel"
          continue="Okay"
          continueHandler={() => continueHandler()}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, submitProps) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              props.updateProduct(values, props.product._id);
              submitProps.setSubmitting(false);
              submitProps.resetForm();
              props.closed();
            }, 1000);
          }}
          innerRef={formRef}
          // enableReinitialize
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            errors,
            isSubmitting,
            isValid,
          }) => (
            <>
              <div className={classes.contentWrapper}>
                <Header clicked={() => closeHandler} title="Update Product" />
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  encType="multipart/form-data"
                >
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
                      <div
                        className={classes.desc}
                      >{`JPEG or PNG under 2MB.`}</div>
                      <input
                        className={classes.input}
                        name="photo"
                        type="file"
                        // accept=".jpg, .jpeg, .png"
                        accept="/image*"
                        onChange={(event) => {
                          setFieldValue("photo", event.target.files[0]);
                        }}
                        // onChange={handleChange}
                      />
                    </div>
                    <div className={classes.inputWrapper}>
                      <Frequency />
                    </div>
                    <div className={classes.inputWrapper}>
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
                              placeholder="0"
                              min="0"
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
                <Button onClick={() => closeHandler} type="rounded" style="">
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
              <ResettingForm />
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool,
  closed: PropTypes.func,
  clicked: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.any,
  addProduct: PropTypes.func,
  getProducts: PropTypes.func,
  updateProduct: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  sidebar: PropTypes.string,
  product: PropTypes.object,
};

export default Sidebar;
