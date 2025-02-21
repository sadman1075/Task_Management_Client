import register_lottie from "../../assets/Animation - 1734093605552 (1).json"
import Lottie from 'react-lottie';
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Registration = () => {
    const { createGoogleuser, setUser, createUser, updateProfileuser } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogleSignup = () => {
        createGoogleuser()
            .then(result => {
                const name = result.user.displayName;
                const email = result.user.email;
                const userinfo = {
                    name: name,
                    email: email
                }
                axios.post("https://task-management-system-server-zeta.vercel.app/users", userinfo)
                    .then(res => {
                        toast.success("successfully created user")
                        navigate("/")

                    })
                    .catch(error => {
                        toast.error(error.message)
                    })
            })
    }
    const handleRegistration = (e) => {
        e.preventDefault()
        const from = e.target;
        const name = from.name.value;
        const email = from.email.value;
        const password = from.password.value;
        createUser(email, password)
            .then(result => {

                updateProfileuser({ displayName: name })
                    .then(result => {
                        setUser((previoususer) => {

                            return { ...previoususer, displayName: name }

                        })

                    })
                const userinfo = {
                    name: name,
                    email: email
                }
                axios.post("https://task-management-system-server-zeta.vercel.app/users", userinfo)
                    .then(res => {
                        toast.success("successfully created user")
                        navigate("/")

                    })
                    .catch(error => {
                        toast.error(error.message)
                    })
            })
    }
    return (
        <div>

            <div className="hero  min-h-screen bg-base-300 pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full  lg:px-20 shrink-0 ">
                        <h1 className="text-5xl font-bold mt-4 text-center">Register now!</h1>

                        <form className="card-body" onSubmit={handleRegistration}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text " name="name" placeholder="Enter your Name" className="input input-bordered" required />
                            </div>

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
                                <button className="btn bg-black text-white w-full">Sing Up</button>
                            </div>

                            <div>
                                <p className="text-center text-[#D1A054] text-lg">Already Registered?<Link to={"/login"} className="text-blue-500 font-bold">Go to log in</Link></p>
                                <p className="text-center text-lg font-bold mt-2">Or sign up with</p>
                            </div>
                            <div className="flex justify-center gap-4 mt-5">
                                <Link onClick={handleGoogleSignup}><FcGoogle className="text-5xl" /></Link>
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

export default Registration;