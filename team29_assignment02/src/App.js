/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Products } from "./Products";
import CartView from "./CartView";

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [showCatalog, setShowCatalog] = useState(true);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
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
            Products ({Products.length})
          </h2>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
            Cart Items ({cart.length})
          </h2>
          <div style={{ maxHeight: "100%" }}>
            <div className="album py-5">
              <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                  {Products.map((product) => (
                    <div key={product.id} className="col">
                      <div className="card shadow-sm">
                        <img
                          alt={`Product Image - ${product.title}`}
                          src={product.image}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="card-body">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a className="card-text" href={product.href}>
                              {product.title}
                            </a>
                            <p>Tag - {product.category}</p>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Rating: {product.rating.rate}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-green-600">
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
          <CartView cart={cart} removeFromCart={removeFromCart} />
        </div>
      )}
    </div>
  );
}

export default App;
