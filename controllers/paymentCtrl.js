const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')
const nodemailer =require('nodemailer')

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
            await sendmail(email)
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

const sendmail = async (email) => {
    try{
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nbj19712@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'nghia7122000' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    var content = '';
    content += `
    <div
    style="text-align : center;border : 30px solid teal;display: flex;justify-content: center; align-self: center;flex-direction: column;">
    <h1 style="font-size: 70px;color : teal;">Payment success !!!</h1>
    <img src="https://raw.githubusercontent.com/Quanghuy180800/frontend_PBL6/master/images/logo_GIOCATTOLI.png" />
    </div>
    `;
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'GIOCATOLLI',
        to: email,
        subject: 'Thank for your payment!',
        text: 'Special thank, and hope you enjoy your toys.',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/');
        }
    });
}catch(err){

}}

module.exports = paymentCtrl
