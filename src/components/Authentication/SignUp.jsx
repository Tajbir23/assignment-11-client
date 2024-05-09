import { useContext, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
    const [lowerCase, setLowerCase] = useState("");
  const [upperCase, setUpperCase] = useState("");
  const [Length, setLength] = useState("");
  const [special, setSpecial] = useState("");
  const [showPass, setShowPass] = useState(false);
  const {createUser, updateUserProfile, setUser} = useContext(AuthContext)
  const location = useLocation()
  const redirect = location.state?.from || "/"
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });

  const validatePassword = (password) => {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const specialCharacter = /[^\w\s]/g;

    if (!lowerCase.test(password)) {
      setLowerCase("Password must lowercase letters");
    } else {
      setLowerCase("");
      setData({ ...data, password });
    }

    if (!upperCase.test(password)) {
      setUpperCase("Password must uppercase letters");
    } else {
      setUpperCase("");
      setData({ ...data, password });
    }
    if (password.length < 6) {
      setLength("Password at least 6 characters long");
    } else {
      setLength("");
      setData({ ...data, password });
    }
    if (!specialCharacter.test(password)) {
      setSpecial("Password must special characters");
    }else{
      setSpecial("")
      setData({ ...data, password });
    }
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
    if (!upperCase && !lowerCase && !Length ){
        try {
            const result = await createUser(data.email, data.password)
        await updateUserProfile(data.name, data.photo)
        setUser({...result?.user, photoURL : data.photo, displayName: data.name})

        await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {email: data.email}, {withCredentials: true})
        toast.success('Signup Successful')
        navigate(redirect, {replace: true})
        
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  };

  return (
    <div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 sm:w-[400px] w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, photo: e.target.value })}
                  placeholder="Photo"
                  className="input input-bordered"
                  required
                />
              </div>
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
                    onChange={(e) => validatePassword(e.target.value)}
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
                  <div className=" text-red-700">
                    {lowerCase && (
                      <>
                        {lowerCase},
                      </>
                    )}

                    {upperCase && (
                      <>
                        {upperCase},
                      </>
                    )}
                    {special && (
                      <>
                        {special},
                      </>
                    )}

                    {Length && Length}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 ">
          <input type="checkbox" required className="checkbox" />
          <p className="font-semibold text-sm">Accept Term & Conditions</p>
        </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!upperCase && !lowerCase && !Length ? false : true}
                >
                  Signup
                </button>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button className="text-blue-500">
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SignUp