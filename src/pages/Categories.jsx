
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Category from "../components/Category";


const Categories = () => {

    const {categoryData} = useContext(AuthContext)
  return (
    <div className="md:mt-20 mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-10 grid-rows-1">
        {categoryData?.map((item) => <Category key={item?._id} item={item} />)}
    </div>
  )
}

export default Categories