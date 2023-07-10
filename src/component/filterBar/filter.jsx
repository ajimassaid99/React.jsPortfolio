import { useEffect, useState } from 'react';

function FilterPopup({onClose,onFilter}) {
  const [filters, setFilters] = useState({
    category: '',
    tags: []
  });
  
  const [lisCategory,setListCategory] = useState([]);
  const [lisTags,setListTags] = useState([]);

  useEffect(() => {
    async function fetchCategorysAndTags() {
      try {
        const categorysResponse = await fetch('http://localhost:3002/api/categorys');
        const categorysData = await categorysResponse.json();
        setListCategory(categorysData);

        const tagsResponse = await fetch('http://localhost:3002/api/Tags');
        const tagsData = await tagsResponse.json();
        setListTags(tagsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategorysAndTags();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    const index = filters.tags.indexOf(value);
    if (index === -1) {
      setFilters((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, value]
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        tags: prevState.tags.filter((tag) => tag !== value)
      }));
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onFilter(filters)
    onClose(false);
  };
  const handleClose = ()=>{
    onClose(false);
  }

  return (
    <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-1/4">
            <h2 className="text-2xl font-bold mb-4">Filter Products</h2>
            <form onSubmit={handleFilterSubmit}>
              <div className="flex flex-col mb-4">
                <label htmlFor="category" className="font-bold mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="border border-gray-400 rounded p-2"
                >
                  <option value="">All</option>
                  {lisCategory.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-4">
             <label className="font-bold mb-2">Tags</label>
            <div className="flex flex-wrap -mx-2">
                {lisTags.map((tag, index) => (
                <span key={tag.id} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
                    <label className="cursor-pointer">
                    <input
                        type="checkbox"
                        name="tags"
                        value={tag.name}
                        checked={filters.tags.includes(tag.name)}
                        onChange={handleTagChange}
                        className="mr-2 cursor-pointer"
                    />
                    {tag.name}
                    </label>
                </span>
                ))}
            </div>
            </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
                  onClick={handleFilterSubmit}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}

export default FilterPopup;