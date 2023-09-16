import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function PaypalComponent({ totalPrice, eventName, setBooking }) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `Bloom Events - ${eventName}`,
                amount: {
                  currency_code: "USD",
                  value: 0.5,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          //   console.log(order);
          setBooking(true);
        },
        onError: (err) => {
          //   console.log(err);
          setBooking(false);
        },
      })
      .render(paypal.current);
  }, [totalPrice]);

  return (
    // <div>
    <div ref={paypal}></div>
    // </div>
  );
}

export default PaypalComponent;
