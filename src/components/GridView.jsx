import StarRatings from "react-star-ratings"
import PropTypes from 'prop-types';


const GridView = ({items, rating, checkLibrarian, handleUpdate, handleDelete}) => {
  return (
    <div key={items?._id} className="flex flex-col gap-5">
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

              <button
                onClick={() => handleUpdate(items?._id)}
                className="btn w-full"
              >
                Update
              </button>
              {checkLibrarian.message === "access granted" && (
                <button
                  onClick={() => handleDelete(items?._id)}
                  className="btn w-full"
                >
                  Delete
                </button>
              )}
            </div>
  )
}

GridView.propTypes = {
    items: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
    checkLibrarian: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };

export default GridView