import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { register, handleSubmit, reset } = useForm()
    const [timestamp, setTimestamp] = useState("");
    const task = useLoaderData()
    const navigate = useNavigate()
    console.log(task[0]._id);
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
            title: [title],
            description: [description],
            category: [category],
            time: [time]
        }
        console.log(tasks);
        axios.put(`https://task-management-system-server-zeta.vercel.app/tasks/${task[0]._id}`, tasks)
            .then(result => {
                if (result.data.modifiedCount > 0) {
                    toast.success("Successfully Updated the task")
                    navigate(-1)
                }
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    return (
        <div className="pt-20">

            <div className="">
                <div className="divider h-5 w-1/2 mx-auto "></div>
                <p className="text-2xl lg:text-4xl text-center">Update TASKS</p>
                <div className="divider h-5  w-1/2 mx-auto"></div>

            </div>
            <div>
                <div className=" ">
                    <div className="hero-content ">

                        <div className="card bg-base-200 w-full lg:w-[800px] ">
                            <form className="card-body" onSubmit={handleSubmit(handleAddTasks)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Title*</span>
                                    </label>
                                    <input {...register("title")} defaultValue={task[0].title} type="text" placeholder="Enter Title" className="input input-bordered w-full" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Description*</span>
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        defaultValue={task[0].description}
                                        placeholder="Enter Description"

                                        className="textarea textarea-bordered textarea-lg w-full"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Time Stamp</span>
                                    </label>
                                    <input defaultValue={task[0].time} type="text" readOnly placeholder="Enter Title" className="input input-bordered w-full" required />
                                </div>

                                <div className="lg:flex gap-8">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Category*</span>
                                        </label>
                                        <select {...register("category")} defaultValue={task[0].category} name="category" className="select select-bordered w-full lg:w-[735px]  " required>
                                            <option selected>To-Do</option>
                                            <option>In-Progress</option>
                                            <option>Done</option>


                                        </select>
                                    </div>


                                </div>





                                <div className="form-control mt-6">
                                    <button className="btn bg-[#7a5823] text-white">Update Tasks</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UpdateTask;