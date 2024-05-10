import { useState } from "react"
import Login from "../components/Authentication/Login"
import SignUp from "../components/Authentication/SignUp"


const Authentication = () => {
    const [page, setPage] = useState('login')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex gap-5 text-xl">
            <button onClick={() => setPage('login')} className={page === "login" ? 'dark:text-green-800 font-bold border-b border-black' : ''}>Login</button>
            <button onClick={() => setPage('register')} className={page === 'register' ? 'dark:text-green-800 font-bold border-b border-black' : ''}>Register</button>
        </div>
        <div>
            {page === "login" && <Login setPage={setPage} />}
            {page === "register" && <SignUp setPage={setPage} />}
        </div>
    </div>
  )
}

export default Authentication