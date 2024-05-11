import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


const Category = ({item}) => {
    const {image, title, name} = item
  return (
    <div className="w-full flex flex-col gap-5">
        <img src={image || '/vite.svg'} alt="image not found" className="h-96 w-full object-cover" />
        <div>
            <h1 className="text-xl font-bold mb-5">{title}</h1>
            <Link className="btn btn-primary w-full" to={`/category_books/${name}`} >Show book</Link>
        </div>
    </div>
  )
}

Category.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

export default Category