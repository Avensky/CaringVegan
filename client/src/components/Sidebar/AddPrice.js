import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button/Button";
import Header from "./Header/Header";
import Modal from "../UI/Modal/Modal";
// import { formatPrice } from "../../utility/utility";

const Sidebar = (props) => {
  let styles = [classes.Wrapper, classes.Close, classes.zIndex400].join(" ");
  props.show
    ? (styles = [classes.Wrapper, classes.Open, classes.zIndex400].join(" "))
    : null;
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
    frequency: Yup.string().required("Frequency is required!"),
  });

  let initialValues = {
    frequency: "one-off",
    unit_quantity: 1,
    unit_amount: 0,
  };

  return (
    <>
      <Backdrop show={props.show} clicked={closeHandler} zIndex="350" />
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
            // errors,
            isSubmitting,
            isValid,
          }) => (
            <>
              <div className={classes.contentWrapper}>
                <Header
                  clicked={closeHandler}
                  title={`Add price to ${product.name}`}
                />
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className={classes.content}>
                    {/* Price Frequency */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.paymentWrapper}>
                        <input
                          type="radio"
                          name="frequency"
                          id="one-off"
                          value="one-off"
                          checked={values.frequency === "one-off"}
                          onChange={() => setFieldValue("frequency", "one-off")}
                          // onBlur={handleBlur}
                        />
                        <label htmlFor="one-off">
                          <div className={classes.bold}>One-off</div>{" "}
                          <div className={classes.text}>
                            Charge a one-time fee
                          </div>
                        </label>

                        <input
                          type="radio"
                          name="frequency"
                          id="recurring"
                          value="recurring"
                          checked={values.frequency === "recurring"}
                          onChange={() =>
                            setFieldValue("frequency", "recurring")
                          }
                        />
                        <label htmlFor="recurring">
                          <div className={classes.bold}>Recurring</div>
                          <div className={classes.text}>
                            Charge an ongoing fee
                          </div>
                        </label>
                      </div>
                    </div>
                    {/* Pricing model */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.box}>
                        <div className={classes.bold}>
                          Choose your pricing model
                        </div>

                        <select
                          className={classes.select}
                          name="rate"
                          value={values.rate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="flat rate">
                            <div className={classes.option}>Flat Rate -</div>
                            <div className={classes.option}>
                              A single, fixed price.
                            </div>
                          </option>
                          <option value="package pricing">
                            <div>Package Pricing -</div>
                            <div>
                              Price by package, bundle, or group of units.
                            </div>
                          </option>
                          <option value="tiered pricing">
                            <div>Tiered Pricing -</div>
                            <div>Price based on quantity.</div>
                          </option>
                          <option value="usage-based">
                            <div>Usage-based -</div>
                            <div>
                              Pay-as-you-go billing based on metered usage.
                            </div>
                          </option>
                        </select>
                        <div className={classes.choose}>
                          A single, fixed price. View Docs
                        </div>
                      </div>
                    </div>
                    {/* Tax */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.bold}>Include tax in price</div>
                      <select
                        className={classes.select}
                        name="includeTaxes"
                        value={values.includeTaxes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {/* Currency */}
                    <div className={classes.inputWrapper}>
                      <div className="body">+ Add another currency</div>
                      <select
                        className={classes.select}
                        name="currency"
                        value={values.currency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Choose a currency</option>
                        <option value="usd">
                          USD - United States of America
                        </option>
                      </select>
                    </div>
                    {/* Price input */}
                    <div className="subHeading bold">Price</div>
                    <div className={classes.inputWrapper}>
                      <div className="bold">Amount (required)</div>
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

                      {/* <div className={classes.currency}>Choose currency</div>
                      <div className={classes.currency}>
                        This is a suggested price based on todays echange rate.
                        Price wont automatically update if echange rate changes
                      </div> */}
                    </div>
                    {/* Advanced input */}
                    <div className="subHeading bold">Advanced</div>
                    <div className={classes.inputWrapper}>
                      <div className="bold">Price description</div>
                      <div className="primaryColor200">
                        Used for organization. They are not customer facing.
                      </div>
                      <input
                        className="input"
                        value={values.priceDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {/* Lookup Key */}
                    <div className={classes.inputWrapper}>
                      <div className="bold">Lookup key</div>
                      <div className="primaryColor200">
                        Use lookup keys to make future pricing changes easier.
                        Lookup keys should be unique across all prices.
                      </div>
                      <input
                        className="input"
                        value={values.lookup}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {/*  */}
                    <div className={classes.previewWrapper}>
                      <div className="heading">Preview</div>
                      <div className="primaryColor200">
                        Estimate totals based on pricing model, unit quantity,
                        and tax.
                      </div>
                      <div className={classes.inputWrapper}>
                        <div className="bold">Unit quantity</div>
                        <input
                          className="input"
                          type="number"
                          value={values.unit_quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={1}
                        />
                      </div>

                      {/* <div className={classes.inputWrapper}>
                        <div className={classes.subTitle}>Tax location</div>
                        <input
                          type="number"
                          value={values.tax_location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={1}
                        />
                      </div> */}

                      {/* <div className={classes.inputWrapper}>
                        {`${values.unit_quantity} * $${formatPrice(
                          values.unit_amount
                        )} = $${formatPrice(
                          values.unit_quantity * values.unit_amount
                        )}`}
                      </div>
                      <div className={classes.subTitle}>subTotal = $130</div>
                      <div className={classes.subTitle}>
                        Tax = start collecting tax
                      </div>
                      <div className={classes.subTitle}>Total = total</div> */}
                    </div>
                  </div>
                </form>
              </div>
              <div className={classes.submit}>
                <Button onClick={closeHandler} type="rounded">
                  Close
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
  setSidebar: PropTypes.func,
  product: PropTypes.object,
};

export default Sidebar;
