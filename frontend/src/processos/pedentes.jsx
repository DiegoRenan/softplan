import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ProcessoList from './processoList'
import Menu from '../template/menu'

const URL = 'http://localhost:8080/processos/pendentes'
const URL_PROC = 'http://localhost:8080/processos'
const URL_USERS =  'http://localhost:8080/users'

export default class Home extends Component{

    constructor(props){
        super(props)

        this.state = {user_id: props.params.user_id, role: '',
                                                    username: '',
                                                    processo: '', 
                                                    select_user_id: '', 
                                                    select_user_name: '', 
                                                    users: [], 
                                                    list: []}
        
        this.handleRedirecionar = this.handleRedirecionar.bind(this)
        this.handleChangeSelectUser = this.handleChangeSelectUser.bind(this)

        this.findUser()
        this.refresh()
        this.getUsers()
    }

    findUser(){
        axios.get(`${URL_USERS}/${this.props.params.user_id}`)
            .then((resp) =>{
                this.setState({...this.state, role: resp.data.role, 
                                              username: resp.data.username,
                })
            })                                                                  
    }

    refresh(){
        axios.get(`${URL}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, list: resp.data})
            } )
    }


    getUsers(){
        axios.get(`${URL_USERS}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, users: resp.data})
            } )
    }

    handleChangeSelectUser(e){
        const index = e.target.selectedIndex
        const username = e.target.children[index].innerText
        this.setState({ ...this.state, select_user_id: e.target.value, 
                                       select_user_name: username, 
                                       processo: e.target.id})
    }

    handleRedirecionar(){
        const text = "Aguardando seu parecer"
        
        const feedback = {
            id : this.state.processo,
            text : text,
            author: {
                id: this.state.select_user_id,
                name: this.state.select_user_name
            }
        }

        console.log(this.state.processo)
        
        // var bodyFormData = new FormData()
        // bodyFormData.set('id', this.state.processo)
        // bodyFormData.set('text', text)
        // bodyFormData.set('author', {'id': this.state.select_user_id, 'name': this.state.select_user_name})
        // console.log(this.state.processo)

      
        axios.post(`${URL_PROC}/${this.state.processo}/feedback`, feedback)
             .then(resp => this.refresh())
    }

    render(){

       return( 
            <div>
                <Menu user_id={this.state.user_id}/> 
                <PageHeader name='Processos' small='Pendentes'></PageHeader>
                <ProcessoList list={this.state.list}
                    users={this.state.users}
                    processo={this.state.processo}
                    handleChangeSelectUser={this.handleChangeSelectUser}
                    handleRedirecionar={this.handleRedirecionar}/>
            </div>
       )

    }
}