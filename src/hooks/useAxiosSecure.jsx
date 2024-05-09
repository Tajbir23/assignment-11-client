import axios from "axios";
import { useContext } from "react";
import AuthProvider from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


const useAxiosSecure = () => {
    const {logOut} = useContext(AuthProvider)
    const navigate= useNavigate()

    axiosSecure.interceptors.response.use(
        res => res,
        async err => {
            if(err.response.status === 401 || err.response.status === 403){
                logOut()
                navigate("/")
            }
            return Promise.reject(err)
        }
    )
  return axiosSecure
}

export default useAxiosSecure