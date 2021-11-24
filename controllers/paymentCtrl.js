const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePayments : async(req,res) => {
    try{
       var status = 'waiting'

        const {shippingstatus,time} = req.body  
        console.log(shippingstatus)
        console.log(time)
        if(shippingstatus==='Waiting'){ status = "Xác nhận giao hàng"}
        if(shippingstatus==='Xác nhận giao hàng'){status= "Đã xuất kho"}
            await Payments.findOneAndUpdate({_id:req.params.id},{
                shippingstatus : status, time : time 
            })
            //const payments = await Payments.find({shippingstatus : date})
            res.json({status:'cofirm shipping'})
           // console.log(status)
            //console.log(payments.shippingstatus)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateDone : async (req,res) => {
        try{
            var status = 'status'
            const {shippingstatus,time,total} = req.body 
            if(shippingstatus === "Đã xuất kho") {status = "Hoàn tất nhận hàng"}
            await Payments.findOneAndUpdate({_id:req.params.id},{
                shippingstatus : status, time : time, pay : total
            })
            res.json({status:'cofirm shipping'}) 
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const {cart, paymentID, address,shipname,shipaddress,shipcity,shipstate,shipphone,pay,total} = req.body;
            const {_id, name, email} = user;
            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address,shipname,shipaddress,shipcity,shipstate,shipphone,pay,total
            })
            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })
            await newPayment.save()
            res.json({msg: "Payment Success!"})
            //console.log(newPayment)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl
