import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import UserForm from './userForm'
import UserList from './userList'

export default class User extends Component {
    render(){
        return(
            <div>
                <PageHeader name='Users' small='Cadastro'></PageHeader>
                <UserForm />
                <UserList />
            </div>
        )
    }
}