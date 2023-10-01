import axios from 'axios';

const URL = 'http://localhost:5000';

export const authenticateSignup = async(data) => {
    try{
      return await axios.post(`${URL}/signup`,data);
    }catch(error){
         console.log("Error while calling signup",error);
    }
}

export const authenticateLogin = async(data) => {
    try{
      return await axios.post(`${URL}/login`,data);
    }catch(error){
         console.log("Error while calling login",error);
         return error.response;
    }
}

export const authenticateToken = async(token) => {
  try {
    const response = await axios.get(`${URL}/TokenVerify`, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    
    // Assuming the response contains the verification result or user data
    return response;
  } catch (error) {
    // Handle errors, such as token validation failure or network issues
    return error.response; // This may contain an error message or status code
  }
}







