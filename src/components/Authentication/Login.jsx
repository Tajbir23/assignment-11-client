import { useContext, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";


const Login = ({setPage}) => {
  const {signIn, signInWithGoogle, setUser, setLoading} = useContext(AuthContext)
  const location = useLocation();
  const redirect = location.state || '/';
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(data.email, data.password);
      
    setUser(user);
    await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: user?.user?.email}, {withCredentials: true})
    toast.success('logged in successfully');
    navigate(redirect, {replace: true})
    } catch (error) {
      toast.error(error.message)
      if(error){
        setLoading(false)
      }
    }
  };

  const googleLogin = async(e) => {
    e.preventDefault();
    try {
      const user = await signInWithGoogle()
    setUser(user);
    await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: user?.user?.email}, {withCredentials: true})
    toast.success('logged in successfully');
    navigate(redirect, {replace: true})
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div>
     <Helmet>
      <title>Login</title>
     </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 sm:w-[400px] w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <div>
                  {showPass ? (
                    <BiShow
                      onClick={() => setShowPass(false)}
                      className="text-2xl absolute top-3 right-2"
                    />
                  ) : (
                    <BiHide
                      onClick={() => setShowPass(true)}
                      className="text-2xl absolute top-3 right-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Don&apos;t have an account?{" "}
                <div onClick={() => setPage('register')} className="text-blue-500 cursor-pointer">
                  Sign up
                </div>
              </p>
            </div>
          </form>

          <div className="flex items-center my-1 mx-5">
            <hr className="border w-full" />
            <h1 className="text-center mx-5">or</h1>
            <hr className="border w-full" />
          </div>

          <div className="px-7 w-full mt-3 pb-10">
            <button onClick={googleLogin} className="btn w-full btn-accent">
              {" "}
              <FcGoogle className="text-3xl" /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default Login