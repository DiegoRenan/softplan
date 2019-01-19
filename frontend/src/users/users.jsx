import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import UserForm from './userForm'
import UserList from './userList'
import Menu from '../template/menu'

const URL = 'http://localhost:8080/users' 

export default class User extends Component {
    constructor(props){
        super(props)
        this.state = {user_id: this.props.params.user_id, username: '', password: '', 
                            role: '', list: []}

        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeRole = this.handleChangeRole.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.handleAdd = this.handleAdd.bind(this)
        
        this.refresh()
    }

    refresh(){
        axios.get(`${URL}?sort=-createAt`)
            .then((resp) => this.setState({...this.state, username: '',
                password: '', role: '', list: resp.data}))
    }

    handleChangeUsername(e){
        this.setState({ ...this.state, username: e.target.value})
    }

    handleChangePassword(e){
        this.setState({ ...this.state, password: e.target.value})
    }

    handleChangeRole(e){
        this.setState({ ...this.state, role: e.target.value})
    }

    handleAdd(){
                
        const username = this.state.username
        const password = this.state.password
        const role = this.state.role

        axios.post(URL, {username, password, role})
            .then(resp => this.refresh())
    }

    handleRemove(user){
        axios.delete(`${URL}/${user.id}`)
            .then(resp => this.refresh())
    }

    
    render(){
        return(
            <div>
                <Menu user_id={this.state.user_id}/>
                <PageHeader name='Users' small='Cadastro'></PageHeader>
                <UserForm username={this.state.username}
                    password={this.state.password}
                    role={this.state.role}
                    handleChangeUsername={this.handleChangeUsername}
                    handleChangePassword={this.handleChangePassword} 
                    handleChangeRole={this.handleChangeRole} 
                    handleAdd={this.handleAdd}/>
                <UserList list={this.state.list}
                    handleRemove={this.handleRemove}
                    />
            </div>
        )
    }
}