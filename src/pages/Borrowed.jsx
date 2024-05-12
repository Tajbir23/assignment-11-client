import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";



const Borrowed = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)

    const {data: book= [], isLoading} = useQuery({
        queryFn: () => getData(),
        queryKey: ["borrowed"]
    })

    const getData = async() => {
        try {
            const {data} = await axiosSecure.get(`/borrowed_books`)
        return data
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading)
        return (
          <div className="md:h-96 h-40 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );

    const handleReturn = async(borrowId) => {
        console.log(borrowId)
        try {
            await axiosSecure.put(`/return_book?borrowId=${borrowId}&userEmail=${user?.email}`)
            queryClient.invalidateQueries("borrowed")
            toast.success('Book returned successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

    if(user?.email === undefined){
        return (
          <div className="md:h-96 h-40 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );
      }
  return (
 
    <div className="mb-20">
        <h1 className="md:text-4xl text-xl font-bold text-center mb-10">Popular Book</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-10 md:gap-14 gap-10">
        {book.map((items) => {
            const {borrowId} = items
          return <div key={items?._id} className="flex flex-col gap-5">
            <img
              src={items?.image}
              className="h-96 object-cover"
              alt="image not found"
            />
            <h1>Name : {items?.name}</h1>
            <h1>Category : {items?.category}</h1>
            <h1>Borrowed date : {items?.borrowedDate} </h1>
            <h1>Return date : {items?.returnDate}</h1>
            <button onClick={() => handleReturn(borrowId)} className="btn w-full">Return book</button>
          </div>
        })}
      </div>
    </div>

  )
}

export default Borrowed