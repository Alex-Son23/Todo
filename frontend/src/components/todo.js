import React from "react";
import {Link} from "react-router-dom";


const Todo = ({todo, deleteTodo}) => {
    // console.log(todo.id)
    let activeTodo = ''
    if (todo.isActive){
        activeTodo = 'Active'
    } else {
        activeTodo = 'Closed'
    }
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{activeTodo}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>
                <button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    // console.log(deleteTodo)
    return (
        <div>
            <table>
                <th>Text</th>
                <th>Created</th>
                <th>Active</th>
                <th>Project</th>
                <th>User</th>
                <th></th>
                {todos.map((todo) => <Todo todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link className="create-but" to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList