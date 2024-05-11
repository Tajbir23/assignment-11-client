import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";


const Update = () => {
    const {id} = useParams();
    const [item, setItem] = useState({});
    const [category, setCategory] = useState([])
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_API_URL}/details/${id}`)
                setItem(data.data)
                const cat = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
                setCategory(cat.data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    },[id])

    console.log(item)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = e.target
        
        try {
            await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/update_book?email=${user?.email}&&id=${id}`, {image: formData.image.value, name: formData.name.value, author: formData.author.value, category: formData.category.value, rating: formData.rating.value})
            toast.success('Book updated successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className="max-w-md my-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
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
            defaultValue={item?.image}
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
            defaultValue={item?.name}
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
            defaultValue={item?.author}
            className="w-full px-4 py-2 border rounded-lg"
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
            <option defaultValue={item?.category}>Select Category</option>
            {category?.map((category) => <option key={category?._id} value={category?.name}>{category?.title}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block mb-1">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={item?.rating}
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
            Submit
          </button>
        </div>
      </form></div>
  )
}

export default Update