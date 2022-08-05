import React from "react";
import logo from './logo.svg';
import './App.css';
import UsersList from "./components/users";
import axios from "axios";
import MenuList from "./components/menu";
import FooterList from "./components/footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'menu': [],
        'footer':[]
    }
  }

  componentDidMount() {
    const menu = [
            {
                'name':'Главная',
            },
            {
                'name':'Заметки',
            },
            {
                'name':'Цели',
            },
            {
                'name':'Пользователи',
            },
        ]
    const footer = [
        {
            'name': 'О нас'
        },
        {
            'name': 'Правила пользования'
        },
        {
            'name': 'Контакты'
        },
    ]
    this.setState(
        {
            'menu': menu,
            'footer':footer,
        }
    )

    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
                this.setState(
                    {
                        'users': users,
                    }
                )
            console.log(this.state)
        }).catch(error => console.log(error))
  }

  render () {
    return (
        <div>
            <MenuList items={this.state.menu}/>
            <UsersList users={this.state.users}/>
            <FooterList items={this.state.footer}/>
        </div>
    )
  }
}

export default App;


