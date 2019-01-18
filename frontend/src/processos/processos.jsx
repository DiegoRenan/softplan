import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ProcessoForm from './processoForm'
import ProcessoList from './processoList'

const URL = 'http://localhost:8080' 
const URL_USER = 'http://localhost:8080/users'

export default class Processo extends Component {

    constructor(props){
        super(props)

        this.state = {username: '', role: '', user_id: '' , list: []}

        this.handleChangeTitulo = this.handleChangeTitulo.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
        
        this.handleAdd = this.handleAdd.bind(this)
      
        this.findUser()
    }
    

    findUser(){
        axios.get(`${URL_USER}/${this.props.params.user_id}`)
            .then((resp) =>{
                console.log(resp.data)
            })                                                                  
    }

    refresh(){
        axios.get(`${URL_PROC}?sort=-createAt`)
            .then((resp) => this.setState({...this.state, list: resp.data}))
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
        axios.post(URL, {body, title, author})
            .then(resp => this.refresh())
    }

    handleRemove(proc){
        axios.delete(`${URL}/${proc.id}`)
            .then(resp => this.refresh())
    }

    render(){
        return(
            <div>
                
                <PageHeader name='Processos' small='Cadastro'></PageHeader>
                <ProcessoForm titulo={this.state.title}
                    body={this.state.body}
                    handleChangeTitulo={this.handleChangeTitulo}
                    handleChangeBody={this.handleChangeBody} 
                    handleAdd={this.handleAdd}/>
                
                <ProcessoList list={this.state.list}
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
}