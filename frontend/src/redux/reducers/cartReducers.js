import * as actionType from '../constants/cartConstant'

export const cartReducer = (state={cartItems: []},action) => {
   switch(action.type){
     case actionType.RETREIVE_CART:
        return {...state,cartItems: action.payload}
     case actionType.ADD_TO_CART:
        const item = action.payload;
        const exist = state.cartItems.find(product=>product.id===item.id);
        if(exist){
            return state;
        }
        else{
            return {...state,cartItems:[...state.cartItems,item]};
        }
     case actionType.REMOVE_FROM_CART:
        return {...state,cartItems:state.cartItems.filter(product=>product.id!==action.payload)};
     case actionType.REMOVE_ALL:
      return { ...state, cartItems: [] };
     default: 
        return state;
   }
}