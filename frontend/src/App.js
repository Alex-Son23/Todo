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

        'func': function (){},

        'token': '',
        'auth':{username:'', isLogin: false}
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
                'auth': {username: username, isLogin:true},
            })
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
        function getProject(id) {
            axios.get(get_url(`project/${id}`), {headers})
                .then(response => {
                    const project = response.data
                    // console.log(project)
                    return 'hllo wrol'
                }).catch(error => console.log(error))
        }

        this.setState(
            {
                'func': getProject,
            }
        )

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
                {/* <nav>
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
                        <li>
                            {this.isAuth() ? <button className={'menu-but'} onClick={() => this.logout()}>Logout</button> : <Link to='/login' className={'menu-but'}>Login</Link>}
                        </li>
                    </ul>
                </nav> */}
                <MenuList items={this.state.navBarItems} auth={this.state.auth} logout={() => this.logout()}/>

                <Routes>
                    <Route exact path='/' element={<UsersList users={this.state.users}/>}/>

                    <Route exact path='/login' element={<LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>

                    <Route path='/project'>
                        <Route index element={<ProjectList items={this.state.projects}/>} />
                        {/*<Route path="/project/:id" element={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project}/>}/>*/}
                        <Route path="/project/:id" element={<ProjectDetail getProject={(id) => this.state.func(id)} item={this.state.project}/>}/>
                    </Route>


                    <Route exact path='/todos' element={<TodoList todos={this.state.todos}/>} />
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>

            </BrowserRouter>
        </div>
    )
  }
}

export default App;


