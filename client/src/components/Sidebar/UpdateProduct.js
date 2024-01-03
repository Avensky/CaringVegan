import React, { useState, useRef } from "react";
// import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import { FieldArray, Field, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button/Button";
import Header from "./Header/Header";
import { formatPrice } from "../../utility/utility";
import Modal from "../UI/Modal/Modal";
import ImageSlider from "../ImageSlider/ImageSlider";
const noImage =
  "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/iStock-1416208685.jpg";

const Sidebar = (props) => {
  let styles = [classes.Wrapper, classes.Close, classes.zIndex300].join(" ");
  props.show
    ? (styles = [classes.Wrapper, classes.Open, classes.zIndex300].join(" "))
    : null;

  props.disableScrollUpdateProduct ? styles.push("disableScroll") : null;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

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
  // console.log("product ", product);

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required!")
      .max(45, "Maximum 45 characters"),
    // unit_amount: Yup.number()
    //   .required("Unit amount is required!")
    //   .test("is-decimal", "invalid decimal", (value) =>
    //     (value + "").match(/^\d*(\.\d{0,2})?$/)
    //   ),
  });

  // Metadata
  const metadata = props.product.metadata || {};
  // console.log("metadata ", metadata);
  const metadataObj = Object.entries(metadata) || [];
  // console.log("metadataObj ", metadataObj);
  const [metadataRows, setMetadataRows] = useState(metadataObj);
  const metadataBuilder = {};

  metadataObj.map(([key, val], index) => {
    metadataBuilder[`${index}`] = {
      key: key,
      val: val,
    };
  });
  // console.log("metadataObj", metadataObj);

  const [metadataLength, setMetadataLength] = useState(metadataObj.length * 2);
  let metadataLengthStr = JSON.stringify(metadataLength);
  metadataLengthStr = `new_${metadataLength}`;
  let metadataLengthVal = `${metadataLengthStr}_val`;

  // FeatureList
  const featureList = [...props.product.features] || [];
  // console.log("featureList ", featureList);
  const featureListObj = Object.entries(featureList) || [];
  // console.log("featureListObj ", featureListObj);
  const [featureListRows, setFeatureListRows] = useState(featureList);

  // build init
  const featureListBuilder = {};
  featureListObj.map(([key, val], index) => {
    console.log(`key: ${key}, val: ${val.name}, index: ${index}`);
    featureListBuilder[`${index}`] = {
      name: val.name,
    };
  });

  // console.log("featuresList ", featureListObj);
  // console.log("featureListBuilder ", featureListBuilder);

  const [featureListLength, setFeatureListLength] = useState(
    featureList.length
  );

  let featureListLengthStr = JSON.stringify(featureListLength);
  featureListLengthStr = `new_${featureListLength}`;
  let featureListLengthVal = `${featureListLengthStr}_val`;

  let initialValues = {
    name: product.name,
    description: product.description,
    metadata: metadataBuilder,
    features: featureListBuilder,
  };
  // console.log("initialValues: ", initialValues);

  // useEffect(() => {
  //   if (metadataRows.length === 0 && ) {
  //     setMetadataRows(metadataObj);
  //   }
  // });

  return (
    <>
      <Backdrop show={props.show} clicked={closeHandler} zIndex="200" />
      <Modal
        show={showCancelModal}
        modalClosed={() => setShowCancelModal()}
        title="Close Sidebar"
        message="All progress will be lost, do you wish to continue?"
        cancel="Cancel"
        continue="Okay"
        continueHandler={() => continueHandler()}
        zIndex="350"
      />
      <div className={styles}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, submitProps) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              props.updateProduct(props.product._id);
              submitProps.setSubmitting(false);
              submitProps.resetForm();
              props.closed();
            }, 1000);
          }}
          innerRef={formRef}
          enableReinitialize={false}
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
                <Header clicked={closeHandler} title="Update Product" />
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className={classes.content}>
                    {/* Name */}
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

                    {/* Description */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.label}>{`Description`}</div>
                      <div
                        className={classes.desc}
                      >{`Description of the product or service, visible to all customers`}</div>
                      <textarea
                        className={classes.input}
                        type="text"
                        rows="3"
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

                    {/* Image input */}
                    <div className={classes.inputWrapper}>
                      <div className={classes.split}>
                        <div className={classes.left}>
                          <div className={classes.label}>{`Image `}</div>
                          <div
                            className={classes.desc}
                          >{`JPEG or PNG under 2MB.`}</div>
                        </div>
                        <div className={classes.right}>
                          <Button
                            onClick={() => {}}
                            type="rounded"
                            style="Disabled"
                            disabled={true}
                          >
                            Edit gallery
                          </Button>
                        </div>
                      </div>

                      {product.images[0] ? (
                        <div className={classes.imageWrapper}>
                          <div className={classes.image}>
                            <ImageSlider
                              images={props.product.images || [noImage]}
                            />
                          </div>
                        </div>
                      ) : (
                        <input
                          className={classes.input}
                          name="photo"
                          type="file"
                          // accept=".jpg, .jpeg, .png"
                          accept="/image*"
                          onChange={(event) => {
                            setFieldValue("photo", event.target.files[0]);
                          }}
                        />
                      )}
                    </div>

                    {/* Pricing */}
                    <div className={classes.inputWrapper}>
                      <div className={"bold"}>Pricing</div>
                      <div className={classes.pricingContent}>
                        <div className={classes.price}>
                          <div className="secondaryColor bold">
                            {`$${formatPrice(
                              product.default_price.unit_amount
                            )} USD`}
                          </div>
                          <div className={classes.Frequency}>One-off</div>
                        </div>

                        <div className={classes.propertiesWrapper}>
                          <div className={classes.properties}>
                            <Button
                              type="compact"
                              style="default"
                              disabled={true}
                            >
                              Default
                            </Button>
                            <Button type="compact" style="grey" disabled={true}>
                              Limited Access
                            </Button>
                          </div>
                          {/* <div className={classes.edit}>
                            <Button
                              onClick={() => {}}
                              disabled={true}
                              type="compact"
                              style="Disabled"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {}}
                              disabled={true}
                              type="compact"
                              style="Disabled"
                            >
                              Duplicate
                            </Button>
                            <Button
                              onClick={() => {}}
                              style="Disabled"
                              disabled={true}
                              type="compact"
                            >
                              Delete
                            </Button>
                          </div> */}
                        </div>
                      </div>

                      <div className={classes.add}>
                        <Button
                          onClick={() => {
                            props.setShowAddPriceSidebar(true);
                          }}
                          type="rounded"
                          style="wide"
                        >
                          + Add another price
                        </Button>
                      </div>
                    </div>

                    {/* Tax */}
                    {/* <div className={classes.inputWrapper}>
                      <div className="bold">Product tax code</div>
                      <div className="primaryColor200">
                        This will be used for calculating automatic tax.
                        Defaults to the preset product tax code form your tax
                        settings. Learn More.
                      </div>
                      <select
                        className="input"
                        value={values.productTaxCode}
                        name="productTaxCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Use Default</option>
                        <optgroup label="Most Popular">
                          <option value="electronically">
                            General - Electronically Supplied Services
                          </option>
                          <option value="services">General - Services</option>
                          <option value="tangibleGoods">
                            General - Tangible Goods
                          </option>
                        </optgroup>
                        <optgroup label="Digital Products"></optgroup>
                        <optgroup label="Physical Products"></optgroup>
                        <optgroup label="Services"></optgroup>
                      </select>
                    </div> */}
                    <div
                      className={"heading"}
                      onClick={() => setShowMore(!showMore)}
                    >
                      Show More +
                    </div>
                    {showMore ? (
                      <>
                        {/* Statement Descriptor */}
                        <div className={classes.inputWrapper}>
                          <div className="bold">Statement Descriptor</div>
                          <div className="primaryColor200">
                            {`Overrides default account descriptors. Used for
                          customers’ bank statements.`}
                          </div>
                          <input
                            className="input"
                            value={values.statementDescriptor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        {/* Unit Label */}
                        <div className={classes.inputWrapper}>
                          <div className="bold">Unit Label</div>
                          <div className="primaryColor200">
                            {`Describes how you sell your product, e.g. seats, 
                          tiers. Appears on each line item. Appears on receipts, 
                          invoices, at checkout, and on the customer portal.`}
                          </div>
                          <input
                            className="input"
                            value={values.unitLabel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        {/* Metadata */}
                        <div className={classes.inputWrapper}>
                          <div className="bold">Metadata</div>
                          <div className="primaryColor200">
                            {`Store additional, structured information.`}
                          </div>
                          <FieldArray name="metadata">
                            {({ remove }) =>
                              metadataRows.map((item, index) => {
                                // console.log("values = ", values);
                                return (
                                  <div
                                    className={classes.metadataRow}
                                    key={index}
                                  >
                                    <Field
                                      className={[
                                        classes.key,
                                        classes.input,
                                      ].join(" ")}
                                      name={`metadata.${index}.key`}
                                      placeholder="key"
                                    />
                                    <Field
                                      className={[
                                        classes.value,
                                        classes.input,
                                      ].join(" ")}
                                      name={`metadata.${index}.val`}
                                      placeholder="value"
                                    />
                                    <div
                                      onClick={() => {
                                        console.log("delete", index);
                                        remove(index);
                                        if (index > -1) {
                                          // only splice array when item is found
                                          console.log(
                                            "delete row",
                                            metadataRows
                                          );
                                          const newMetadata = [...metadataRows];
                                          const update = newMetadata.filter(
                                            (items, i) => i != index
                                          );
                                          setMetadataRows(update); // 2nd parameter means remove one item only
                                        }
                                      }}
                                      className={[
                                        classes.delete,
                                        classes.input,
                                      ].join(" ")}
                                    >
                                      X
                                    </div>
                                  </div>
                                );
                              })
                            }
                          </FieldArray>

                          <Button
                            onClick={() => {
                              metadataRows.push([
                                metadataLengthStr,
                                metadataLengthVal,
                              ]);
                              setMetadataLength(metadataLength + 2);
                            }}
                            type="rounded"
                          >
                            + Add More
                          </Button>
                        </div>

                        {/* Featured List */}
                        <div className={classes.inputWrapper}>
                          <div className="bold">Featured List</div>
                          <div className="primaryColor200">
                            {`Describe products with a line-by-line breakdown. Displayed in pricing tables.`}
                          </div>
                          <FieldArray name="features">
                            {({ remove }) =>
                              featureListRows.map((item, index) => {
                                console.log("values = ", values);
                                console.log("item = ", item);
                                return (
                                  <div
                                    className={classes.metadataRow}
                                    key={index}
                                  >
                                    <Field
                                      className={[
                                        classes.feat,
                                        classes.input,
                                      ].join(" ")}
                                      name={`features.${index}.name`}
                                      placeholder="feature"
                                    />
                                    <div
                                      onClick={() => {
                                        console.log("delete", index);
                                        remove(index);
                                        if (index > -1) {
                                          // only splice array when item is found
                                          console.log(
                                            "delete row",
                                            featureListRows
                                          );
                                          const newFeatureList = [
                                            ...featureListRows,
                                          ];
                                          const update = newFeatureList.filter(
                                            (items, i) => i != index
                                          );
                                          setFeatureListRows(update); // 2nd parameter means remove one item only
                                        }
                                      }}
                                      className={[
                                        classes.delete,
                                        classes.input,
                                      ].join(" ")}
                                    >
                                      X
                                    </div>
                                  </div>
                                );
                              })
                            }
                          </FieldArray>

                          <Button
                            onClick={() => {
                              featureListRows.push({
                                name: featureListLengthVal,
                              });
                              setFeatureListLength(featureListLength + 1);
                            }}
                            type="rounded"
                          >
                            + Feature List
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </form>
              </div>
              {/* Submit */}
              <div className={classes.submit}>
                <Button onClick={closeHandler} type="rounded" style="">
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
  updateProduct: PropTypes.func,
  product: PropTypes.object,
  setShowAddPriceSidebar: PropTypes.func,
  disableScrollUpdateProduct: PropTypes.func,
};

export default Sidebar;
