import { Link } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import toast from "react-hot-toast";
import logo from "../../../public/logo.png"

const Header = ({ active, handleMode }) => {
    const { user, logout } = useContext(AuthContext)
    const navOptions = <>
        
        <li><Link to={"/"}>All Tasks</Link></li>
        <li><Link to={"/add-task"}>Add Tasks</Link></li>
       

    </>

    const handleLogOut = () => {
        logout()
            .then(result => {
                toast.success("successfully log out")
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>
            <div>
                <div className="navbar fixed z-10 opacity-65 max-w-screen-xl text-white bg-black">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>

                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-black  rounded-box z-[1] mt-3 w-52 p-2 shadow">

                                {
                                    navOptions
                                }

                            </ul>
                        </div>
                        <Link><img src={logo} className="w-10" alt="" /></Link>

                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {
                                navOptions
                            }
                        </ul>
                    </div>
                    <div className="navbar-end gap-4 ">
                        <div className="mr-4">
                            {
                                active.status ? <Link className="text-3xl" onClick={() => handleMode("dark")} ><MdDarkMode />
                                </Link> : <Link className="text-3xl" onClick={() => handleMode("light")} ><MdOutlineDarkMode />
                                </Link>
                            }
                        </div>
                        {
                            user ? 



                                <Link className="btn" onClick={handleLogOut}>Log out</Link>

                            :
                                <>
                                    <Link className="btn" to={"/registration"}>Registration</Link>
                                    <Link className="btn bg-black text-white border-0" to={"/login"}>Login</Link>
                                </>
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;