import React from 'react'

const SearchBar = ({ setSearch }) =>{
  return (
    <input
      className="form-control mb-3"
      placeholder="Search by product name..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar