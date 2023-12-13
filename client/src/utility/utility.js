import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on new routes
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const formatRoute = (params) => {
  console.log("params: ", params);
  let string;
  if (
    params.active ||
    params.page ||
    params.limit ||
    params.index ||
    params.starting_after ||
    params.ending_before
  ) {
    if (params.active != undefined) {
      console.log("params.active != undefined", params.active);
      string = `?active=${params.active}`;
    }
    if (params.limit !== undefined) {
      if (string === undefined) {
        // console.log("string === undefined");
        // console.log("params.limit: ", params.limit);
        string = `?limit=${params.limit}`;
        // console.log("string: ", string);
      } else {
        // console.log("else");
        const limit = `limit=${params.limit}`;
        let join = [string, limit].join("&");
        string = `${join}`;
      }
    }

    if (params.page !== undefined) {
      console.log("params.page ", params.page);
      if (string === undefined) {
        string = `?page=${params.page}`;
      } else {
        const page = `page=${params.page}`;
        let join = [string, page].join("&");
        string = `${join}`;
      }
    }

    if (params.ending_before) {
      if (string === undefined) {
        string = `?ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`;
      } else {
        const ending_before = `&ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`;
        let join = [string, ending_before].join("");
        string = `${join}`;
      }
    }

    if (params.starting_after) {
      console.log("params.starting_after: ", string);
      if (string === undefined) {
        string = `?starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`;
      } else {
        console.log("string final", string);
        const starting_after = `&starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`;
        let join = [string, starting_after].join("");
        string = `${join}`;
      }
    }
  }
  return string;
};

export const formatPrice = (unit_amount) => {
  return `$${(unit_amount / 100).toFixed(2)}`;
};

export const formatDate = (date, type) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let formatDate = new Date(date);
  if (type === "stripe") {
    formatDate = new Date(date * 1000);
  }

  const day = formatDate.getDate();
  const month = months[formatDate.getMonth()];
  const year = formatDate.getFullYear();
  return `${month} ${day}, ${year}`;
};

// copy object and update new object properties
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// search for item in array
export const findItem = (array, id) => {
  return array.find((item) => item.id === id);
};

// replace item in array of objects with matching id
export const updateArray = (currentArray, updatedItem) => {
  return currentArray.map(
    (obj) => [updatedItem].find((item) => item.id === obj.id) || obj
  );
};

// multiply item.price by cartAmount in cart, then add each total
export const getTotalPrice = (cart) => {
  return cart
    .map((item) => item.default_price.unit_amount * item.cartAmount)
    .reduce((prev, curr) => prev + curr, 0);
};

// get totalNumber of items
export const getTotalItems = (cart) => {
  return cart.reduce((a, b) => a + b.cartAmount, 0);
};

// Copy array
export const copyArray = (array) => {
  return JSON.parse(JSON.stringify(array));
};

// remove Item from array
export const removeItem = (array, id) => {
  return array.filter((item) => item._id !== id);
};

// add Item to array
export const addItem = (array, item) => {
  return array.splice(1, 0, item);
};

// stringify and store cart session in browser
export const storeLocally = (arrayName, array) => {
  let arrayString = JSON.stringify(array);
  localStorage.setItem(arrayName, arrayString);
};

export const getLocalStorage = async (name) => {
  console.log(" getLocalStorage ", name);
  let arrayString = localStorage.getItem(name);
  console.log("arrayString", arrayString);
  let array = [];
  if (arrayString) {
    array = JSON.parse(arrayString);
  }

  console.log("load " + name + ": " + array);
  return array;
};
