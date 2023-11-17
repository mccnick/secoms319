
/* eslint-disable jsx-a11y/img-redundant-alt */
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Products } from "./Products";
import { Category } from "./Categories";
import CartView from "./CartView";

function App() {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [ProductsCategory, setProductCategory] = useState(Products);
  const [showCatalog, setShowCatalog] = useState(true); // State to show/hide catalog

  const cartItems = [];

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    // Update the cart in local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleToggleView = () => {
    setShowCatalog(!showCatalog);
  };

  return (
    <div>
      <div>
        <button onClick={handleToggleView}>
          {showCatalog ? "Checkout" : "Catalog"}
        </button>
      </div>
      {showCatalog ? (
        <div className="category-section fixed">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
            Products ({ProductsCategory.length})
          </h2>
          <div style={{ maxHeight: "100%" }}>
            <div className="album py-5">
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {/* Loop Products */}
                  {ProductsCategory.map((product, index) => (
                    <div key={index} className="col">
                      <div className="card shadow-sm">
                        <img
                          alt="Product Image"
                          src={product.image}
                          className="w-full h-full object-center object-cover lg:w-fulllg:h-full"
                        />
                      </div>
                      <div class="card-body">
                        <div>
                          <h3 className="text-smtext-gray-700">
                            <p className="card-text" href={product.href}>
                              {product.title}
                            </p>
                            <p>Tag- {product.category}</p>
                          </h3>
                          <p className="mt-1 text-smtext-gray-500">
                            Rating: {product.rating.rate}
                          </p>
                        </div>
                        <p className="text-smfont-medium text-green-600">
                          ${product.price}
                          <button
                            type="button"
                            onClick={() => removeFromCart(product)}
                          >
                            -
                          </button>{" "}
                          <button
                            type="button"
                            variant="light"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </button>
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Loop Products */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
            Checkout ({cart.length})
          </h2>
          <CartView cartItems={cart} />
        </div>
      )}
    </div>
  );
}

export default App;