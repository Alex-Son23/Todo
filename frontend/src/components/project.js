import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

let projectList = []

axios.get('http://127.0.0.1:8000/api/project/')
        .then(response => {
            projectList = response
            // console.log(projectList)
            // projectsFromServer = projects
        }).catch(error => console.log(error))


const Authors = ({user}) => {
    return (
        <span>
            {user}
            <br/>
        </span>
    )
}

const Project = async ({projects}) => {
const fetchData = async () => {
        try{
            const response = await axios('http://127.0.0.1:8000/api/project/');
            const data = response.data['results']
            // console.log(response, data)
            return data
        }catch (error){
            console.log(error.response)
        }
    };

    // let valpr = await fetchData()
    let project = await fetchData()
    // fetchData()
    console.log(valpr)

    //код выше это эксперемент/временное решение, его можно в комент кинуть

    //код ниже работает только при условии входа в стринцу со страницы projects
    // let {projectId} = useParams()
    // console.log(projects,projectId)
    // let project = projects.filter(project => project.id == projectId)[0]

    return (
        <div>
            {/*<span>{project}</span>*/}
            {/*<span>{projects}</span>*/}
             <h2>{project.name}</h2>
             <h3>URL</h3>
             <p>{project.url}</p>
             <h3>Authors</h3>
             {project.users.map((user) => <Authors user={user}/>)}
        </div>
    )
}

export default Project