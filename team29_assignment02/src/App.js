/* eslint-disable jsx-a11y/img-redundant-alt */
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { Products } from "./Products";
import { Category } from "./Categories";


function Counter() {
  const [count, setCounter] = useState(0);
  const [message, setMeassage] = useState("");
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button
        onClick={() => {
          setCounter(count + 1);
          console.log(count);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setCounter(count - 1);
          console.log(count);
        }}
      >
        Subtract
      </button>
      <hr></hr>
      <input
        onChange={(e) => {
          setMeassage(e.target.value);
          console.log(e.target.value);
        }}
      />
    </div>
  );
}

const render_products = (ProductsCategory) => {
  return (
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
                    </p>
                    {Counter}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [ProductsCategory, setProductCategory] = useState(Products);
  return <div>{render_products(ProductsCategory)}</div>;
}

export default App;
