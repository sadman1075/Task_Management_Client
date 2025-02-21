import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import AddTask from "../Pages/AddTask/AddTask";
import AllTasks from "../Pages/AllTasks/AllTasks";
import PrivateRoutes from "./PrivateRoutes";
import UpdateTask from "../Pages/UpdateTask/UpdateTask"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <PrivateRoutes><AllTasks></AllTasks></PrivateRoutes>
            },

            {
                path: "/registration",
                element: <Registration></Registration>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/add-task",
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },

            {
                path: "/tasks/:id",
                element: <PrivateRoutes><UpdateTask></UpdateTask></PrivateRoutes>,
                loader: async ({ params }) => fetch(`https://task-management-system-server-zeta.vercel.app/tasks/${params.id}`)
            }
        ]
    }
])