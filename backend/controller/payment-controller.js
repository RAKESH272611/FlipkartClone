import Razorpay from "razorpay";
import crypto from "crypto";

export const paymentOrders = async(req,res) => {
    let instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });
      // console.log(req.body.amount);
      var options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        //   receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err);
          return res.status(500).json({message: "Server error...." });
        }
        return res.status(200).json({message: "Order created....", data: order });
      });
}


export const paymentVerify = async(req,res) => {
    let body = req.body.razorpay_order_id + "|" +req.body.razorpay_payment_id;
  var generated_signature = crypto
    .createHmac("SHA256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
//match
  if (generated_signature === req.body.razorpay_signature) {
    res.status(200).json({ message: "Signature valid" });
  } else {
    res.status(500).json({message: "Signature Invalid" });
  }
}