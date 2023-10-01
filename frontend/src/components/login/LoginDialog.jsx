import React, { useState, useContext, useEffect } from 'react'
import { Dialog, Box, TextField, Typography, Button, styled } from '@mui/material'
import { authenticateSignup, authenticateLogin, authenticateToken } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useDispatch } from 'react-redux';
import { retrieveCart } from '../../redux/actions/cartAction';

const Component = styled(Box)`
     height: 70vh;
     width: 90vh;
`;

const Image = styled(Box)`
   background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
   height: 82.7%;
   width: 30%;
   padding: 45px 35px;
   &>p,&>h5{
    color: #FFFFFF;
    font-weight: 600;
   }
`;

const Wrapper = styled(Box)`
   display: flex;
   flex-direction: column;
   padding: 25px 35px;
   flex: 1;
   &>div,&>button,&>p{
    margin-top: 20px;
   }
`;

const LoginButton = styled(Button)`
  text-transform : none;
  background: #FB641B;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform : none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
   font-size: 12px;
   color: #878787;
`;

const CreateAccount = styled(Typography)`
   font-size: 14px;
   text-align: center;
   color: #2874f0;
   font-weight: 600;
   cursor: pointer
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const accountInitialValues = {
   login: {
      view: 'login',
      heading: 'Login',
      subHeading: 'Get access to your Orders, Wishlist and Recommendations'
   },
   signup: {
      view: 'signup',
      heading: "Looks like you're new here!",
      subHeading: "Sign up with your mobile number to get started"
   }
}

const signupInitialValues = {
   firstname: '',
   lastname: '',
   username: '',
   email: '',
   password: '',
   phone: ''
}

const loginInitialValues = {
   username: '',
   password: ''
}

const LoginDialog = ({ open, setOpen }) => {

   const dispatch = useDispatch();

   const [account, toggleAccount] = useState(accountInitialValues.login);
   const [signup, setSignup] = useState(signupInitialValues);
   const [login, setLogin] = useState(loginInitialValues);
   const [error, setError] = useState(false);

   const { setAccount } = useContext(DataContext);

   const handleClose = () => {
      setOpen(false);
      toggleAccount(accountInitialValues.login);
      setError(false);
   }

   const toggleSignUp = () => {
      toggleAccount(accountInitialValues.signup);
   }

   const onInputChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value });
   }

   const signupUser = async () => {
      let response = await authenticateSignup(signup);
      if (!response) return;
      // console.log(response.data.authToken)
      if (response.data.authtoken)
         window.localStorage.setItem('authToken', response.data.authtoken)
      handleClose();
      setAccount(signup.firstname);
   }

   const onValueChange = (e) => {
      setLogin({ ...login, [e.target.name]: e.target.value });
   }

   const loginUser = async () => {
      let response = await authenticateLogin(login);
      // console.log(response.data);
      if (response.status === 200) {
         handleClose();
         setAccount(response.data.user.firstname);
         dispatch(retrieveCart(response));
         window.localStorage.setItem('authToken', response.data.authtoken)
      }
      else {
         setError(true);
      }
   }

   const loginToken = async() => {
       let token = window.localStorage.getItem('authToken');
      //  console.log(token);
       if(token){
       let response = await authenticateToken(token);
      //  console.log(response.status);
       if(response.status===200){
         setAccount(response.data.user.firstname);
         dispatch(retrieveCart(response));
       }
       else{
         window.localStorage.removeItem('authToken');
       }
      }
   }

   useEffect(()=>{
       loginToken();
   },[])

   return (
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
         <Component>
            <Box style={{ display: "flex", height: "100%" }}>
               <Image>
                  <Typography variant='h5'>{account.heading}</Typography>
                  <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
               </Image>
               {account.view === 'login' ?
                  <Wrapper>
                     <TextField variant='standard' onChange={onValueChange} name='username' label="Enter Username" />
                     {error ? <Error>Please enter valid username or password</Error> : ""}
                     <TextField variant='standard' onChange={onValueChange} name='password' label="Enter Password" />
                     <Text>By Continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                     <LoginButton onClick={loginUser}>Login</LoginButton>
                     <Typography style={{ textAlign: 'center' }}>OR</Typography>
                     <RequestOTP>Request OTP</RequestOTP>
                     <CreateAccount onClick={() => toggleSignUp()}>New to Flipkart? Create an account</CreateAccount>
                  </Wrapper>
                  :
                  <Wrapper>
                     <TextField variant='standard' onChange={onInputChange} name='firstname' label="Enter Firstname" />
                     <TextField variant='standard' onChange={onInputChange} name='lastname' label="Enter Lastname" />
                     <TextField variant='standard' onChange={onInputChange} name='username' label="Enter Username" />
                     <TextField variant='standard' onChange={onInputChange} name='email' label="Enter Email" />
                     <TextField variant='standard' onChange={onInputChange} name='password' label="Enter Password" />
                     <TextField variant='standard' onChange={onInputChange} name='phone' label="Enter Phone" />
                     <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                  </Wrapper>
               }
            </Box>
         </Component>
      </Dialog>
   )
}

export default LoginDialog
