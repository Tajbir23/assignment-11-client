import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location =  useLocation()

    if (loading) return <div className="md:h-96 h-40 flex items-center justify-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
    if(user) return children

    return <Navigate state={location.pathname} replace={true} to='/authentication' />
  
}

export default PrivateRoute