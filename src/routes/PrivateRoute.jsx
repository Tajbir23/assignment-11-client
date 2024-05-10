import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom"


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location =  useLocation()

    if (loading) return <h3>Loading...</h3>
    if(user) return children

    return <Navigate state={location.pathname} replace={true} to='/authentication' />
  
}

export default PrivateRoute