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
