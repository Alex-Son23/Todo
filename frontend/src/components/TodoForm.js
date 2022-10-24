import React from 'react'

class TodoForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            user: this.props.users[0].id,
            project: this.props.projects[0].id,
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.text, this.state.user, this.state.project, this.props.projects)
    }

    // handleChangeUser(event){
    //     this.setState({
    //         [event.target.name]: [event.target.value]
    //     })
    // }

    handleSubmit(event){
        console.log(this.state.text, this.state.user, this.state.project)
        this.props.createTodo(this.state.text, this.state.user, this.state.project)
        event.preventDefault()
    }

    render(){
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">Name</label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label form="user">User</label>
                    <select name="user" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label form="project">Project</label>
                    <select name="project" className="form-control" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary mybut" value="Save"/>
            </form>
        );
    }

}

export default TodoForm
