import React from "react";
import logo from './logo.svg';
import './App.css';
import UsersList from "./components/users";
import axios from "axios";
import MenuList from "./components/menu";
import FooterList from "./components/footer";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ProjectList,ProjectDetail} from "./components/projects";
import TodoList from "./components/todo";
import NotFound404 from "./components/NotFound404";
import Project from "./components/project";
import project from "./components/project";

const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'project': [],
        'todos': [],
        'func': function (){},
    }
  }

  // getProject(id) {
  //     // console.log(get_url(`project/${id}`))
  //       axios.get(get_url(`project/${id}`))
  //           .then(response => {
  //               const project = response.data
  //               console.log(project)
  //               this.setState(
  //                   {
  //                       'project': project,
  //                   }
  //               )
  //           }).catch(error => console.log(error))
  // }



  componentDidMount() {

      function getProject(id) {
          axios.get(get_url(`project/${id}`))
                .then(response => {
                    const project = response.data
                    console.log(project)
                    // this.setState(
                    //     {
                    //         'project': project,
                    //     }
                    // )
                    return 'hllo wrol'
                }).catch(error => console.log(error))
          // console.log(project)
      }

      this.setState(
          {
              'func': getProject,
          }
      )
      
    axios.get(get_url('users/'))
        .then(response => {
            const users = response.data['results']
            // console.log(users)
                this.setState(
                    {
                        'users': users,
                    }
                )
        }).catch(error => console.log(error))

    axios.get(get_url('todo/'))
        .then(response => {
            const todos = response.data['results']
                this.setState(
                    {
                        'todos': todos,
                    }
                )
        }).catch(error => console.log(error))

    axios.get(get_url('project/'))
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
                            <Link to='/project' className={'menu-but'}>Projects</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path='/' element={<UsersList users={this.state.users}/>}/>

                    <Route path='/project'>
                        <Route index element={<ProjectList items={this.state.projects}/>} />
                        {/*<Route path="/project/:id" element={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project}/>}/>*/}
                        <Route path="/project/:id" element={<ProjectDetail getProject={(id) => this.state.func(id)} item={this.state.project}/>}/>
                        {/*<Route path="/project/:id" element={<ProjectDetail getProject={this.getProject} item={this.state.project} func={this.}/>}/>*/}
                    </Route>

                    {/*<Route path='/project' element={<ProjectList items={this.state.projects}/>} />*/}
                    {/*<Route path="/project/:id" element={<Project projects={this.state.projects}/>}/>*/}

                    <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>} />
                    <Route path="*" element={<NotFound404/>}/>} />
                </Routes>

            </BrowserRouter>
        </div>
    )
  }
}

export default App;


