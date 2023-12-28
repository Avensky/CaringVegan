import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./Metadata.module.css";
import Button from "../../../../components/UI/Button/Button";
import { Formik } from "formik";

const Metadata = (props) => {
  let initialValues = {};
  // const validationSchema = {};
  let metadata = props.product.metadata;
  const dataObj = Object.entries(metadata);

  const [show, setShow] = useState(false);
  // const [addObj, setAddObj] = useState();
  const [rows, setRows] = useState([]);
  const [dataLength, setDataLength] = useState(dataObj.length * 2);
  let dataLengthStr = JSON.stringify(dataLength);
  dataLengthStr = `new${dataLength}`;
  let dataLengthVal = `new${dataLengthStr}_val`;
  // console.log("datalength", dataLength);

  let content;

  if (metadata && show) {
    dataObj.map(([key, val]) => {
      // console.log(`${key}:${val}`);
      initialValues[`cur${key}`] = key;
      initialValues[`cur${key}` + "_val"] = val;
    });
    console.log("initialValues: ", initialValues);
    content = (
      <>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values, submitProps) => {
            setTimeout(() => {
              let submit = {};
              console.log("values: ", values);
              const valuesObj = Object.entries(values);
              console.log("valuesObj", valuesObj);
              const valuesLength = valuesObj.length;
              console.log("valuesObj", valuesLength);

              for (let i = 0; i < valuesLength; i += 2) {
                const key = valuesObj[i][1];
                const val = valuesObj[i + 1][1];
                console.log("key", key);
                console.log("val", val);
                submit[key] = val;
              }
              console.log("submit", submit);

              const final = { metadata: submit };
              alert(JSON.stringify(final, null, 2));
              props.updateProduct(final, props.product._id);
              // props.updateProduct(final, props.product._id);
              submitProps.setSubmitting(false);
              submitProps.resetForm();
              setShow(false);
            }, 1000);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            // setValues,
            values,
            isSubmitting,
            isValid,
          }) => (
            <div className={classes.Form}>
              <form
                onSubmit={handleSubmit}
                method="post"
                encType="multipart/form-data"
              >
                {dataObj.map(([key, i]) => {
                  console.log("index = ", i);
                  return (
                    <div className={classes.row} key={`cur${key}`}>
                      <input
                        className={[classes.key, classes.input].join(" ")}
                        name={`cur${key}`}
                        placeholder="key"
                        type="string"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`cur${key}`]}
                      />
                      <input
                        className={[classes.value, classes.input].join(" ")}
                        name={`cur${key}_val`}
                        placeholder="value"
                        type="string"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`cur${key}_val`]}
                      />
                      <span
                        onClick={() => {
                          console.log(i);
                          const index = rows.indexOf(i);
                          if (index > -1) {
                            // only splice array when item is found
                            rows.splice(index, 1); // 2nd parameter means remove one item only
                          }
                        }}
                        className={[classes.delete, classes.input].join(" ")}
                      >
                        X
                      </span>
                    </div>
                  );
                })}

                {rows.map((el) => {
                  return el;
                })}
              </form>
              <div className={classes.SubmitBar}>
                <div>
                  <Button
                    onClick={() => {
                      rows.push(
                        <div className={classes.row}>
                          <input
                            className={[classes.key, classes.input].join(" ")}
                            name={dataLengthStr}
                            placeholder="key"
                            type="string"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[dataLengthStr]}
                          />
                          <input
                            className={[classes.value, classes.input].join(" ")}
                            name={dataLengthVal}
                            placeholder="value"
                            type="string"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values[dataLengthVal]}
                          />
                          <span
                            onClick={() => {}}
                            className={[classes.delete, classes.input].join(
                              " "
                            )}
                          >
                            X
                          </span>
                        </div>
                      );

                      // setValues({ ...values });
                      // setRows(rows);
                      setDataLength(dataLength + 2);
                    }}
                    type="rounded"
                  >
                    + Add another item
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setShow(false);
                    }}
                    type="rounded"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style="Purple"
                    disabled={!isValid || isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </>
    );
  } else if (metadata) {
    // console.log("metadata", metadata);
    // const length = Object.keys(metadata).length;
    // console.log("metadata length", length);

    content = dataObj.map(([key, value]) => {
      console.log(dataObj);
      console.log("key", key);
      console.log("val", value);
      return (
        <div className={classes.row} key={key}>
          <div className={[classes.key, classes.inputFake].join(" ")}>
            {key}
          </div>
          <div className={[classes.value, classes.inputFake].join(" ")}>
            {value}
          </div>
          <span
            className={[classes.delete, classes.inputFake].join(" ")}
          ></span>
        </div>
      );
    });
  }

  return (
    <div className={classes.Metadata}>
      <div className={classes.heading}>
        <div className={classes.left}>Metadata</div>
        <div className={classes.right}>
          <Button
            type="rounded"
            onClick={() => {
              setRows([]);
              setShow(!show);
            }}
          >
            Edit Metadata
          </Button>
        </div>
      </div>
      <div className={classes.content}>{content}</div>
    </div>
  );
};

Metadata.propTypes = {
  product: PropTypes.object,
  updateProduct: PropTypes.func,
};

export default Metadata;
