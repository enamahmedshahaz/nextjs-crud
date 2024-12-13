"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateProduct = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        ProductName: "",
        ProductCode: "",
        Img: "",
        UnitPrice: "",
        Qty: "",
        TotalPrice: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://crud.teamrabbil.com/api/v1/CreateProduct",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                router.push("/"); // Redirect to home page
            } else {
                alert("Failed to create product.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the product.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6  shadow-md rounded-lg">

            <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input
                        type="text"
                        name="ProductName"
                        value={formData.ProductName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Product Code</label>
                    <input
                        type="text"
                        name="ProductCode"
                        value={formData.ProductCode}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="Img"
                        value={formData.Img}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Unit Price</label>
                    <input
                        type="text"
                        name="UnitPrice"
                        value={formData.UnitPrice}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                        type="text"
                        name="Qty"
                        value={formData.Qty}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Total Price</label>
                    <input
                        type="text"
                        name="TotalPrice"
                        value={formData.TotalPrice}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
