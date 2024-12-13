"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ params }) => {

    const router = useRouter();


    const unwrappedParams = use(params);
    const productId = unwrappedParams.id;

    const updateApiUrl = `https://crud.teamrabbil.com/api/v1/UpdateProduct/${productId}`;

    const getApiUrl = `https://crud.teamrabbil.com/api/v1/ReadProductByID/${productId}`;

    const [formData, setFormData] = useState({
        ProductName: "",
        ProductCode: "",
        Img: "",
        UnitPrice: "",
        Qty: "",
        TotalPrice: "",
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    // Fetch product data on component mount
    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await fetch(getApiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();

                if (data.status === "success" && data.data) {

                    const product = data.data[0];
                    setFormData({
                        ProductName: product.ProductName || "",
                        ProductCode: product.ProductCode || "",
                        Img: product.Img || "",
                        UnitPrice: product.UnitPrice || "",
                        Qty: product.Qty || "",
                        TotalPrice: product.TotalPrice || "",
                    });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [getApiUrl]);

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
            const response = await fetch(updateApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Product updated successfully!");
                router.push("/"); // Redirect to home page
            } else {
                alert("Failed to update product.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the product.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6  shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>

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
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
