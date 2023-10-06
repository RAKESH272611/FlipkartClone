import Razorpay from "razorpay";
import crypto from "crypto";

export const paymentOrders = async(req,res) => {
    let instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });
    
      var options = {
        amount: req.body.amount * 100, // amount in the smallest currency unit
        currency: "INR",
        //   receipt: "order_rcptid_11",
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
          return res.send({ code: 500, message: "Server error...." });
        }
        return res.send({ code: 200, message: "Order created....", data: order });
      });
}


export const paymentVerify = async(req,res) => {
    let body = req.body.response.razorpay_order_id + "|" +req.body.response.razorpay_payment_id;
  var generated_signature = crypto
    .createHmac("SHA256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
//match
  if (generated_signature === req.body.response.razorpay_signature) {
    res.send({ code: 200, message: "Signature valid" });
  } else {
    res.send({ code: 500, message: "Signature Invalid" });
  }
}