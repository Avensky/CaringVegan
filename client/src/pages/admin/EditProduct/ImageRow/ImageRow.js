import React, { useState } from "react";
import classes from "./ImageRow.module.css";
import ImageSlider from "../../../../components/ImageSlider/ImageSlider";
import { formatPrice } from "../../../../utility/utility";
import PropTypes from "prop-types";
import Button from "../../../../components/UI/Button/Button";
import Modal from "../../../../components/UI/Modal/Modal";

const ImageRow = (props) => {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const noImage =
    "https://caring-vegan.s3.us-west-2.amazonaws.com/assets/iStock-1416208685.jpg";

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
  const exportHandler = () => {
    console.log("exportHandler id: ", props.item);
    props.migrate(props.item);
    setShowExportModal(false);
  };

  let edit = (
    <div className={classes.editBar}>
      <Button
        type="rounded"
        onClick={() => {
          props.showSidebar(true);
        }}
        style="edit"
      >
        Edit
      </Button>
      <Button
        type="rounded"
        className={classes.archive}
        onClick={() => {
          setShowArchiveModal(true);
        }}
      >
        Archive
      </Button>
      {props.type === "internal" ? (
        <Button
          type="rounded"
          style="delete"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );

  if (props.item.active === false) {
    edit = (
      <div className={classes.editBar}>
        <Button
          onClick={() => {}}
          type="rounded"
          style="Disabled"
          disabled={true}
        >
          Edit
        </Button>
        <Button type="rounded" onClick={props.unarchive}>
          Unarchive
        </Button>
        {props.type === "internal" ? (
          <Button
            type="rounded"
            style="Disabled"
            disabled={true}
            onClick={() => {}}
          >
            Delete
          </Button>
        ) : null}
      </div>
    );
  }
  return (
    <div className={classes.HeaderWrapper}>
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
      <Modal
        show={showExportModal}
        modalClosed={() => setShowExportModal(false)}
        title="Export product"
        message="Does everything look okay? If so just click Export!"
        cancel="Cancel"
        continue="Export Product"
        continueHandler={() => exportHandler(props.id)}
      />
      <div className={classes.left}>
        <div className={classes.thumbnail}>
          <ImageSlider images={props.item.images || [noImage]} />
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.details}>
          {props.item.name ? (
            <div className={classes.name}>{props.item.name}</div>
          ) : null}
          {props.item.default_price ? (
            <div className={classes.price}>
              ${formatPrice(props.item.default_price.unit_amount)}
            </div>
          ) : null}
          {props.item.active === false ? (
            <div className={classes.archived}>Archied</div>
          ) : null}
        </div>
        <div className={classes.copy}>
          {props.type === "internal" ? (
            <Button
              type="rounded"
              onClick={() => {
                setShowExportModal(true);
              }}
            >
              Copy to Stripe
            </Button>
          ) : (
            <Button type="rounded" onClick={props.migrate}>
              Copy to MongoDB
            </Button>
          )}
        </div>

        {edit}
      </div>
    </div>
  );
};

ImageRow.propTypes = {
  id: PropTypes.string,
  item: PropTypes.object,
  continue: PropTypes.func,
  migrate: PropTypes.func,
  migrateStripe: PropTypes.func,
  archive: PropTypes.func,
  unarchive: PropTypes.func,
  delete: PropTypes.func,
  showSidebar: PropTypes.func,
  type: PropTypes.string,
};

export default ImageRow;
