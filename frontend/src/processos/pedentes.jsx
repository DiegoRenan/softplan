import React, {Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import ProcessoList from './processoList'

const URL = 'http://localhost:8080/processos/pendentes' 

export default class Home extends Component{

    constructor(props){
        super(props)

        this.state = {list: []}

        this.refresh()

    }

    refresh(){
        axios.get(`${URL}?sort=-createAt`)
            .then((resp) =>{
                console.log(resp.data)
                this.setState({...this.state, list: resp.data})
            } )
    }

    render(){

       return( 
            <div>
                <PageHeader name='Processos' small='Pendentes'></PageHeader>
                <ProcessoList list={this.state.list} />
            </div>
       )

    }
}