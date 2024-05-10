import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const AddBookForm = () => {
    const {user} = useContext(AuthContext)
    const [categories, setCategories] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/categories`)
        .then(data => setCategories(data.data))
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const formData = e.target
        const result =  await axiosSecure.post('/add_books', {
            name: formData.name.value,
            image: formData.image.value,
            quantity: formData.quantity.value,
            category: formData.category.value,
            author: user?.displayName,
            authorEmail: user?.email,
            description: formData.description.value,
        })
        if(result?.data?.acknowledged){
            toast.success('Book added successfully')
        }
        } catch (error) {
            toast.error(error.message)
        }
        
    }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Book</h1>
      <form
        onSubmit={handleSubmit}
        id="addBookForm"
        className="space-y-4"
      >
        <div>
          <label htmlFor="image" className="block mb-1">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block mb-1">Author Name:</label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={user?.displayName}
            className="w-full px-4 py-2 border rounded-lg"
            disabled
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1">Category:</label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {categories?.map((category) => <option key={category?._id} value={category?.name}>{category?.title}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">Short Description:</label>
          <textarea
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-lg resize-y"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="rating" className="block mb-1">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="w-full px-4 py-2 border rounded-lg"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Add Book
          </button>
        </div>
      </form>

      <div id="bookContents" className="mt-8">
        <h2 className="text-xl font-bold mb-2">About the Book</h2>
        <p className="mb-2">
          This is a fantastic book that you should definitely read!
        </p>
        <p className="mb-2">
          It's a gripping story with well-developed characters and an engaging
          plot.
        </p>
      </div>
    </div>
  );
};

export default AddBookForm;
