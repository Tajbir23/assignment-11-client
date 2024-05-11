import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

const CategoryBook = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category/${id}`)
      .then((data) => setItem(data.data));
  }, [id]);
  
  // useEffect(() => {
  //   if (item) {
  //     const updatedItems = item.map((data) => ({
  //       ...data,
  //       rating: parseInt(data.rating),
  //     }));
  //     setItem(updatedItems);
  //   }
  // }, []);
  // console.log(item);
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center mb-10">{id}</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {item.map((items) => {
          const rating = parseFloat(items?.rating)
          console.log(rating)
          return <div key={items?._id} className="flex flex-col gap-5">
            <img
              src={items?.image}
              className="h-36 object-cover"
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
  );
};

export default CategoryBook;
