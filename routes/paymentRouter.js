const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const paypal = require("paypal-rest-sdk");
const { application } = require('express');

router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)

router.route('/payment/:id')
    .put(paymentCtrl.updatePayments)
    
router.route('/done/:id')
    .put(paymentCtrl.updateDone)


//Paypal for mobile
//config paypal
paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "ARfUC4zn34DDuXRzpyxgNq6vdpxFHg46FysJtXCL9YN4xIARn6I_1RhB0VAC9FSl-or21_0WGEQ4milx",
    client_secret:
        "EIeShMiqv-racxX73m8JzK3Bukp6qgOVzZB8JYFnV6fou_DJmlNsh2syq0OEOSk0mZGbIAB1jZ3Gk6tB"
});
//api paypal for mobile
router.route('/paypal/:total')
    .get((req,res)=>{

        //get total from body
        const total = req.params.total
        console.log( total )
        //json of payment
        var create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `http://localhost:4000/api/paypal/success/${total}`,
                cancel_url: "http://localhost:4000/api/paypal/cancel"
            },
            transactions: [
                {   
                    amount: {
                        currency: "USD",
                        total: total
                    },
                    description: "This is the payment description."
                }
            ]
        };
        
        paypal.payment.create(create_payment_json,function(error,payment){
            if(error){
                throw error;
            }else{
                //console.log(payment.transactions[0].amount);
                //console.log(payment.transactions[0].amount)
                res.redirect(payment.links[1].href)
            }
    
        })
    })

    //create payment method
   

//on success 
router.route('/paypal/success/:total').get((req,res)=>{
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    console.log(req.query.paymentId)
    const total = req.params.total
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {   
                amount: {
                    currency: "USD",
                    total: total
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(payment.transactions[0].item_list);
            res.json({
                id : paymentId,
                address : payment.transactions[0].item_list.shipping_address
            })
        }
    });
})

//on cancel
router.route('/paypal/cancel').get((req, res) => {
    res.render("cancel");
});

module.exports = router