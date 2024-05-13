import { Helmet } from "react-helmet"
import AddBookForm from "../components/AddBookForm"

const AddBook = () => {
  return (
    <div className="my-20">
    <Helmet>
      <title>Add Book</title>
    </Helmet>
        <AddBookForm />
    </div>
  )
}

export default AddBook