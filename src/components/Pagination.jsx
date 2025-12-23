import React from 'react'

const Pagination = ({ page, setPage, total }) => {
   return (
    <div className="d-flex justify-content-center mt-3">
      <button className="btn btn-secondary me-2" disabled={page === 1}
        onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span className="align-self-center">{page}</span>
      <button className="btn btn-secondary ms-2"
        disabled={page * 5 >= total}
        onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination