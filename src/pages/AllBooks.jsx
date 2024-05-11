import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import StarRatings from "react-star-ratings"
import { AuthContext } from "../provider/AuthProvider"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useAxiosSecure from "../hooks/useAxiosSecure"



const AllBooks = () => {

    const queryClient = useQueryClient()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const [checkLibrarian, setCheckLibrarian] = useState({})

    const {data, isLoading} = useQuery({
        queryFn: () => getData(),
        queryKey: ['all_books']
    })

    const getData = async() => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/all_books`)
        return result.data
    }
    
    useEffect(() => {
        try {
            axios.post(`${import.meta.env.VITE_API_URL}/check_librarian`, {email: user.email}, {withCredentials: true})
            .then((data) => setCheckLibrarian(data.data))
            queryClient.invalidateQueries(['all_books'])
        } catch (error) {
            console.log(error)
        }
    },[user,queryClient])

    console.log(checkLibrarian)

    if (isLoading) return <div className="md:h-96 h-40 flex items-center justify-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>

  const handleUpdate =(id) => {
    
    if(checkLibrarian.message !== "access granted") return toast.error('Librarian only')
    navigate(`/update/${id}`)
  }

  const handleDelete = async(id) => {
    try {
      await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/delete_book?id=${id}&&email=${user?.email}`)
      queryClient.invalidateQueries(['all_books'])
      toast.success('Book deleted successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="my-10">
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-10 md:gap-14 gap-10">
        {data.map((items) => {
          const rating = parseFloat(items?.rating)
          return <div key={items?._id} className="flex flex-col gap-5">
            <img
              src={items?.image}
              className="h-96 object-cover"
              alt="image not found"
            />
            <h1>Name : {items?.name}</h1>
            <h1>Author : {items?.author}</h1>
            <h1>Category : {items?.category}</h1>
            <div>
              <StarRatings
                rating={rating || 1}
                starRatedColor="gold"
                starEmptyColor="gray"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
              />
            </div>

            <button onClick={() => handleUpdate(items?._id)} className="btn w-full">Update</button>
            {checkLibrarian.message === "access granted" && <button onClick={() => handleDelete(items?._id)} className="btn w-full">Delete</button>}
          </div>
        })}
      </div>
    </div>
  )
}

export default AllBooks