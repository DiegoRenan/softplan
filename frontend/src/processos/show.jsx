import React, {Component} from 'react'
import axios from 'axios'

import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import Pendentes from './pedentesUsers'
import Feedbacks from './feedback'

const URL_PROC = 'http://localhost:8080/processos'
const URL_USERS =  'http://localhost:8080/users'

export default class ProcessoShow extends Component{

    constructor(props){
        super(props)

        this.state = {user_id: this.props.params.user_id, 
                                                username: '', 
                                                role: '', 
                                                users: [], 
                                                proc: [],
                                                feedbacks: []}
        this.findUser()
        this.refresh()
        this.getUsers()
    }

    findUser(){
        axios.get(`${URL_USERS}/${this.state.user_id}`)
            .then((resp) =>{
                this.setState({...this.state, user_id: resp.data.id,
                                                       username: resp.data.username,
                                                       role: resp.data.role})
            })                                                                  
    }

    refresh(){
        axios.get(`${URL_PROC}/${this.props.params.id}`)
            .then((resp) =>{
                this.setState({...this.state, proc: resp.data, feedbacks: resp.data.feedbacks})
            } )
    }

    getUsers(){
        axios.get(`${URL_USERS}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, users: resp.data})
            } )
    }

    render(){
        
        return(
            <div>
                <Menu user_id={this.props.params.user_id}/>
                <PageHeader name='Processo' small='Show' />
                
                <div className="panel panel-default" key={this.state.proc.id}>
                    <div className="panel-heading">
                        {this.state.proc.title} 
                    </div>
                    <div className="panel-body">
                        {this.state.proc.body}
                        <Feedbacks feedbacks={this.state.feedbacks}/>
                    </div>
                    <Pendentes users={this.state.users} />
                </div>
                
            </div>           
        )
    }


}