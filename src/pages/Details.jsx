import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import StarRatings from "react-star-ratings"


const Details = () => {
    const {id} = useParams()
    // const [data, setData] = useState({})
    const [showModal, setShowModal] = useState(false)

    const queryClient = useQueryClient()

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getData(),
        queryKey: ['details', id]
    })

    // console.log(details)
    const getData = async() => {
         try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/details/${id}`)
        console.log(result)
        return result.data
         } catch (error) {
            console.log(error)
         }
    }

    if(isLoading) return <div className="md:h-96 h-40 flex items-center justify-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>

    const {name, author, category, description, image} = data
    const rating = parseInt(data?.rating)
    const quantity = parseInt(data?.quantity)

    const handleBorrow = (e) => {
        e.preventDefault();
    }
  return (
    <div className="flex justify-center items-center md:min-h-[calc(100vh-125px)] py-10 ">
    <div className="flex flex-col md:flex-row w-full gap-10 rounded-lg shadow-lg overflow-hidden p-5">
        <div className="flex flex-col gap-5 justify-center items-center md:w-1/3">
            <img src={image} className="w-56 h-96 object-cover rounded-lg" alt="Book Cover" />
            <button onClick={() => setShowModal(true)} className="btn btn-primary w-56">Borrow Book</button>
        </div>
        <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold ">{name}</h2>
            <p className="text-lg  mb-4">by {author}</p>
            <ul className="text-base ">
                <li><span className="font-medium">Category:</span> {category}</li>
                <li><span className="font-medium">Quantity:</span> {quantity}</li>
                <li className="flex items-center"><span className="font-medium mr-2">Rating:</span> 
                    <StarRatings
                        rating={rating || 1}
                        starRatedColor="gold"
                        starEmptyColor="gray"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                    />
                </li>
                <li><span className="font-medium">Description:</span> {description}</li>
            </ul>
        </div>
    </div>

    {/* modal */}
    {showModal && <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Do you want to borrow {name}?</h1>
        <div className="flex justify-end">
            <button onClick={() => setShowModal(false)} className="btn btn-primary mr-2">Cancel</button>
            <button className="btn btn-secondary">Borrow</button>
        </div>
    </div>
</div>}

</div>

  )
}

export default Details