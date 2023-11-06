import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import OrderConfirmationView from "./OrderConfirmationView";

function CartView({ cartItems }) {
  const [cart, setCart] = useState(cartItems);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
  });

  useEffect(() => {
    // Get cart data from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const total = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          // Increase the quantity by 1
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            // Decrease the quantity by 1
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });

      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    // Remove the item from the cart state
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    // Update the local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRegisterClick = () => {
    // Set the showConfirmation state to true to switch to the OrderConfirmationView
    setShowConfirmation(true);
  };

  return showConfirmation ? (
    <OrderConfirmationView />
  ) : (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">{cart.length} items</h6>
                      </div>
                      <hr className="my-4" />

                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="row mb-4 d-flex justify-content-between align-items-center"
                        >
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={item.image}
                              className="img-fluid rounded-3"
                              alt={item.title}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-black mb-0">{item.title}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              className="btn btn-link px-2"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <i className="fas fa-minus">-</i>
                            </button>

                            <input
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control form-control-sm"
                            />

                            <button
                              className="btn btn-link px-2"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <i className="fas fa-plus">+</i>
                            </button>
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">{`$ ${(
                              item.price * item.quantity
                            ).toFixed(2)}`}</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a
                              href="#!"
                              className="text-muted"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-times">x</i>
                            </a>
                          </div>
                        </div>
                      ))}

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="mt-4">
                        <h3 className="fw-bold mb-4">Payment Information</h3>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentInfoChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="cardHolder" className="form-label">
                              Card Holder
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cardHolder"
                              name="cardHolder"
                              value={paymentInfo.cardHolder}
                              onChange={handlePaymentInfoChange}
                            />
                          </div>
                        </form>
                      </div>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">Items {cart.length}</h5>
                        <h5>{`$ ${total().toFixed(2)}`}</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="select">
                          <option value="1">Standard-Delivery- $5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>{`$ ${(total() + 5).toFixed(2)}`}</h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                        onClick={handleRegisterClick}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartView;
