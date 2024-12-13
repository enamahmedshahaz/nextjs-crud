"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://crud.teamrabbil.com/api/v1/ReadProduct');
        const data = await res.json();
        setProducts(data?.data || []);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  // Handle delete product
  const handleDelete = async (id) => {

    const deleteApiUrl = `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`;

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(deleteApiUrl, { method: "GET" });
      const data = await res.json();

      if (data.status === "success") {
        alert("Product deleted successfully!");
        // Remove the deleted product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };


  return (

    <div className="overflow-x-auto">

      <div className='my-5'>
        <h2 className='text-2xl text-white'>Products List: </h2>
      </div>

      <table className="table w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={product.Img || "https://via.placeholder.com/48"}
                        alt={product.ProductName || "Unnamed Product"}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product.ProductName || "Unnamed Product"}</div>
                    <div className="text-sm opacity-50">Code: {product.ProductCode || "N/A"}</div>
                  </div>
                </div>
              </td>
              <td>{product.UnitPrice || "N/A"}</td>
              <td>{product.Qty || "N/A"}</td>
              <td>{product.TotalPrice || "N/A"}</td>
              <td>
                <Link href={`/update/${product._id}`}><button className="btn btn-ghost btn-xs mr-2">Edit</button></Link>
                <button onClick={() => handleDelete(product._id)}
                  className="btn btn-ghost btn-xs text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
};

export default Products;
