import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthContext from "../../Context/AuthContext";

const AddTask = () => {
    const { register, handleSubmit, reset } = useForm()
    const [timestamp, setTimestamp] = useState("");
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const createdAt = new Date().toLocaleString(); // Get current timestamp
        setTimestamp(createdAt);
    }, []);
    const handleAddTasks = async (data) => {
        const title = data.title;
        const description = data.description;
        const category = data.category;
        const time = timestamp;

        const tasks = {
            email: user?.email,
            title: [title],
            description: [description],
            category: [category],
            time: [time]
        }
        axios.post("https://task-management-system-server-zeta.vercel.app/tasks", tasks)
            .then(result => {
                toast.success("Successfully Added the Tasks")
                reset()
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div>

            <div className="pt-20">
                <div className="divider h-5 w-1/2 mx-auto "></div>
                <p className="text-2xl lg:text-4xl text-center">ADD TASKS</p>
                <div className="divider h-5  w-1/2 mx-auto"></div>

            </div>
            <div>
                <div className=" mt-0">
                    <div className="hero-content ">

                        <div className="card bg-base-200 w-full lg:w-[800px] ">
                            <form className="card-body" onSubmit={handleSubmit(handleAddTasks)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Title*</span>
                                    </label>
                                    <input {...register("title")} type="text" placeholder="Enter Title" className="input input-bordered w-full" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Description*</span>
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        placeholder="Enter Description"

                                        className="textarea textarea-bordered textarea-lg w-full"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Time Stamp</span>
                                    </label>
                                    <input defaultValue={timestamp} type="text" readOnly placeholder="Enter Title" className="input input-bordered w-full" required />
                                </div>

                                <div className="lg:flex gap-8">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Category*</span>
                                        </label>
                                        <select {...register("category")} name="category" className="select select-bordered w-full lg:w-[735px]  " required>
                                            <option selected>To-Do</option>
                                            <option>In-Progress</option>
                                            <option>Done</option>


                                        </select>
                                    </div>


                                </div>





                                <div className="form-control mt-6">
                                    <button className="btn bg-[#7a5823] text-white">Add Tasks</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AddTask;