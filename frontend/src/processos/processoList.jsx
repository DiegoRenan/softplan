import React from 'react'
import Moment from 'moment'

import PendentesUsers from './pedentesUsers'
import Grid from '../template/grid'

Moment.globalFormat = 'D MMM YYYY';
Moment.globalTimezone = 'America/Los_Angeles';

export default props => {

    const renderRows = () => {
        const users = props.users || []
        const list = props.list || []  
        Moment.globalLocale = 'en'

        console.log(list)
        
        return list.map( proc =>
            
            <div className="panel panel-default" key={proc.id} >
                <div className="panel-heading">
                    <a  href={`#/user/${props.user_id}/processos/${proc.id}/show`}>
                        {proc.title} by: {this.author.name} date: {Moment(proc.date).format('DD/MM/YYYY')}
                    </a>
                </div>
                <div className="panel-body">
                    {proc.body}
                </div>
                
                <PendentesUsers users={users}
                             select_user_id={props.select_user_id}
                             select_user_name={props.select_user_name}
                             processo={proc.id}
                             handleChangeSelectUser={props.handleChangeSelectUser}
                             handleRedirecionar={props.handleRedirecionar}/>
            </div>
        ) 
    }

    return(
        
        <div>
            <Grid cols= "12 12 12">
                {renderRows()}
            </Grid>
        </div> 
    )

}