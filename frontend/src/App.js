import React from "react";
import './App.css';
import UsersList from "./components/users";
import axios from "axios";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ProjectList,ProjectDetail} from "./components/projects";
import TodoList from "./components/todo";
import NotFound404 from "./components/NotFound404";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/";
import MenuList from "./components/menu"
import {logDOM} from "@testing-library/react";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import ProjectEditForm from "./components/ProjectEditForm";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'navBarItems': [
            {name: 'Users', href: '/'},
            {name: 'Projects', href: '/project'},
            {name: 'TODO\'s', href: '/todos'}
        ],

        'users': [],
        'projects': [],
        'project': [],
        'todos': [],


        'token': '',
        'auth':{username:'', isLogin: false},
        'name':'',
    }
  }


    createProject(name, URL, users){
        let headers = this.getHeaders()
        let data = {name: name, URL: URL, users:users}
        console.log(data)
        axios.post(get_url('project/'), data, {headers}).then(response =>{
            this.loadData()
        }).catch((error) => console.log(error))
    }

    editProject(id, name, URL, users){
        console.log(users)
        let headers = this.getHeaders()
        let data = {name: name, URL: URL, users:users}
        console.log(data)
        axios.put(get_url(`project/${id}/`), data, {headers}).then(response =>{
            this.loadData()
        }).catch((error) => console.log(error))
    }

    deleteProject(id){
        let headers = this.getHeaders()
        // headers["Access-Control-Allow-Origin"] = "*"
        axios.delete(get_url('project/'+id+'/'), {headers}).then(response =>{
            this.loadData()
        }).catch(error => console.log(error))
    }

    createTodo(text, user, project){
        let headers = this.getHeaders()
        let data = {text: text, user: user, project:project}
        console.log(data)
        axios.post(get_url('todo/'), data, {headers}).then(response =>{
            this.loadData()
        }).catch((error) => console.log(error))
    }

    deleteTodo(id){
        let headers = this.getHeaders()
        // headers["Access-Control-Allow-Origin"] = "*"
        axios.delete(get_url('todo/'+id+'/'), {headers}).then(response =>{
            this.loadData()
        }).catch(error => console.log(error))
    }

    logout(){
        this.setToken('')
        window.location.reload()
    }

    isAuth(){
        return !!this.state.token
    }

    setToken(token){
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token':token}, () => this.loadData())
    }

    getTokenFromStorage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, () => this.loadData())
    }

    getToken(username,password){
        const data = {username:username, password:password}
        axios.post('http://127.0.0.1:8000/api-token-auth/',data).then(response => {
            this.setState({
                'auth': {username: username, isLogin:true}
            })
            const cookies = new Cookies()
            cookies.set('name', username)
            this.setToken(response.data['token'])
        }).catch(error => {
            if (error.response.status === 400) {
                alert('Неверный логин или пароль')
            } else {
                console.log(error)
            }
        })
    }

    loadData(){

        const headers = this.getHeaders()

        const cookies = new Cookies()
        let name = cookies.get('name')
        console.log(name)
        if (this.state.token !== '' && name !== undefined){
            this.setState({
                'auth':{username: name, isLogin: true}
            })
        }

        axios.get(get_url('users/'),{headers}).then(response => {
                const users = response.data['results']
                // console.log(users)
                    this.setState(
                        {
                            'users': users,
                        }
                    )
            }).catch(error => console.log(error))

        axios.get(get_url('todo/'), {headers}).then(response => {
                const todos = response.data['results']
                    this.setState(
                        {
                            'todos': todos,
                        }
                    )
            }).catch(error => console.log(error))

        axios.get(get_url('project/'), {headers}).then(response => {
                const projects = response.data['results']
                    this.setState(
                        {
                            'projects': projects,
                        }
                    )
            }).catch(error => console.log(error))
    }

    getHeaders(){
        let headers = {
            'Content-Type':'application/json'
        }
        if (this.isAuth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }

    render () {
    return (
        <div>
            <BrowserRouter>
                <MenuList items={this.state.navBarItems} auth={this.state.auth} logout={() => this.logout()}/>

                <Routes>
                    <Route exact path='/' element={<UsersList users={this.state.users}/>}/>

                    <Route exact path='/login' element={<LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>

                    <Route path='/project'>
                        <Route index element={<ProjectList items={this.state.projects}  deleteProject={(id)=>this.deleteProject(id)}/>} />
                        <Route path="/project/:id" element={<ProjectDetail projects={this.state.projects}/>}/>
                        <Route path="/project/edit/:id" element={<ProjectEditForm projects={this.state.projects} users={this.state.users} editProject={(id, name, URL, users) => this.editProject(id, name, URL, users)}/>}/>
                        <Route path="/project/create" element={<ProjectForm users={this.state.users} createProject={(name, URL, users)=> this.createProject(name, URL, users)}/>}/>
                    </Route>

                    <Route path='/todos'>
                        <Route index element={<TodoList todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)}/>} />
                        <Route path="/todos/create" element={<TodoForm projects={this.state.projects} users={this.state.users} createTodo={(text, user, project)=> this.createTodo(text, user, project)}/>}/>
                    </Route>

                    <Route path="*" element={<NotFound404/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    )
  }
}

export default App;


