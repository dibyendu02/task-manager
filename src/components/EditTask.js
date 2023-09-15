import React from 'react'

const EditTask = () => {
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
          Update Task
        </button>
        <button
          className="py-1 px-3 hover:bg-white rounded-md"
          onClick={() => setShowcreate(false)}
        >
          close
        </button>
      </div>
  )
}

export default EditTask