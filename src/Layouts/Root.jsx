import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";
import Header from "../Pages/Header/Header";
import { useState } from "react";

const Root = () => {
    const [active, setActive] = useState({
        status: true,
        element: "light"

    })

    const handleMode = (element) => {
        if (element == "light") {
            setActive({
                status: true,
                element: "light"
            })
        }
        else {
            setActive({
                status: false,
                element: "dark"
            })
        }
    }
    return (
        <div className="max-w-7xl mx-auto" data-theme={`${active.status ? "light" : "dark"}`} >
            <Header handleMode={handleMode} active={active}></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;