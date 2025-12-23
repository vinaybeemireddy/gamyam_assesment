import React from 'react'

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="mb-3">
      <button
        className={`btn me-2 ${view === "table" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setView("table")}
      >
        List View
      </button>
      <button
        className={`btn ${view === "card" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setView("card")}
      >
        Card View
      </button>
    </div>
  );
};

export default ViewToggle