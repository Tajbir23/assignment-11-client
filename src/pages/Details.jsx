import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


const Details = () => {
    const {id} = useParams()
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/details/${id}`)
         .then(data => console.log(data.data))
    },[id])
  return (
    <div>Details</div>
  )
}

export default Details