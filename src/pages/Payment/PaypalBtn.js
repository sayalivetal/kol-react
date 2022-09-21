import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PaypalBtn = ({price}) => {
    
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [paymentDetail,setPaymentDetail] = useState({});
   

    
    const handleApprove = (data, order) => {
        setPaidFor(true);
        navigate("/thank-you")
        console.log("ajflksjaflksjafdlkdj",data, order)
        //setPaymentDetail({...order})
        // if(order) {
        //     setPaymentDetail({...order})
        // }
    }

    console.log("---------",paymentDetail)

    if (paidFor) {
        alert("Thank You for purchasing from KOL");
    }
    if (error) {
        alert(error);
    }


    const navigate = useNavigate();

    return (
        <PayPalScriptProvider options={{ "client-id" : "Aa28aLeuvYG0Ys7fKCOtgAhsUWE-EKUbldAq8-QFRFPCPliJxtDhcNm3kILdwmbQ9esJKUgJ4H28RzFU" }}>
            <PayPalButtons
                
                style={{
                    layout: 'horizontal',
                    shape: 'pill',
                    label: 'paypal',
                    tagline: false
                }}

                createOrder={(data, actions) => {
                   // console.log("gggggggggggggg",price)
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: price,
                                },
                            },
                        ],
                    });
                }}

                onApprove={async (data, action) => {
                    const order = await action.order.capture();
                    
                    console.log("order", order);
                     setPaymentDetail({...order})
                    //  if (order.status=== 'COMPLETED') {
                    //     navigate("/thank-you")
                    // }
                     
                    // handleApprove(data, order);
                }}
                onCancel={() => { }}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}

                paymentDetail={paymentDetail}

            />
        </PayPalScriptProvider>
    );
};

export default PaypalBtn;


// sb-84i4i20765734@personal.example.com
// p#IQx51+
