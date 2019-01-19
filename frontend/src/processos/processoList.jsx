import React from 'react'
import PendentesUsers from './pedentesUsers'
import Grid from '../template/grid'

export default props => {

    const renderRows = () => {
        const users = props.users || []
        const list = props.list || []
     
        return list.map( proc =>
            
            <div className="list-group" key={proc.id} >
                <div className="list-group-item list-group-item-info">
                    {proc.title} 
                </div>
                <li href="#" className="list-group-item ">
                    {proc.body}
                </li>
                
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