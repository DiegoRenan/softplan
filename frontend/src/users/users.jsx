import React, { Component } from 'react'

import PageHeader from '../template/pageHeader'
import UserForm from './userForm'
import UserList from './userList'

export default class User extends Component {
    constructor(props){
        super(props)
        this.state = {username: '', password: '', list: []}

        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleChangeUsername(e){
        this.setState({ ...this.state, username: e.target.value})
    }

    handleChangePassword(e){
        this.setState({ ...this.state, password: e.target.value})
    }

    handleAdd(){
        console.log(this.state.username)
        console.log(this.state.password)
    }

    render(){
        return(
            <div>
                <PageHeader name='Users' small='Cadastro'></PageHeader>
                <UserForm username={this.state.username}
                    password={this.state.password}
                    handleChangeUsername={this.handleChangeUsername}
                    handleChangePassword={this.handleChangePassword} 
                    handleAdd={this.handleAdd}/>
            </div>
        )
    }
}