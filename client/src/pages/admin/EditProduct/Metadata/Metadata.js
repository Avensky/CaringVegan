import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classes from "./Metadata.module.css";
import Button from "../../../../components/UI/Button/Button";
import { FieldArray, Formik, Field, Form } from "formik";

const Metadata = (props) => {
  let initialValues = {};
  // const validationSchema = {};
  let metadata = props.product.metadata || {};
  const dataObj = Object.entries(metadata) || [];
  // console.log("dataObj = ", dataObj);

  const [show, setShow] = useState(false);
  // const [addObj, setAddObj] = useState();
  // const rows = [];

  const [rows, setRows] = useState(dataObj);
  console.log("Rows = ", rows);

  useEffect(() => {
    if (rows.length === 0) {
      setRows(dataObj);
    }
  }, []);

  const [dataLength, setDataLength] = useState(dataObj.length * 2);
  let dataLengthStr = JSON.stringify(dataLength);
  dataLengthStr = `new_${dataLength}`;
  let dataLengthVal = `${dataLengthStr}_val`;
  // console.log("datalength", dataLength);

  let content;

  if (metadata && show) {
    dataObj.map(([key, val], index) => {
      // console.log(`${key}:${val}`);

      initialValues[`${index}`] = {
        key: key,
        val: val,
      };
      // initialValues[`${index}`][`${val}`] = val;
    });
    // console.log("initialValues: ", initialValues);
    // initialValues = Object.entries(initialValues);
    // console.log("initialValues: ", initialValues);
    initialValues = { metadata: initialValues };
    console.log("initialValues: ", initialValues);

    content = (
      <>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, submitProps) => {
            setTimeout(() => {
              let submit = {};
              console.log("values: ", values);
              const valuesObj = values.metadata;
              // const valuesObj = Object.entries(values.metadata);
              console.log("valuesObj", valuesObj);
              const valuesLength = valuesObj.length;
              console.log("valuesObj length", valuesLength);

              for (let i = 0; i < valuesLength; i++) {
                const key = valuesObj[i]["key"];
                const val = valuesObj[i]["val"];
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
          {({ handleSubmit, isSubmitting, isValid, values }) => (
            <div className={classes.Form}>
              <FieldArray
                name="metadata"
                render={({ remove }) => {
                  console.log("values = ", values);
                  return (
                    <Form>
                      {rows.map((item, index) => {
                        // console.log("dataObj = ", dataObj);
                        // console.log("index = ", index);

                        return (
                          <div className={classes.row} key={index}>
                            <Field
                              className={[classes.key, classes.input].join(" ")}
                              name={`metadata.${index}.key`}
                              placeholder="key"
                            />
                            <Field
                              className={[classes.value, classes.input].join(
                                " "
                              )}
                              name={`metadata.${index}.val`}
                              placeholder="value"
                            />
                            <div
                              onClick={() => {
                                console.log("delete", index);
                                remove(index);
                                if (index > -1) {
                                  // only splice array when item is found
                                  console.log("delete row", rows);
                                  const newRows = [...rows];
                                  const update = newRows.filter(
                                    (items, i) => i != index
                                  );
                                  setRows(update); // 2nd parameter means remove one item only
                                }
                              }}
                              className={[classes.delete, classes.input].join(
                                " "
                              )}
                            >
                              X
                            </div>
                          </div>
                        );
                      })}
                    </Form>
                  );
                }}
              />
              <div className={classes.SubmitBar}>
                <div>
                  <Button
                    onClick={() => {
                      rows.push([dataLengthStr, dataLengthVal]);
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
      // console.log(dataObj);
      // console.log("key", key);
      // console.log("val", value);
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
              setRows(dataObj);
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
