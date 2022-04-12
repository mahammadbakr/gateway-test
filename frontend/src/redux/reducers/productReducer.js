import {
  SET_ALL_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actionType/productConst";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALL_PRODUCTS:
      return { ...state, products: payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, payload] };
    case UPDATE_PRODUCT:
      // update  product
      return { ...state, products: payload };
    case DELETE_PRODUCT:
      // delete  product
      return { ...state, products: payload };
    default:
      return state;
  }
};
export default productReducer;
