

const Pagination = ({setPage, page, totalPages}) => {
  return (
    <div className="flex justify-center mt-6">
        <button
          className="btn btn-primary mr-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className=" btn">{page}</span>
        <button
          className="btn btn-primary ml-2"
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
  )
}

export default Pagination