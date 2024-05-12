import StarRatings from "react-star-ratings";
import PropTypes from 'prop-types';

const TableView = ({
  items,
  rating,
  checkLibrarian,
  handleUpdate,
  handleDelete,
  index,
}) => {
  return (
    <tr>
      <th>{index}</th>
      <td>{items?.name}</td>
      <td>{items?.author}</td>
      <td>{items?.category}</td>
      <td className="hidden lg:block">
        <StarRatings
          rating={rating || 1}
          starRatedColor="gold"
          starEmptyColor="gray"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
        />
      </td>
      <td>
        <button onClick={() => handleUpdate(items?._id)} className="btn w-full">
          Update
        </button>
      </td>
      {checkLibrarian.message === "access granted" && (
        <td>
        <button onClick={() => handleDelete(items?._id)} className="btn w-full">
          Delete
        </button>
        </td>
      )}
    </tr>
  );
};

TableView.propTypes = {
    items: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
    checkLibrarian: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

export default TableView;
