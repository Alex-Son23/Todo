import React from "react";


const Todo = ({todo}) => {
    let activeTodo = ''
    if (todo.isActive){
        activeTodo = 'Active'
    } else {
        activeTodo = 'Closed'
    }
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {activeTodo}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user.username}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                Text
            </th>
            <th>
                Created
            </th>
            <th>
                Active
            </th>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            {todos.map((todo) => <Todo todo={todo}/>)}
        </table>
    )
}

export default TodoList