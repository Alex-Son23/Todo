import React from "react";
import {useLocation, useParams} from "react-router-dom";
import {hasDocumentCookie} from "universal-cookie/es6/utils";

class ProjectEditForm extends React.Component{
    projectId = Number(String(window.location).split('/').slice(-1))
    // otherUsers = this.props.users.map(user =>)


    constructor(props) {
        super(props);
        let editProject
        this.props.projects.map(project => {if(project.id == this.projectId) editProject = project})

        let otherUsers = this.props.users.filter(user => !(editProject.users.includes(user.username)))
        let selectedUsers = this.props.users.filter(user => (editProject.users.includes(user.username)))

        let validSelectedUsers = selectedUsers.map(user => user.id)

        this.state = {
            id: this.projectId,
            name: editProject.name,
            url: editProject.url,
            users: validSelectedUsers,

            selectedUsers: selectedUsers,
            otherUsers: otherUsers,
        }
        console.log(this.state.users)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChangeUsers(event){
        // console.log(event.target.selectedOptions)
        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++){
            // console.log(event.target.selectedOptions)
            users.push(Number(event.target.selectedOptions.item(i).value))
        }

        console.log(users)

        this.setState({
            users: users
        })
        console.log(this.state.users)
    }

    handleSubmit(event){
        console.log(this.state.name, this.state.url, this.state.users)
        this.props.editProject(this.projectId, this.state.name, this.state.url, this.state.users)
        event.preventDefault()
    }

    render(){
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label for="url">URL</label>
                    <input type="text" className="form-control" name="url" value={this.state.url} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label form="users">users</label>
                    <select name="users" className="form-control" multiple onChange={(event) => this.handleChangeUsers(event)}>
                        {this.state.selectedUsers.map((user) => <option value={user.id} selected>{user.username}</option>)}
                        {this.state.otherUsers.map((user) => <option value={user.id} >{user.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary mybut" value="save"/>
            </form>
        );
    }

}

export default ProjectEditForm
