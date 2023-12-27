import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./Metadata.module.css";
import Button from "../../../../components/UI/Button/Button";
import { Formik } from "formik";

const Metadata = (props) => {
  const [show, setShow] = useState(false);
  let initialValues = {};
  // const validationSchema = {};

  let metadata = props.product.metadata;
  let content;
  if (metadata && show) {
    metadata.map((obj) => {
      const entries = Object.entries(obj);
      entries.map(([key, val]) => {
        // const keyString = JSON.stringify(key);
        console.log(`${key}:${val}`);

        initialValues[`${key}`] = key;
        initialValues[`${key}_val`] = val;
      });
    });
    console.log("initialValues: ", initialValues);

    content = (
      <>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values, submitProps) => {
            setTimeout(() => {
              let submit = [];

              metadata.map((obj) => {
                console.log("obj: ", obj);
                const entries = Object.entries(obj);

                entries.map(([key]) => {
                  console.log("key");
                  const entry = {};
                  entry[`${key}`] = values[`${key}_val`];
                  console.log("ENTRY", entry);
                  submit.push(entry);
                });
              });

              console.log("submit", submit);
              const final = { metadata: submit };
              alert(JSON.stringify(final, null, 2));
              props.updateProduct(final, props.product._id);
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
                {metadata.map((obj) => {
                  let data = Object.entries(obj).map(([key]) => {
                    return (
                      <div className={classes.row} key={key}>
                        <input
                          className={[classes.key, classes.input].join(" ")}
                          name={key}
                          type="string"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[key]}
                        />
                        <input
                          className={[classes.value, classes.input].join(" ")}
                          name={`${key}_val`}
                          type="string"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[`${key}_val`]}
                        />
                      </div>
                    );
                  });
                  return data;
                })}
              </form>
              <div className={classes.SubmitBar}>
                <div>
                  <Button onClick={() => {}} type="rounded">
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

        <div className={classes.add}></div>
      </>
    );
  } else if (metadata) {
    // console.log("metadata", metadata);
    // console.log("entries", metadata);
    content = metadata.map((obj) => {
      // console.log("obj", obj);
      let data;
      data = Object.entries(obj).map(([key, val]) => {
        // console.log(`${key}:${val}`);
        return (
          <div className={classes.row} key={key}>
            <div className={[classes.key, classes.inputFake].join(" ")}>
              {key}
            </div>
            <div className={[classes.value, classes.inputFake].join(" ")}>
              {val}
            </div>
          </div>
        );
      });
      return data;
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
