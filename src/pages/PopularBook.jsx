import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import StarRatings from "react-star-ratings"


const PopularBook = () => {
    const [book, setBook] = useState([])
    useEffect(() => {
        axios
       .get(`${import.meta.env.VITE_API_URL}/popular_book`)
       .then(data => setBook(data.data))
    },[])
  return (
    <div className="mb-20">
        <h1 className="md:text-4xl text-xl font-bold text-center mb-10">Popular Book</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-10 md:gap-14">
        {book.map((items) => {
          const rating = parseFloat(items?.rating)
          console.log(rating)
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
            <Link to={`/details/${items?._id}`} className="btn w-full">Details</Link>
          </div>
        })}
      </div>
    </div>
  )
}

export default PopularBook