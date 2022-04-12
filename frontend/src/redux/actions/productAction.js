import axiosApp from "../../configs/axios";
import { errorParser } from "../../helper/ErrorParser";
import {
  SET_ALL_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actionType/productConst";

export const getProductsInBackend = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    axiosApp
      .get(`/products/`)
      .then((productList) => {
        console.log("productList=>", productList)
        dispatch(setAllProducts(productList?.data?.data));
        resolve("done");
      })
      .catch((error) => {
        console.log(error);
        reject(errorParser(error));
      });
  });


export const addProductInBackend = (data) => (dispatch, getState) =>

  new Promise((resolve, reject) => {
    dispatch(addProduct(data));
    axiosApp.post("/products/", {
      "title": `${data?.title}`,
      "content": `${data?.content}`
    })
      .then(({ data }) => {
        console.log("response=>", data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


export const setAllProducts = (data) => (dispatch) =>
  dispatch({
    type: SET_ALL_PRODUCTS,
    payload: data,
  });


export const addProduct = (data) => (dispatch) =>
  dispatch({
    type: ADD_PRODUCT,
    payload: data,
  });

export const deleteProduct = (data) => (dispatch) =>
  dispatch({
    type: DELETE_PRODUCT,
    payload: data,
  });


export const updateProduct = (data) => (dispatch) =>
  dispatch({
    type: UPDATE_PRODUCT,
    payload: data,
  });
