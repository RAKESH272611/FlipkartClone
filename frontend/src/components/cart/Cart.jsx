import React from 'react'
import {useSelector} from 'react-redux';
import {Typography,Box,Grid,styled, Button} from '@mui/material';
import CartItem from './CartItem';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import { useDispatch } from 'react-redux';
import {removeItem} from '../../redux/actions/cartAction'


const Container = styled(Grid)(({theme})=>({
    padding: "30px 135px",
    [theme.breakpoints.down('md')]:{
        padding: "15px 0"
    }
}))


const Header = styled(Grid)`
  padding: 15px 24px;
  background: #fff;
`;

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
   display: flex;
   margin-left: auto;
   color: #fff;
   background: #fb641b;
   width: 250px;
   height: 51px;
   border-radius: 2px;
`;

const LeftComponent = styled(Grid)(({theme})=>({
    paddingRight: "15px",
    [theme.breakpoints.down('md')]:{
        marginBottom: 15
    }
}))

const Cart = () => {

  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart)

  const removeAllItem = () => {
    dispatch(removeItem());
  }


  return (
    <>
    {
        cartItems.length ? 
         <Container container>
            <LeftComponent item lg={9} md={9} sm={12} xs={12}>
               <Header>
                  <Typography>My Cart ({cartItems.length})</Typography>
               </Header>
               {
                 cartItems.map(item=>{
                   return( <CartItem item={item}/>);
                 })
               }
               <ButtonWrapper>
                <StyledButton onClick={()=>removeAllItem()}>Place Order</StyledButton>
               </ButtonWrapper>
            </LeftComponent>
            <Grid item lg={3} md={3} sm={12} xs={12}>
                 <TotalView cartItems={cartItems}/>
            </Grid>
         </Container>
        : <EmptyCart/>
    }
    </>
  )
}

export default Cart
