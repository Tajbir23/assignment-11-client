import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StarRatings from "react-star-ratings"


const Details = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    console.log(data)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/details/${id}`)
         .then(data => setData(data.data))
    },[id])
    const {name, author, category, description, image, quantity, _id, rating} = data
  return (
    <div className="flex justify-center items-center md:min-h-[calc(100vh-125px)] my-10 p-10">
    <div className="flex flex-col md:flex-row w-full gap-10 rounded-lg shadow-lg overflow-hidden p-10">
        <div className="flex flex-col gap-5 justify-center items-center md:w-1/3">
            <img src={image} className="w-56 h-96 object-cover rounded-lg" alt="Book Cover" />
            <button className="btn btn-primary w-56">Borrow Book</button>
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
</div>

  )
}

export default Details