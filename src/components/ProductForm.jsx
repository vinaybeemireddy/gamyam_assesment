import { useEffect, useState } from "react";

const ProductForm = ({ onSave, editProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) setProduct({
      name: editProduct.name || "",
      price: editProduct.price ?? "",
      category: editProduct.category || "",
      stock: editProduct.stock ?? "",
      description: editProduct.description || ""
    });
  }, [editProduct]);

  const validate = () => {
    const err = {};
    if (!product.name || !product.name.trim()) err.name = "Name is required";
    if (product.price === "" || product.price === null) {
      err.price = "Price is required";
    } else if (Number.isNaN(Number(product.price)) || Number(product.price) <= 0) {
      err.price = "Price must be a number greater than 0";
    }
    if (!product.category || !product.category.trim()) err.category = "Category is required";
    if (product.stock !== "" && product.stock !== null) {
      if (!Number.isInteger(Number(product.stock)) || Number(product.stock) < 0) {
        err.stock = "Stock must be a whole number ≥ 0";
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }));
    // Clear field error as user types
    setErrors(prev => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...product,
      price: Number(product.price),
      stock: product.stock === "" || product.stock === null ? 0 : Number(product.stock)
    };
    onSave(payload);
    setProduct({ name: "", price: "", category: "", stock: "", description: "" });
    setErrors({});
  };

  const canSave = product.name.trim() && !Number.isNaN(Number(product.price)) && Number(product.price) > 0 && product.category.trim();

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{editProduct ? "Edit Product" : "Add Product"}</h5>

      <input
        className={`form-control mb-1${errors.name ? ' is-invalid' : ''}`}
        placeholder="Name"
        value={product.name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
      />
      {errors.name && <small className="text-danger d-block mb-2">{errors.name}</small>}

      <input
        className={`form-control mb-1${errors.price ? ' is-invalid' : ''}`}
        type="number"
        step="0.01"
        placeholder="Price"
        value={product.price}
        onChange={(e) => handleFieldChange('price', e.target.value)}
      />
      {errors.price && <small className="text-danger d-block mb-2">{errors.price}</small>}

      <input
        className={`form-control mb-1${errors.category ? ' is-invalid' : ''}`}
        placeholder="Category"
        value={product.category}
        onChange={(e) => handleFieldChange('category', e.target.value)}
      />
      {errors.category && <small className="text-danger d-block mb-2">{errors.category}</small>}

      <input
        className={`form-control mb-2${errors.stock ? ' is-invalid' : ''}`}
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={(e) => handleFieldChange('stock', e.target.value)}
      />
      {errors.stock && <small className="text-danger d-block mb-2">{errors.stock}</small>}

      <textarea
        className="form-control mb-2"
        placeholder="Description (optional)"
        value={product.description}
        onChange={(e) => handleFieldChange('description', e.target.value)}
      />

      <button className="btn btn-success" disabled={!canSave}>Save</button>
    </form>
  );
};

export default ProductForm;
