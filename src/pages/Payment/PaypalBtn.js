import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { paypalOrderResponse } from './../../slices/DealsSlice/DealsSlice'



const PaypalBtn = ({price}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    // const handleApprove = (data, order) => {
    //     setPaidFor(true);
    //     console.log("ajflksjaflksjafdlkdj",data, order)
    // }

    if (error) {
        alert(error);
    }




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
                   console.log("gggggggggggggg",actions)
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
                    //console.log("order", order);
                    dispatch(paypalOrderResponse(order));
                     if (order.status=== 'COMPLETED') {
                        navigate("/thank-you")
                    }
                    // handleApprove(data, order);
                }}
                onCancel={() => { }}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}


            />
        </PayPalScriptProvider>
    );
};

export default PaypalBtn;





// sb-84i4i20765734@personal.example.com
// p#IQx51+
