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

        this.state = {username: '', role: '', user_id: this.props.params.user_id, title: '', body: '', list: []}

        this.handleChangeTitulo = this.handleChangeTitulo.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
        
        this.handleAdd = this.handleAdd.bind(this)
      
        this.findUser()

        this.refresh()
    }
    

    findUser(){
        axios.get(`${URL_USER}/${this.props.params.user_id}`)
            .then((resp) =>{
                this.setState({...this.state, user_id: resp.data.id,
                     role: resp.data.role, username: resp.data.username, title: '', body: '', list: []})
            })                                                                  
    }

    refresh(){
        axios.get(`${URL_PROC}?sort=-createAt`)
            .then((resp) => this.setState({...this.state, title: '', body: '', list: resp.data}))
    }


    handleChangeTitulo(e){
        this.setState({ ...this.state, title: e.target.value})
    }

    handleChangeBody(e){
        this.setState({ ...this.state, body: e.target.value})
    }


    handleAdd(){
        const title = this.state.title
        const body = this.state.body
        const author = {id: '123123', username: 'TestFrom'}
        axios.post(URL_PROC, {body, title, author})
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
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
    
}