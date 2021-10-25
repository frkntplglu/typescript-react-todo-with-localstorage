import React from 'react'

interface ITodoItemProps{
    id: number,
    title: string;
    isDone: boolean;
    doneTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

function TodoItem(props: ITodoItemProps) {
    const {id, title, isDone, doneTask, deleteTask} = props;
    return (
        <li>
            {title} - [{isDone ? "DONE" : "PENDING"}] 
            {!isDone ? <button onClick={() => doneTask(id)}>Do Task</button> : ""}
            <button onClick={() => deleteTask(id)}>Delete</button>
        </li>
    )
}

export default TodoItem
