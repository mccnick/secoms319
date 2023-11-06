import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

function OrderConfirmationView({ orderDetails }) {
  return (
    <div className="confirmation_view">
      <div className="container justify-content-center">
        <div className="card text-center">
          <h1>Order Confirmed</h1>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationView;
