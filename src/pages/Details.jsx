import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(new Date());

  const { data, isLoading} = useQuery({
    queryFn: () => getData(),
    queryKey: ["details", id],
  });
  //   console.log(user)

  console.log(data);
  const getData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/details/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await axiosSecure.put(`${import.meta.env.VITE_API_URL}/borrow_book/`, {
        name: data?.name,
        author: data?.author,
        category: data?.category,
        description: data?.description,
        image: data?.image,
        rating: data?.rating,
        quantity: data?.quantity,
        borrower: user?.email,
        id: data?._id,
        returnDate: startDate.toDateString()
      });
    },
    onSuccess: () => {
      toast.success("Book borrowed successfully");
      queryClient.invalidateQueries(["details", id]);
    },
  });

  if (isLoading)
    return (
      <div className="md:h-96 h-40 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  const { name, author, category, description, image } = data;
  const rating = parseInt(data?.rating);
  const quantity = parseInt(data?.quantity);

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      if (quantity === 0) return toast.error("Book is not available");

      await mutateAsync();
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(startDate.toDateString())

  return (
    <div className="flex justify-center items-center md:min-h-[calc(100vh-125px)] py-10 ">
      <div className="flex flex-col md:flex-row w-full gap-10 rounded-lg shadow-lg overflow-hidden p-5">
        <div className="flex flex-col gap-5 justify-center items-center md:w-1/3">
          <img
            src={image}
            className="w-56 h-96 object-cover rounded-lg"
            alt="Book Cover"
          />
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary w-56"
          >
            Borrow Book
          </button>
        </div>
        <div className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold ">{name}</h2>
          <p className="text-lg  mb-4">by {author}</p>
          <ul className="text-base ">
            <li>
              <span className="font-medium">Category:</span> {category}
            </li>
            <li>
              <span className="font-medium">Quantity:</span> {quantity}
            </li>
            <li className="flex items-center">
              <span className="font-medium mr-2">Rating:</span>
              <StarRatings
                rating={rating || 1}
                starRatedColor="gold"
                starEmptyColor="gray"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
              />
            </li>
            <li>
              <span className="font-medium">Description:</span> {description}
            </li>
          </ul>
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="p-4 bg-gray-100 rounded-md mb-5">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">
                  Return date
                </label>
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold">Name</label>
                <input
                  type="text"
                  disabled
                  className="px-3 py-2 border rounded-md w-full bg-gray-200"
                  defaultValue={user?.displayName}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  className="px-3 py-2 border rounded-md w-full bg-gray-200"
                  defaultValue={user?.email}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-primary mr-2"
              >
                Cancel
              </button>
              <button onClick={handleBorrow} className="btn btn-secondary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
