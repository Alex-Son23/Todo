// import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
// import axios from "axios";



const Authors = ({user}) => {
    return (
        <span>
            {user}
            <br/>
        </span>
    )
}

const Project = ({projects}) => {
    let {id} = useParams()
    console.log(projects)
    console.log(id)
    let item = projects[id]
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

export default Project