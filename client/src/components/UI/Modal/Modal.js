import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from "prop-types";

const Modal = (props) => {
  return (
    <div className={classes.modalWrapper}>
      <Backdrop
        show={props.show}
        clicked={props.modalClosed}
        zIndex={props.zIndex}
      />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-title">{props.title}</div>
        <div className="modal-message">{props.message}</div>
        <div className="modal-selection">
          <div
            onClick={props.modalClosed}
            className={["modal-cancel", "modal-button"].join(" ")}
          >
            {props.cancel}
          </div>
          <div
            onClick={props.continueHandler}
            className={["modal-continue", "modal-button"].join(" ")}
          >
            {props.continue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  cancel: PropTypes.string,
  continue: PropTypes.string,
  continueHandler: PropTypes.func,
  setShowModal: PropTypes.func,
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
  zIndex: PropTypes.string,
};
