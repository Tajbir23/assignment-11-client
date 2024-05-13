import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import GridView from "../components/GridView";
import TableView from "../components/TableView";
import { Helmet } from "react-helmet";

const AllBooks = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [showBooks, setShowBooks] = useState("all_books");
  const [view, setView] = useState("grid");

  

  const [checkLibrarian, setCheckLibrarian] = useState({});

  const { data, isLoading} = useQuery({
    queryFn: () => getData(),
    queryKey: ["all_books", showBooks, user],
  });

  const getData = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/all_books?books=${showBooks}`
    );
    return result.data;
  };

  console.log(user)
  console.log(user?.email)

  useEffect(() => {
    
    try {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/check_librarian`,
          { email: user.email },
          { withCredentials: true }
        )
        .then((data) => setCheckLibrarian(data.data));
      queryClient.invalidateQueries(["all_books"]);
    } catch (error) {
      console.log(error);
    }
  }, [user, queryClient]);


  if (isLoading)
    return (
      <div className="md:h-96 h-40 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  const handleUpdate = (id) => {
    if (checkLibrarian.message !== "access granted")
      return toast.error("Librarian only");
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/delete_book?id=${id}&email=${
          user?.email
        }`
      );
      queryClient.invalidateQueries(["all_books"]);
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };


  if(user?.email === undefined){
    window.location.reload()
  }
  return (
    <div className="my-10">
    <Helmet>
      <title>All Books</title>
    </Helmet>
      <div className="mb-10 flex gap-10 md:flex-row flex-col">
        <select
          onChange={(e) => setView(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled>View</option>
          <option value={"grid"}>Grid</option>
          <option value={"table"}>Table</option>
        </select>

        <select
          onChange={(e) => setShowBooks(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option selected={showBooks === "all_books"} value={"all_books"}>
            All books
          </option>
          <option
            selected={showBooks === "available_books"}
            value={"available_books"}
          >
            Available books
          </option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-10 md:gap-14 gap-10">
        {data?.map((items) => {
          const rating = parseFloat(items?.rating);
          return (
            view === "grid" && (
              <GridView
                key={items?._id}
                items={items}
                rating={rating}
                checkLibrarian={checkLibrarian}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )
          );
        })}
      </div>

      {view === "table" && <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th className="hidden lg:block">Rating</th>
              <th>Update Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((items, index) => {
              const rating = parseFloat(items?.rating); 
              return (
                <TableView key={items?._id} index={index} items={items} rating={rating} checkLibrarian={checkLibrarian} handleUpdate={handleUpdate} handleDelete={handleDelete} />
              )
            })}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default AllBooks;
