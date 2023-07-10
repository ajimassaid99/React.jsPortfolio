const Pagination = ({ currentPage, totalProducts, productsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const handleClick = (page) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    };
  
    const renderPageNumbers = pageNumbers.map((page) => {
      const activeClass = currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-200';
      const disabledClass = currentPage === page ? 'opacity-50 cursor-default' : '';
  
      return (
        <button
          key={page}
          className={`py-2 px-4 ${activeClass} ${disabledClass}`}
          onClick={() => handleClick(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    });
  
    return (
      <div className="flex justify-center mt-6">
        <button
          className={`py-2 px-4 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-default' : 'bg-gray-500 text-white hover:bg-gray-200'} text-white hover:bg-gray-200 rounded-l`}
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers}
        <button
          className={`py-2 px-4 text-white ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-default' : 'bg-gray-500 text-white hover:bg-gray-200'} rounded-r`}
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;