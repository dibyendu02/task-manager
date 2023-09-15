import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase.config";
import { AiFillEdit, AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import CreateTask from "./CreateTask";

const Tasks = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showcreate, setShowcreate] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [taskId, setTaskId] = useState("");
  const postCollectionRef = collection(db, "tasks");
  const [tasklist, setTasklist] = useState([]);

  const getTasks = async () => {
    const data = await getDocs(postCollectionRef);
    setTasklist(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    getTasks();
  };

  const updateTaskStatus = async (id) => {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);

    const currentValue = taskSnap.data().isCompleted;
    const newValue = !currentValue;

    await updateDoc(taskRef, {
      isCompleted: newValue,
    });

    getTasks();
  };

  const closeHandler = () => {
    setShowcreate(false);

    getTasks();
  };

  const updateTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);

    await updateDoc(taskRef, {
      title: title,
      desc: desc,
    });

    getTasks();
  };

  const openUpdateTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    const taskSnap = await getDoc(taskRef);

    setTitle(taskSnap.data().title);
    setDesc(taskSnap.data().desc);
    setTaskId(id);
  };

  useEffect(() => {
    getTasks();
    console.log(tasklist);
    console.log(showcreate);
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between w-[50%]">
        <h1 className="text-2xl font-bold">Task List</h1>
        <button
          className="bg-red-200 hover:bg-red-400 hover:text-white p-2 rounded-md"
          onClick={() => setShowcreate(true)}
        >
          Create Task
        </button>
      </div>

      <table className="mt-20 border-2 border-solid-black text-center">
        <tr className="border-2 border-solid-black">
          <th className="w-60 border-2 border-solid-black">Title</th>
          <th className="w-40 border-2 border-solid-black">Description</th>
          <th className="w-40 border-2 border-solid-black">Completed status</th>
          <th className="w-40 border-2 border-solid-black">Edit/Delete</th>
          <th className="w-40 border-2 border-solid-black">Assignee</th>
        </tr>
        {tasklist &&
          tasklist.map((task) => {
            return (
              <tr>
                <td className="w-60 border-2 border-solid-black">
                  {task.title}
                </td>
                <td className="w-60 border-2 border-solid-black">
                  {task.desc}
                </td>
                <td className="w-60 border-2 border-solid-black">
                  <button
                    className={` ${
                      task.isCompleted ? "bg-green-200" : "bg-red-200"
                    } p-2`}
                    onClick={() => {
                      updateTaskStatus(task.id);
                    }}
                  >
                    {task.isCompleted ? "completed" : "pending"}
                  </button>
                </td>
                <td className="w-60 py-2 border border-solid-black flex justify-around ">
                  <button
                    onClick={() => {
                      setShowupdate(true);
                      openUpdateTask(task.id);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
                <td className="w-60 border-2 border-solid-black">
                  <p>get2dibyendu@gmail.com</p>
                </td>
              </tr>
            );
          })}
      </table>

      <p>** click on the task status to change</p>

      {showcreate && <CreateTask closeHandler={closeHandler} />}

      {showupdate && (
        <div className="bg-gray-100 w-[30%]  flex flex-col gap-5 items-center p-10 absolute top-20 right-[38%] rounded-md">
          <h1>title: {title}</h1>
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="updated title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <h1>desc: {desc}</h1>
          <input
            className="text-black w-full p-2 rounded border border-black"
            placeholder="updated description"
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
          <button
            className="bg-teal-300 hover:bg-teal-400 hover:text-white p-2 rounded-md"
            onClick={() => {
              updateTask(taskId);
              setShowupdate(false);
            }}
          >
            Update Task
          </button>
          <button
            className="py-1 px-3 hover:bg-white rounded-md"
            onClick={() => setShowupdate(false)}
          >
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
