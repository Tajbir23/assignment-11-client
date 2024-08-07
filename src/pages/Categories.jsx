
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Category from "../components/Category";


const Categories = () => {

    const {categoryData} = useContext(AuthContext)
  return (
    <div className="md:my-20 my-10">
    <h1 className="md:text-4xl text-xl font-bold text-center mb-10">Categories</h1>
      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-10 md:gap-14 gap-10">
        {categoryData?.map((item) => <Category key={item?._id} item={item} />)}
    </div>
    </div>
  )
}

export default Categories