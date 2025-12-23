import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./hooks/useDebounce";

import SearchBar from "./components/SearchBar";
import ViewToggle from "./components/ViewToggle";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/Pagination";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");
  const [editProduct, setEditProduct] = useState(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const apiBaseUrl ="https://gamyamassessment.netlify.app" //import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log('API Base URL:', apiBaseUrl); // Debug log
    if (!apiBaseUrl) {
      console.error('VITE_API_BASE_URL is not defined in environment');
      return;
    }
    axios.get(`${apiBaseUrl}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products', err));
  }, [apiBaseUrl]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const pageData = filtered.slice((page - 1) * 5, page * 5);

  const saveProduct = async (product) => {
    try {
      if (product.id) {
        // update existing product on server
        const res = await axios.put(`${apiBaseUrl}/products/${product.id}`, product);
        setProducts(products.map(p => p.id === product.id ? res.data : p));
        alert('Product updated successfully');
      } else {
        // create new product on server
        const res = await axios.post(`${apiBaseUrl}/products`, product);
        setProducts(prev => [...prev, res.data]);
        alert('Product added successfully');
      }
      setEditProduct(null);
    } catch (err) {
      console.error('Failed to save product', err);
      alert('Could not save product. See console for details.');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Product Management</h3>

      <SearchBar setSearch={setSearch} />
      <ViewToggle view={view} setView={setView} />
      <ProductForm onSave={saveProduct} editProduct={editProduct} />

      {view === "table" ? (
        <ProductTable products={pageData} onEdit={setEditProduct} />
      ) : (
        <div className="row">
          {pageData.map(p => (
            <div className="col-md-4 mb-3" key={p.id}>
              <ProductCard product={p} onEdit={setEditProduct} />
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} setPage={setPage} total={filtered.length} />
    </div>
  );
};

export default App;
