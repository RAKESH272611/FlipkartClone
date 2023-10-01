import Product from '../models/product-schema.js';

export const getProducts = async(req,res) => {
  try{
    // console.log(req,req?.headers)
    const products = await Product.find({});
    res.status(200).json(products)
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

export const getProductById = async(req,res)=>{
  try{
    const id = req.params.id;
    const product = await Product.findOne({'id':id});
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({message: error.message});
  }
}