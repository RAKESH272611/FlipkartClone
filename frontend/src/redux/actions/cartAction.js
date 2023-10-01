import axios from 'axios';
import * as actionType from '../constants/cartConstant'

const URL = "http://localhost:5000";

export const retrieveCart = (response) => async(dispatch) => {
  try{
    console.log(response);
     dispatch({
       type: actionType.RETREIVE_CART,
       payload: response.data.user.cart
     })
    }catch(error){
      dispatch({
      type: actionType.RETREIVE_CART_ERROR,
      payload: error.message
      })
    }
}

export const addToCart=(id,quantity) => async(dispatch)=> {
   try{
      const {data} = await axios.get(`${URL}/product/${id}`);
      const token = window.localStorage.getItem('authToken')
      console.log(token);
      await axios.patch(`${URL}/cart/add/${id}`,data,{
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      dispatch({
        type: actionType.ADD_TO_CART,
        payload: {
            ...data,
            quantity
        }
      })
   }catch(error){
      dispatch({
        type: actionType.ADD_TO_CART_ERROR,
        payload: error.message
      })
   }
}

export const removeFromCart = (id) => async(dispatch)=> {
  const token = window.localStorage.getItem('authToken');
  await axios.patch(`${URL}/cart/remove/${id}`,id,{
    headers: {
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    }
  });;
    dispatch({
        type: actionType.REMOVE_FROM_CART,
        payload: id
    })
}

export const removeItem = () => async(dispatch)=>{
  const token = window.localStorage.getItem('authToken');
  // console.log(token);
  const demo = "remove";
   await axios.patch(`${URL}/cart/remove`,demo,{
    headers: {
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    }
  });
  dispatch({
    type:actionType.REMOVE_ALL
  })
}

export const removeItemsAfterLogOut = () => async(dispatch) => {
  dispatch({
    type: actionType.REMOVE_ALL
  })
}