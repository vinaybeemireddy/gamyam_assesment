import React from 'react'

const ProductCard = ({ product, onEdit }) => {
   return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>₹{product.price}</p>
        <p>{product.category}</p>
        <p>Stock: {product.stock}</p>
        <button className="btn btn-warning" onClick={() => onEdit(product)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCard