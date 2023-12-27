import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";
import Button from "../../../../components/UI/Button/Button";

const Dropdown = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="dropdown">
      <Button onClick={() => setShow(!show)} type="rounded">
        {props.text}
      </Button>
      {show ? (
        <ul className="menu">
          {props.menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Dropdown.propTypes = {
  text: PropTypes.string,
  menu: PropTypes.any,
  style: PropTypes.string,
};

export default Dropdown;
