import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./CatalogItems.module.css";
import { formatPrice, formatDate } from "../../../../utility/utility";
import { NavLink } from "react-router-dom";
import Modal from "../../../../components/UI/Modal/Modal";

const CatalogItem = (props) => {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const archiveHandler = () => {
    console.log("archiveHandler id: ", props.id);
    props.archive(props.id);
    setShowArchiveModal(false);
  };
  const deleteHandler = () => {
    console.log("deleteHandler id: ", props.id);
    props.delete(props.id);
    setShowDeleteModal(false);
  };

  const noImage =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/iStock-1416208685.jpg";

  return (
    <div key={props.id} className={classes.itemWrapper}>
      <Modal
        show={showArchiveModal}
        modalClosed={() => setShowArchiveModal(false)}
        title="Archive product"
        message="Archive will hide this product from purchases. Are you sure you want
        to archive this product?"
        cancel="Cancel"
        continue="Archive Product"
        continueHandler={() => archiveHandler(props.id)}
      />
      <Modal
        show={showDeleteModal}
        modalClosed={() => setShowDeleteModal(false)}
        title="Delete product"
        message="Delete will perminantly remove this product. This action can not be undone, are you sure you want
        to delete this product?"
        cancel="Cancel"
        continue="Delete Product"
        continueHandler={() => deleteHandler(props.id)}
      />
      <div className={classes.imageWrapper}>
        <img className={classes.image} src={props.images[0] || noImage} />
      </div>
      <div className={classes.details}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>{formatPrice(props.price)}</div>
      </div>
      <div className={classes.created}>
        {formatDate(props.created, props.type)}
      </div>
      <div className={classes.updated}>
        {formatDate(props.updated, props.type)}
      </div>
      <div className={classes.editWrapper}>
        <NavLink to={props.editLink} className={classes.edit}>
          Edit
        </NavLink>
        {/* <div>Archive</div> */}
        <div onClick={() => setShowArchiveModal(true)}>Archive</div>

        <div
          onClick={() => setShowDeleteModal(true)}
          className={classes.delete}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

CatalogItem.propTypes = {
  id: PropTypes.string,
  images: PropTypes.array,
  name: PropTypes.string,
  unit_amount: PropTypes.number,
  price: PropTypes.number,
  created: PropTypes.any,
  updated: PropTypes.any,
  delete: PropTypes.func,
  editLink: PropTypes.string,
  archive: PropTypes.func,
  type: PropTypes.string,
};

export default CatalogItem;
