import * as actionTypes from "./actionTypes";

// ===================================================================
// RESIZE ============================================================
// ===================================================================
export const resize = () => {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  // console.log(width);
  return { type: actionTypes.RESIZE, width };
};
// ===================================================================
// Show Add Product ==================================================
// ===================================================================
export const showSidebar = (show, sidebar) => {
  return { type: actionTypes.SHOW_SIDEBAR, show, sidebar };
};
// ===================================================================
// Show Update Product Sidebar =======================================
// ===================================================================
export const showUpdateProductSidebar = (show) => {
  return { type: actionTypes.SHOW_UPDATE_PRODUCT_SIDEBAR, show };
};

// ===================================================================
// Show Add Price Sidebar ============================================
// ===================================================================
export const showAddPriceSidebar = (show) => {
  return { type: actionTypes.SHOW_ADD_PRICE_SIDEBAR, show };
};
