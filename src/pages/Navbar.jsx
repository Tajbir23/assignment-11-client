import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import toast from "react-hot-toast"
import { Link, NavLink } from "react-router-dom"
import { Helmet } from "react-helmet"


const Navbar = () => {

  const {user, logOut, setUser, loading} = useContext(AuthContext)
  const [theme, setTheme] = useState('light')
  
  
  const signOut = async(e) => {
    e.preventDefault()
    try {
      await logOut()
      setUser(null)
    toast.success('User signed out')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleThemeChange =(e) => {
    
    if (e.target.value == "light") {
      setTheme('synthwave')
      localStorage.setItem("theme", "synthwave");
    }
    if (e.target.value == "synthwave") {
      setTheme('light')
      localStorage.setItem("theme", "light");
    }
    
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if(localTheme){
        setTheme(localTheme)
        document.documentElement.setAttribute('data-theme', localTheme)
    }else{
        setTheme('light')
        document.documentElement.setAttribute('data-theme', 'light')
    }
  },[theme])

  const navLinks = <>
    <li><NavLink to='/'>Home</NavLink></li>
        <li>
          <NavLink to='/add_book'>Add book</NavLink>
        </li>
        <li><NavLink to='/allBook'>All books</NavLink></li>
        <li><NavLink to='/borrowed'>Borrowed books</NavLink></li>
  </>
  return (
    <div className="navbar bg-base-100">
    <Helmet>
      <title>Book Nook</title>
    </Helmet>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52 ">
        {navLinks}
      </ul>
    </div>
    <div className="flex items-center justify-center">
      <img src="/vite.svg" className="h-14" alt="logo" />
      <a href="/" className="font-bold text-xl">Book Nook</a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 z-40">
    {navLinks}
    </ul>
  </div>
  <div className="navbar-end flex gap-5 items-center">
    {user && !loading && <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.user?.photoURL || user?.photoURL} />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            {user?.user?.displayName || user?.displayName}
          </a>
        </li>
        <li><button onClick={signOut}>Logout</button></li>
      </ul>
    </div>}
    {loading && <span className="loading loading-spinner loading-lg"></span>}
    {!user && !loading && <Link to='/authentication'>Login</Link>}
    <input type="checkbox" value={theme} checked={theme == 'light'} onChange={handleThemeChange} className="toggle theme-controller"/>
  </div>
</div>
  )
}

export default Navbar