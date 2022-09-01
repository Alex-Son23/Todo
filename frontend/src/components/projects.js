import React from "react";
import {Link,useParams} from "react-router-dom";


const ProjectListItem = ({item}) => {
    // console.log(item)
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.url.slice(0,20)+'...'}</td>
            <td><Link to={link_to}>Detail</Link></td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    console.log(items)
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectListItem item={item}/>)}
        </table>
    )
}

const ProjectUserItem = ({user}) => {
    return (
        <li>
            {user.username} ({user.email})
        </li>
    )
}

const ProjectDetail = ({getProject, item}) => {
    // console.log(typeof getProject, item)
    let { id } = useParams();
    let proj = getProject(id)
    console.log(proj)
    let users = item.users ? item.users : []
    return (
        <div>
            <h1>{item.name}</h1>
            Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
                {typeof item.users}

            {/*{item.users.map((user) => <ProjectUserItem user={user} />)}*/}
            </ol>
        </div>
    )
}

export {ProjectDetail,ProjectList}