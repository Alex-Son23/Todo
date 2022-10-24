import React from 'react'

class ProjectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            users:[],
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        // console.log(this.state.users)
    }

    handleChangeUsers(event){
        console.log(event.target.selectedOptions)
        let users = []
        for (let i =0; i < event.target.selectedOptions.length; i++){
            users.push(Number(event.target.selectedOptions.item(i).value))

        }

        console.log(users)

        this.setState({
            [event.target.name]: users
        })
        // console.log()
    }

    handleSubmit(event){
        console.log(this.state.name, this.state.url, this.state.users)
        this.props.createProject(this.state.name, this.state.url, this.state.users)
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
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary mybut" value="save"/>
            </form>
        );
    }

}

export default ProjectForm
