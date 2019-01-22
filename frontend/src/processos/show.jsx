import React, {Component} from 'react'
import axios from 'axios'

import Menu from '../template/menu'
import PageHeader from '../template/pageHeader'
import Pendentes from './pedentesUsers'
import Feedbacks from './feedback'
import FeedbackNew from './feedbackNew'

const URL_PROC = 'http://localhost:8080/processos'
const URL_USERS =  'http://localhost:8080/users'

export default class ProcessoShow extends Component{

    constructor(props){
        super(props)

        this.state = {user_id: props.params.user_id, 
                                                username: '', 
                                                role: '', 
                                                users: [], 
                                                proc: [],
                                                body: '',
                                                feedbacks: [],
                                                author_fb: ''}

        this.handleChangeBody = this.handleChangeBody.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        
        this.refresh()
        this.findUser()
        this.getUsers()
    }

    findUser(){
        axios.get(`${URL_USERS}/${this.props.params.user_id}`)
            .then((resp) =>{
                this.setState({...this.state, user_id: resp.data.id, 
                                              username: resp.data.username})
            })                                                                  
    }

    refresh(){
        axios.get(`${URL_PROC}/${this.props.params.id}`)
            .then((resp) =>{
                this.setState({...this.state, proc: resp.data,   
                                            feedbacks: resp.data.feedback})
        } )
    }

    getUsers(){
        axios.get(`${URL_USERS}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, users: resp.data})
            } )
    }

    handleChangeBody(e){
        this.setState({ ...this.state, body: e.target.value})
    }

    handleAdd(){
        const feedback ={
            text: this.state.body,
            author: {
                id: this.state.user_id,
                username: this.state.username
            } 
        }
        axios.post(`${URL_PROC}/${this.props.params.id}/feedback`, feedback)
             .then(resp => this.refresh())
    }

    render(){       
        return(
            <div>
                <Menu user_id={this.state.user_id}/>
                <PageHeader name='Processo' small='Show' />
                <div className="panel panel-default" key={this.state.proc.id}>
                    <div className="panel-heading">
                        <p>{this.state.proc.title}</p>
                    </div>
                    <div className="panel-body">
                        {this.state.proc.body}
                        <Feedbacks feedbacks={this.state.feedbacks}/>
                    </div>
                    <Pendentes users={this.state.users} />
                </div>
                <FeedbackNew  handleChangeBody={this.handleChangeBody} 
                              handleAdd={this.handleAdd}/>
            </div>           
        )
    }
}