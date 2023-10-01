import axios from 'axios';
import * as actionTypes from '../constants/productContstant'

const URL = 'http://localhost:5000';

export const getProducts = () => async (dispatch) => {
    try {
            const { data } = await axios.get(`${URL}/products`);
            dispatch({
                type: actionTypes.GET_PRODUCTS_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_REQUEST,
        })
      
            const { data } = await axios.get(`${URL}/product/${id}`);
            dispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
                payload: data
            })
        
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}