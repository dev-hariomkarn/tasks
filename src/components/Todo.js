import React, { useState } from 'react';

export default function Todo() {
    const [title, setTitle] = useState("");
    const [list, setList] = useState([]);
    const [edit, setEdit] = useState({ id: "", text: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const handleAdd = (e) => {
        e.preventDefault();
        setList([...list, { id: Date.now(), task: title }]);
        setTitle("");
    };

    const handleDelete = (id) => {
        const newList = list.filter((ele) => ele.id !== id);
        setList(newList);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (edit.id) {
            setList(list.map(task => 
                task.id === edit.id ? { ...task, task: edit.text } : task
            ));
            setEdit({ id: "", text: "" });
        }
    };

    const totalPages = Math.ceil(list.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const displayedTasks = list.slice(startIndex, startIndex + tasksPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <h2>Todo App</h2>
            <form className='flex' onSubmit={handleAdd}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            <div className="task-list">
                <div className="task-header">
                    <h3>Task</h3>
                    <h3>Action</h3>
                </div>
                {displayedTasks.map((ele) => (
                    <div key={ele.id} className='task-bar'>
                        {
                            edit.id === ele.id ? (
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={edit.text}
                                    onChange={(e) => setEdit({ ...edit, text: e.target.value })}
                                />
                            ) : (
                                <div>{ele.task}</div>
                            )
                        }
                        <div className='flex'>
                            {
                                edit.id === ele.id ? (
                                    <button onClick={handleUpdate}>Update</button>
                                ) : (
                                    <button onClick={() => setEdit({ id: ele.id, text: ele.task })}>Edit</button>
                                )
                            }
                            <button onClick={() => handleDelete(ele.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                {list.length === 0 && <p>No tasks available.</p>}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
