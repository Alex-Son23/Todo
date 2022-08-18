import React from "react";
import {Link} from "react-router-dom";


const Project = ({project}) => {
    return (
        <tr>
            <td>
                <a href={project.url} target='_blank'>{project.url.slice(0,20)+'...'}</a>
            </td>
            <td>
                <Link to={`${project.id}`}>{project.name}</Link>
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    // console.log(projects)
    return (
        <div>
            <table>
                <th>
                    Url
                </th>
                <th>
                    Name
                </th>
                {projects.map((project) => <Project project={project}/>)}
            </table>
            {/*<Outlet/>*/}
        </div>
    )
}

export default ProjectList