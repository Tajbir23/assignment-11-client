import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext, useEffect } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../provider/AuthProvider";
// import { useEffect } from "react"

const Slider = () => {

    const {setCategoryData} = useContext(AuthContext)

    const {data, isLoading} = useQuery({
        queryFn:() => categories(),
        queryKey: ['categories']
    })

    const categories = async() => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories`)
        
        return data
    }

    useEffect(() => {
        setCategoryData(data)
    },[data])
    
  return (
    <div className="">
      {isLoading ? (
        <div className="md:h-96 h-40 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="md:h-96 h-40 mt-10 z-[-1]"
        >
          {data?.map((items) => (
            <SwiperSlide key={items?._id}>
              
              <div className="h-full w-full">
                <img
                  className="h-full w-full object-cover object-center"
                  src={items?.image}
                  alt="image not found"
                />
                <h1 className="sm:top-5 sm:left-5 left-2 top-2 inset-0 font-bold text-blue-800 lg:text-4xl md:text-3xl sm:text-2xl text-xs">
                  {items?.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default Slider