import React from 'react'

const ProductTable = ({ products, onEdit }) => {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>{p.category}</td>
            <td>{p.stock}</td>
            <td>
              <button className="btn btn-warning btn-sm" onClick={() => onEdit(p)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable