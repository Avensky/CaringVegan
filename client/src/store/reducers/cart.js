//import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/actionTypes/cart'
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  items: [],
  addedItems: [],
  shop: [],
  total: 0.0,
  totalItems: 0,
  totalPrice: 0,
  error: null,
  loading: false,
};

const getItemsStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getItemsFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const getItemsSuccess = (state, action) => {
  //console.log('get items = ' + action.items)
  return {
    ...state,
    items: action.items,
    loading: false,
  };
};

const addToCart = (state, action) => {
  let addedItem = state.items.find((item) => item._id === action.id);
  //console.log('addToCart addedItem = ' + JSON.stringify(addedItem))
  //console.log('addToCart addedItems = ' + JSON.stringify(state.addedItems))
  let existed_item = state.addedItems.find((item) => action.id === item._id);
  //console.log('addToCart existed_item = ' + JSON.stringify(existed_item))
  let stringMyAddedItems, total, totalItems, shop, addedItems;
  if (existed_item) {
    existed_item.amount += 1;
    //shop = state.items.map( obj => [addedItem].find(item => item._id === obj._id) || obj)
    //console.log('addToCart items = ' + JSON.stringify(state.items))
    addedItems = state.addedItems.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    //console.log('addToCart addedItems = ' + JSON.stringify(addedItems))
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    //console.log('addToCart shop if item exists = ' + JSON.stringify(shop))
    //make cart a string and store in local space
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    total = addedItems
      .map((item) => item.price * item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  } else {
    addedItem.amount = 1;
    shop = state.shop.map(
      (obj) => [addedItem].find((item) => item._id === obj._id) || obj
    );
    addedItems = [...state.addedItems, addedItem];
    //console.log('addToCart shop = ' + JSON.stringify(shop))
    //console.log('addToCart addedItems = ' + JSON.stringify(addedItems))
    //make cart a string and store in local space
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    total = addedItems
      .map((item) => item.price * item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  }
  return {
    ...state,
    addedItems: addedItems,
    total: total,
    totalItems: totalItems,
    shop: shop,
  };
};

const removeItem = (state, action) => {
  let existed_item = state.addedItems.find((item) => action.id === item._id);
  console.log("removeItem existed_item = " + JSON.stringify(existed_item));
  let quantityToRemove = existed_item.amount;
  console.log(
    "removeItem quantityToRemove = " + JSON.stringify(quantityToRemove)
  );
  delete existed_item.amount;
  console.log(
    "removeItem existed_item delete amount = " + JSON.stringify(existed_item)
  );
  let addedItems = state.addedItems.filter((item) => action.id !== item._id);
  let newTotal = state.total - existed_item.price * quantityToRemove;
  let shop = state.shop.map(
    (obj) => [existed_item].find((item) => item._id === obj._id) || obj
  );
  //store in local storage
  let stringNewItems = JSON.stringify(addedItems);
  localStorage.setItem("addedItems", stringNewItems);
  return {
    ...state,
    addedItems: addedItems,
    total: newTotal,
    totalItems: state.totalItems - quantityToRemove,
    shop: shop,
  };
};

const addQuantity = (state, action) => {
  let addedItem = state.addedItems.find((item) => item.id === action.id);
  addedItem.quantity += 1;
  let newTotal = state.total + addedItem.price;
  let new_items = state.addedItems.map(
    (obj) => [addedItem].find((o) => o.id === obj.id) || obj
  );
  //store in local storage
  let stringNewItems = JSON.stringify(new_items);
  localStorage.setItem("addedItems", stringNewItems);
  return {
    ...state,
    addedItems: new_items,
    total: newTotal,
    totalItems: state.totalItems + 1,
  };
};
const subQuantity = (state, action) => {
  console.log("subQuantity addedItems = " + JSON.stringify(state.addedItems));
  let existed_item = state.addedItems.find((item) => item._id === action.id);
  console.log("subQuantity existed_item = " + existed_item);
  let stringMyAddedItems, total, shop, addedItems;
  //if the qt == 0 then it should be removed
  if (existed_item.amount === 1) {
    existed_item.amount -= 1;
    addedItems = state.addedItems.filter((item) => item._id !== action.id);
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    total = state.total - existed_item.price;
    //store in local storage
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    return {
      ...state,
      addedItems: addedItems,
      total: total,
      totalItems: state.totalItems - 1,
      shop: shop,
    };
  } else {
    existed_item.amount -= 1;
    addedItems = state.addedItems.map(
      (obj) => [existed_item].find((o) => o._id === obj.id) || obj
    );
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    total = state.total - existed_item.price;
    //store in local storage
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    return {
      ...state,
      addedItems: addedItems,
      total: total,
      totalItems: state.totalItems - 1,
      shop: shop,
    };
  }
};
const addShipping = (state) => {
  return {
    state,
    total: state.total + 6,
  };
};

const subShipping = (state) => {
  return {
    state,
    total: state.total - 6,
  };
};

const loadCart = (state) => {
  let stringLocalAddedItems = localStorage.getItem("addedItems");
  //console.log('loadCart stringLocalAddedItems = ' + stringLocalAddedItems)
  let addedItems = [];
  let items = state.items;
  //console.log('loadCart state.items = ' + JSON.stringify(items))
  let shop, totalItems, total;

  if (stringLocalAddedItems) {
    let localAddedItems = JSON.parse(stringLocalAddedItems);
    addedItems = localAddedItems;
    console.log("loadCart state.addedItems = " + JSON.stringify(addedItems));
  }

  if (items.length > 0) {
    if (addedItems.length > 0) {
      //console.log('load shop = ' + JSON.stringify(items))
      shop = state.items.map(
        (obj) => addedItems.find((item) => item._id === obj._id) || obj
      );
      console.log("load shop with addedItems = " + JSON.stringify(shop));
    } else {
      shop = items;
      console.log("load shop without addedItems = " + JSON.stringify(shop));
    }
  }
  totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  total = addedItems
    .map((item) => item.price * item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  return {
    ...state,
    addedItems: addedItems,
    totalItems: totalItems,
    total: total,
    shop: shop,
  };
};

const checkoutStart = (state) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const checkoutFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const checkoutSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    checkout: action.response,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS_SUCCESS:
      return getItemsSuccess(state, action);
    case actionTypes.GET_ITEMS_FAIL:
      return getItemsFail(state, action);
    case actionTypes.GET_ITEMS_START:
      return getItemsStart(state, action);

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);
    case actionTypes.ADD_QUANTITY:
      return addQuantity(state, action);
    case actionTypes.SUB_QUANTITY:
      return subQuantity(state, action);
    case actionTypes.ADD_SHIPPING:
      return addShipping(state, action);
    case actionTypes.SUB_SHIPPING:
      return subShipping(state, action);
    case actionTypes.LOAD_CART:
      return loadCart(state, action);
    case actionTypes.CHECKOUT_START:
      return checkoutStart(state, action);
    case actionTypes.CHECKOUT_FAIL:
      return checkoutFail(state, action);
    case actionTypes.CHECKOUT_SUCCESS:
      return checkoutSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
