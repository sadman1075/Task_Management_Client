import { useContext } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const { createGoogleuser, loginUser } = useContext(AuthContext)
    const navigate=useNavigate()
    const handleGoogleLogin = () => {
        createGoogleuser()
            .then(result => {
                toast.success("successfully log in")
                navigate("/")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const from = e.target;

        const email = from.email.value;
        const password = from.password.value;
        loginUser(email, password)
            .then(result => {
                toast.success("successfully login")
                navigate("/")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>

            <div className="hero  min-h-screen bg-base-300 pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left lg:w-1/2 ">
                        {/* <Lottie animationData={register_lottie}></Lottie> */}
                    </div>
                    <div className="card bg-base-100 w-full max-w-s lg:px-20 shrink-0 ">
                        <h1 className="text-5xl font-bold mt-4 text-center">Log now!</h1>

                        <form className="card-body" onSubmit={handleLogin}>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                            </div>



                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Enter your password" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6 ">
                                <button className="btn bg-black text-white w-full">Log In</button>
                            </div>

                            <div>
                                <p className="text-center text-[#D1A054] text-lg">Dont have an account?<Link to={"/registration"} className="text-blue-500 font-bold">Registration</Link></p>
                                <p className="text-center text-lg font-bold mt-2">Or sign up with</p>
                            </div>
                            <div className="flex justify-center gap-4 mt-5">
                                <Link onClick={handleGoogleLogin}><FcGoogle className="text-5xl" /></Link>
                                <Link><FaFacebook className="text-5xl text-blue-600" /></Link>
                                <Link><FaGithub className="text-5xl text-black" /></Link>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;