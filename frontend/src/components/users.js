import React from "react";
import {Outlet} from "react-router-dom";
import backVideo from "../video/back.mp4"


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
            {/*<svg height={"100%"} width={"100%"}>*/}
            {/*    <clipPath id={"text-overlay"}>*/}
            {/*        <text x={"50%"} y={"50%"} fill={"red"} textAnchor={"middle"}>*/}
            {/*            Relax.*/}
            {/*        </text>*/}
            {/*    </clipPath>*/}
            {/*</svg>*/}
            {/*<video src={backVideo} autoPlay={true} loop={true} muted={true}></video>*/}
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