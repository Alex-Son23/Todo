import React from "react";
import logo from './logo.svg';
import './App.css';
import UsersList from "./components/users";
import axios from "axios";
import MenuList from "./components/menu";
import FooterList from "./components/footer";
import {BrowserRouter, HashRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import ProjectList from "./components/projects";
import TodoList from "./components/todo";
import NotFound404 from "./components/NotFound404";
import Project from "./components/project";



const PageNotFound = () => {
    return (
        <div>
            <h1>Страница по адресу '{this.location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'todos': [],
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data['results']
                this.setState(
                    {
                        'users': users,
                    }
                )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
            const todos = response.data['results']
                this.setState(
                    {
                        'todos': todos,
                    }
                )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project/')
        .then(response => {
            const projects = response.data['results']
                this.setState(
                    {
                        'projects': projects,
                    }
                )
        }).catch(error => console.log(error))
  }

  render () {
    return (
        <div>
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/' className={'menu-but'}>Users</Link>
                        </li>
                        <li>
                            <Link to='/todos' className={'menu-but'}>Todos</Link>
                        </li>
                        <li>
                            <Link to='/projects' className={'menu-but'}>Projects</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path='/' element={<UsersList users={this.state.users}/>}/>

                    {/*<Route path='/projects'>*/}
                    {/*    <Route index element={<Project projects={this.state.projects}/>} />*/}
                    {/*    <Route path=':productId' element={<ProjectList projects={this.state.projects}/>} />*/}
                    {/*</Route>*/}

                    <Route path='/projects'>
                        <Route index element={<ProjectList projects={this.state.projects}/>} />
                        <Route path='/projects:projectId' element={<Project projects={this.state.projects} /> } />
                    </Route>

                    <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>} />


                    {/*<Route path='/project/:id'>*/}
                    {/*    <Project project={this.state.projects}/>*/}
                    {/*</Route>*/}
                    <Route path="*" element={<NotFound404/>}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
  }
}

export default App;


