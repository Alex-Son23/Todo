import React, {useState} from "react";
import {Link,useParams} from "react-router-dom";

const ProjectListItem = ({item, deleteProject}) => {
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.url.slice(0,20)+'...'}</td>
            <td><Link to={link_to}>Detail</Link></td>
            <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject}) => {
    const [filteredProjects, setFilteredProjects] = useState(items)
    // console.log(filteredProjects)
    const filterProjectsByName = (e) => {
        if (e.target.value !== ''){
            const filteredProjects = items.filter(item => item.name.toLowerCase().includes(e.target.value))
            // console.log(filteredProjects)
            setFilteredProjects(filteredProjects)
        }else{
            setFilteredProjects(items)
        }
    }
    return (
        <div className="container-md">
            <form>
                <label htmlFor="projectFilter">
                    Фильтрация по названию
                </label>
                <input className="form-control" type="text" aria-label="projectFilter" onChange={event => {filterProjectsByName(event)}}>

                </input>
            </form>

            <table className="table">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Repository</th>
                    <th></th>
                    <th></th>
                </tr>
                {filteredProjects.map((item) => <ProjectListItem item={item} deleteProject={deleteProject}/>)}
            </table>
            <Link className="create-but" to='/project/create'>Create</Link>
        </div>
    )
}

const ProjectUserItem = ({user}) => {
    return (
        <li style={{display:"block"}}>
            {user}
        </li>
    )
}

const ProjectDetail = ({projects}) => {
    let { id } = useParams();
    let item
    projects.map(project => {if(project.id == id) item = project})
    return (
        <div className={"detail"}>
            <h1>{item.name}</h1>
            Repository: <a href={item.url}>{item.url}</a>
            <p></p>
            Users:
            <ul>
            {item.users.map((user) => <ProjectUserItem user={user}/>)}
            </ul>
            <Link className="edit-but" to={`/project/edit/${id}`}>Edit</Link>
        </div>
    )
}

export {ProjectDetail,ProjectList}