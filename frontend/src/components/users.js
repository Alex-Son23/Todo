import React from "react";
import {Outlet} from "react-router-dom";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <div>
            <table>
                <th>
                    Username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                <th>
                    Email
                </th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
            {/*<Outlet/>*/}
        </div>
    )
}

export default UsersList