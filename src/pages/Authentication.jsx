import { useState } from "react"
import Login from "../components/Authentication/Login"
import SignUp from "../components/Authentication/SignUp"


const Authentication = () => {
    const [page, setPage] = useState('login')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex gap-5">
            <button onClick={() => setPage('login')} className={page === "login" ? 'text-green-800' : ''}>Login</button>
            <button onClick={() => setPage('register')} className={page === 'register' ? 'text-green-800' : ''}>Register</button>
        </div>
        <div>
            {page === "login" && <Login />}
            {page === "register" && <SignUp />}
        </div>
    </div>
  )
}

export default Authentication