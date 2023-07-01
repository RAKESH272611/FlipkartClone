import { products } from "./constant/data.js"
import Product from "./models/product-schema.js";

const defaultData = async() => {
    try{
       await Product.insertMany(products);
       console.log("Data imported Successfully");
    }catch(error){
        console.log("error",error.message);
    }
}

export default defaultData;