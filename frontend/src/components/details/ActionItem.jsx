import React,{useState} from 'react'
import {Box, Button,styled} from '@mui/material';
import {ShoppingCart as Cart,FlashOn as Flash} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {addToCart} from '../../redux/actions/cartAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { paymentOrders, paymentVeriy } from '../../service/api';


const LeftContainer = styled(Box)(({theme})=>({
  minWidth: "40%",
  padding: "40px 0 0 80px",
  [theme.breakpoints.down('lg')]: {
     padding: "20px 40px"
  }
}));

const Image = styled('img')({
    width: "95%",
    padding: "15px"
});

const StyledButton = styled(Button)(({theme})=>({
   width: "48%",
   height: "50px",
   borderRadius: "2px",
   [theme.breakpoints.down('lg')]:{
    width: "46%"
   },
   [theme.breakpoints.down('sm')]:{
     width: "48%"
   }
}));

const ActionItem = ({product}) => {

  const [quantity,setQuantity] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {id} = product;

  const addItemToCart = () => {
    const token = window.localStorage.getItem('authToken');
    if(token){
    dispatch(addToCart(id,quantity));
     navigate("/cart");
    }
    else{
      toast.error('Please log in first to add items to your cart.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
      });
    }
  }

  const handleOpenRazorPay = async(data) => {
    const options = {
      key: "rzp_test_6KsemjonNAURfU",
      amount: Number(data.amount),
      currency: data.currency,
      name: "FlipClone",
      description: "One Place For Everything",
      order_id: data.id,
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        console.log(response, "34");
        let res = await paymentVeriy(response);
        if(res.status!==200){
          console.log(res);
        }
        else{
         console.log(res,"37");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handlePayment = async(amount) => {
      const _data = {amount};
      let response = await paymentOrders(_data);
      if(response.status!==200) return;
      console.log(response);
      handleOpenRazorPay(response.data.data);
  }


  return (
    <LeftContainer>
        <Box style={{width: "90%",padding: '15px 20px',border: "1px solid #f0f0f0"}}>
      <Image src={product.detailUrl} alt='detail'/>
        </Box>
      <StyledButton variant='contained' onClick={()=>addItemToCart()} style={{marginRight:10,background:"#ff9f00"}}><Cart/>Add to Cart</StyledButton>
      <StyledButton variant='contained' onClick={()=>handlePayment(product.price.cost)} style={{background:"#fb541b"}}><Flash/>Buy Now</StyledButton>
      <ToastContainer/>
    </LeftContainer>
  )
}

export default ActionItem
