import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ProcessoForm from './processoForm'
import ProcessoList from './processoList'
import Menu from '../template/menu'

const URL = 'http://localhost:8080' 
const URL_USER = 'http://localhost:8080/users'
const URL_PROC = 'http://localhost:8080/processos'

export default class Processo extends Component {

    constructor(props){
        super(props)

        this.state = {username: '', role: '', user_id: this.props.params.user_id, 
                                                       title: '', 
                                                       body: '', 
                                                       users: '',
                                                       list: []}

       this.handleChangeTitulo = this.handleChangeTitulo.bind(this)
       this.handleChangeBody = this.handleChangeBody.bind(this)
        
       this.handleAdd = this.handleAdd.bind(this)
      
       this.findUser()
       this.refresh()
       this.getUsers()
        
    }
    

    findUser(){
        axios.get(`${URL_USER}/${this.state.user_id}`)
            .then((resp) =>{
                this.setState({...this.state, user_id: resp.data.id,
                     role: resp.data.role, username: resp.data.username, title: '', body: '', list: []})
                    
                    
                this.refresh()
            })                                                                  
    }

    refresh(){
        axios.get(`${URL_PROC}`)
            .then((resp) => this.setState({...this.state, title: '', body: '', user_id: this.props.params.user_id, title: '', body: '', list: resp.data}))
    }

    getUsers(){
        axios.get(`${URL_USER}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, users: resp.data})
            } )
    }


    handleChangeTitulo(e){
        this.setState({ ...this.state, title: e.target.value})
    }

    handleChangeBody(e){
        this.setState({ ...this.state, body: e.target.value})
    }


    handleAdd(){
        console.log("username")
        console.log(this.state.username)
        const processo ={
            title: this.state.title,
            body: this.state.body,
            author: {
                id: this.state.user_id,
                name: this.state.username
            } 
        }


        axios.post(URL_PROC, processo)
            .then(resp => this.refresh())
    }

    handleRemove(proc){
        axios.delete(`${URL}/${proc.id}`)
            .then(resp => this.refresh())
    }

    render(){
        return(
            <div>
                <Menu user_id={this.state.user_id}/>
                <PageHeader name='Processos' small='Cadastro'></PageHeader>
                <ProcessoForm titulo={this.state.list.title}
                    body={this.state.list.body}
                    handleChangeTitulo={this.handleChangeTitulo}
                    handleChangeBody={this.handleChangeBody} 
                    handleAdd={this.handleAdd}/>
                
                <ProcessoList list={this.state.list}
                    user_id={this.props.params.user_id}
                    users={this.state.users}
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
    
}