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
