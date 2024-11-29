import React, { useState } from 'react'

export default function Todo() {
    const [title, setTitle] = useState("")
    const [list, setList] = useState([])
    const [edit, setEdit] = useState({ id: "", text: "" })
    const handleAdd = (e) => {
        e.preventDefault()
        setList([...list, { id: Date.now(), task: title }])
        setTitle("")
    }

    const handleDelete = (id) => {
        const newList = list.filter((ele) => ele.id !== id)
        setList(newList)
    }

    const handleUpdate = (e) => {
        setList(list.map(task => 
            task.id === edit.id ? { ...task, task: edit.text } : task
        ));
        setEdit({ id: "", text: "" });
    }

    return (
        <div>
            <h2>Todo App</h2>
            <form className='flex' onSubmit={handleAdd}>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button>Add</button>
            </form>
            <div className="task-list">
                <div className="task-header">
                    <h3>Task</h3>
                    <h3>Action</h3>
                </div>
                {list.length > 0 && list.map((ele) =>
                    <div key={ele.id} className='task-bar'>
                        {
                            edit.id === ele.id ?
                                <input type="text" name="title" id="title" value={edit.text} onChange={(e) => setEdit({ ...edit, text: e.target.value })} /> :
                                <div>{ele.task}</div>
                        }
                        <div className='flex'>
                            {
                                edit.id === ele.id ?
                                    <button onClick={() => handleUpdate(ele)}>Update</button> :
                                    <button onClick={() => setEdit({ id: ele.id, text: ele.task })}>Edit</button>
                            }
                            <button onClick={() => handleDelete(ele.id)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
