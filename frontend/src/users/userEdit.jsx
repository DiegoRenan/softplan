import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import UserForm from './userForm'

const URL = 'http://localhost:8080/users' 

export default class UserEdit extends Component {
    constructor(props){
        super(props)
        
        this.state = {username: '', password: '', role: '', done: false, list: []}
        this.getUser()
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangeRole = this.handleChangeRole.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }   

    getUser(){
        axios.get(`${URL}/${this.props.params.id}`)
            .then((resp) => this.setState({...this.state, username: resp.data.username,
             password: '', role: resp.data.role, list: resp.data}))  
             
             console.log(this.state.list)
    }

    handleChangeUsername(e){
        this.setState({ ...this.state, username: e.target.value})
    }

    handleChangeRole(e){
        this.setState({ ...this.state, role: e.target.value})
    }

    handleChangePassword(e){
        this.setState({ ...this.state, password: e.target.value})
    }
  
    handleAdd(){
        const username = this.state.username
        const password = this.state.password
        const role = this.state.role
        const id = this.props.params.id
        console.log('update')
        axios.put(`${URL}/${id}`, {username, password, role})
            .then(() => this.setState({...this.state, done: true}))
    }


    render(){
        if(this.state.done){
            return (
                <div >
                    <center>
                        <h3 className="success">
                            Updated
                        </h3>
                        <a href="#/users">Voltar</a>
                    </center>
                </div>
            )
        }
        
        else{

            return(

                <div>
            
                    <PageHeader name='Users' small='Editar Cadastro'></PageHeader>
                    <UserForm username={this.state.username}
                        role={this.state.role}
                        password={this.state.password}
                        handleChangeUsername={this.handleChangeUsername}
                        handleChangeRole={this.handleChangeRole} 
                        handleChangePassword={this.handleChangePassword} 
                        handleAdd={this.handleAdd}/>
                </div>
            )
        }
    }
}