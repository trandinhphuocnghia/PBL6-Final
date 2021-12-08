import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            
            		console.log("successful payment!", payment);
                    
                    this.props.tranSuccess(payment)
        }
 
        const onCancel = (data) => {
            
            console.log('The payment was cancelled!', data);
            
        }
 
        const onError = (err) => {
           
            console.log("Error!", err);
           
        }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = this.props.total; 
 
        const client = {
            sandbox:    'ARfUC4zn34DDuXRzpyxgNq6vdpxFHg46FysJtXCL9YN4xIARn6I_1RhB0VAC9FSl-or21_0WGEQ4milx',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
       
        let style = {
            size: 'medium',
            color: 'gold',
            shape: 'pill',
            label: 'checkout',
            tagline: false
        }

        return (
            <PaypalExpressBtn 
            env={env} client={client} 
            currency={currency} 
            total={total} onError={onError} 
            onSuccess={onSuccess} onCancel={onCancel}
            style={style} />

           
        );
    }
}