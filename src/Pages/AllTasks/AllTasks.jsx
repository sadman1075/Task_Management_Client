import React, { useRef, useState, useEffect, useContext } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../Context/AuthContext";

const AllTasks = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dragItem = useRef();
    const dragContainer = useRef();
    const [insep, setInsep] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("task.json");
                setInsep(response.data);
            } catch (err) {
                setError("Failed to load tasks.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const { todo, refetch } = useQuery({
        queryKey: ["data", user?.email],
        queryFn: async () => {
            axios.get(`https://task-management-system-server-zeta.vercel.app/tasks?email=${user?.email}`)
                .then(data => setData(data.data))
        }
    })



    const handleDelete = (id) => {
       
        axios.delete(`https://task-management-system-server-zeta.vercel.app/tasks/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("successfully Deleted the task")
                    refetch()
                }
            })
    }


    const handleDragStart = (e, item, container) => {
        dragItem.current = item;
        dragContainer.current = container;
        e.target.style.opacity = "0.5";
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = "1";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // const handleDrop = async (e, targetContainer) => {

    //     const item = dragItem.current;

    //     const sourceContainer = dragContainer.current;

    //     setData((prev) => {
    //         const newData = { ...prev };
    //         newData[sourceContainer] = newData[sourceContainer].filter(i => i !== item);
    //         newData[targetContainer] = [...newData[targetContainer], item];
    //         return newData
    //     })
    //     try {
    //         await axios.put("https://task-management-system-server-zeta.vercel.app/tasks", {
    //             task: item,
    //             from: sourceContainer,
    //             to: targetContainer,
    //         });
    //     } catch (err) {
    //         setError("Failed to update task.");
    //     }
    // };

    const handleDrop = async (e, targetCategory) => {
        const item = dragItem.current;
        
        if (!data || !item) return; // Prevent errors

        const updatedData = data.map(task =>
            task._id === item._id ? { ...task } : task
        );
        const taskinfo = {

            title: item.title,
            description: item.description,
            time: item.time,
            category: targetCategory.category
        }

     
        setData(updatedData);

        try {
            await axios.put(`https://task-management-system-server-zeta.vercel.app/tasks-info/${item._id}`, taskinfo);
            toast.success(`Task ${item.category} move to ${targetCategory.category}`);
            refetch()
        } catch (err) {
            setError("Failed to update task.");
        }
    };


    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="pt-20  w-full lg:flex justify-center">

                <div className="lg:flex bg-base-300">
                    {insep?.map((container, _id) => (
                        <div
                            key={_id}
                            onDrop={(e) => handleDrop(e, container)}

                            onDragOver={handleDragOver}
                            style={{

                                padding: "1rem",
                                width: 350,
                                minHeight: 300,
                            }}
                        >

                            <h2 className="text-xl mb-3 font-bold">{container.category}</h2>
                            {data?.length === 0 ? (
                                <p style={{ color: "red" }}>You have not create any tasks please create Tasks</p>
                            ) : (
                                data
                                    ?.filter(item => item.category == container.category[0]).map((item, _id) => (
                                        <div
                                            key={_id}
                                            onDragStart={(e) => handleDragStart(e, item, container)}
                                            onDragEnd={handleDragEnd}
                                            draggable
                                            className="bg-base-100"
                                            style={{

                                                userSelect: "none",
                                                padding: 16,
                                                margin: "0 0 8px 0",

                                                cursor: "move",
                                            }}
                                        >

                                            <div>

                                                <b>Task Id:</b> <span className="text-green-600">{item._id}</span>
                                                <br />
                                                <b>Task:</b> {item.title}
                                                <br />
                                                <b>Description:</b>{item.description}
                                                <br />
                                                <b>Time:</b> {item.time}
                                                <br />

                                            </div>
                                            {
                                                item.category == "To-Do" ?
                                                    <div className="flex justify-center gap-3 mt-4">
                                                        <Link to={`/tasks/${item._id}`} className="btn bg-green-500 text-white font bold">Update Task</Link>
                                                        <Link onClick={() => handleDelete(item._id)} className="btn bg-red-500 text-white font bold">Delete Task</Link>

                                                    </div> : ""



                                            }
                                        </div>

                                    ))
                            )}
                        </div>


                    ))}

                </div>


            </div>
            <div className="flex justify-center mt-8 pb-20">
                <Link to={"/add-task"} className="btn bg-black text-white font bold">Add Tasks</Link>

            </div>
        </div>
    );
};

export default AllTasks;

