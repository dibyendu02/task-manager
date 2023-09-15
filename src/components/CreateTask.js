import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase.config";

const CreateTask = ({closeHandler}) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const postCollectionRef = collection(db, "tasks");

    const createTask = async (e) => {
        e.preventDefault();
    
        // Check if title and desc are not empty
        if (title.trim() === "" || desc.trim() === "") {
          // Display an error message or handle the validation error as needed
          console.log("Title and post text cannot be empty");
          return;
        }
    
        await addDoc(postCollectionRef, {
          title,
          desc,
          isCompleted: false,
        });
    
        closeHandler();

      };
  return (
    <div className="bg-gray-100 w-[30%] h-[38vh] flex flex-col gap-5 items-center p-10 absolute top-20 right-[38%] rounded-md">
      <input
        className="text-black w-full p-2 rounded border border-black"
        placeholder="Task Title..."
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        className="text-black w-full p-2 rounded border border-black"
        placeholder="Task Description..."
        onChange={(event) => {
          setDesc(event.target.value);
        }}
      />
      <button
        className="bg-teal-300 hover:bg-teal-400 hover:text-white p-2 rounded-md"
        onClick={createTask}
      >
        Create Task
      </button>
      <button
        className="py-1 px-3 hover:bg-white rounded-md"
        onClick={closeHandler}
      >
        close
      </button>
    </div>
  );
};

export default CreateTask;
