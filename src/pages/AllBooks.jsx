import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import StarRatings from "react-star-ratings"
import { AuthContext } from "../provider/AuthProvider"



const AllBooks = () => {

    // const queryClient = useQueryClient()
    const {user} = useContext(AuthContext)

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
        } catch (error) {
            console.log(error)
        }
    },[user])

    if (isLoading) return <div className="md:h-96 h-40 flex items-center justify-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
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
            <button disabled={checkLibrarian.message === "access denied" && user?.email !== items?.authorEmail} className="btn w-full">Update</button>
            {checkLibrarian.message === "access granted" && <button className="btn w-full">Delete</button>}
          </div>
        })}
      </div>
    </div>
  )
}

export default AllBooks