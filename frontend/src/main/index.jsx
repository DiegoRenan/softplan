import React, {Component} from 'react'
import axios from 'axios'

import Grid from '../template/grid'
import UserGrid from '../template/usersGrid'

const URL = 'http://localhost:8080/users' 

export default class Home extends Component{

    constructor(props){
        super(props)

        this.state = {username: '', role: '', list: []}

        this.refresh()

    }

    refresh(){
        axios.get(`${URL}?sort=-createAt`)
            .then((resp) =>{
                this.setState({...this.state, username: '', role: '', list: resp.data})
            } )
    }

    render(){

       return( 
            <div>
                <Grid cols= "12 12 12">
                    <h1>Processos</h1>

                    <h3>Select a User:</h3>
                    <UserGrid list={this.state.list} />
                </Grid>
            </div>
       )

    }
}
