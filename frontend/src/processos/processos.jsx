import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ProcessoForm from './processoForm'
import ProcessoList from './processoList'


export default class Processo extends Component {

    constructor(props){
        super(props)
        this.state = {titulo: '', body: '', list: []}

        this.handleChangeTitulo = this.handleChangeTitulo.bind(this)
        this.handleChangeBody = this.handleChangeBody.bind(this)
        
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleChangeTitulo(e){
        this.setState({ ...this.state, titulo: e.target.value})
    }

    handleChangeBody(e){
        this.setState({ ...this.state, body: e.target.value})
    }

    handleAdd(){
        console.log(this.state.titulo)
        console.log(this.state.body)
    }

    render(){
        return(
            <div>
                <PageHeader name='Processos' small='Cadastro'></PageHeader>
                <ProcessoForm titulo={this.state.titulo}
                    body={this.state.body}
                    handleChangeTitulo={this.handleChangeTitulo}
                    handleChangeBody={this.handleChangeBody} 
                    handleAdd={this.handleAdd}/>
                <ProcessoList />
            </div>
        )
    }
}