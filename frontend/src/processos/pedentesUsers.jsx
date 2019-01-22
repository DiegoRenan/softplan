import React from 'react'
import IconButton from '../template/iconsButton'
import Grid from '../template/grid'

export default props => {

    const renderUsers = () => {
        const users = props.users || []
        
        return users.map(user =>
            <option className="form-control" 
                    value={user.id} 
                    id={user.username}
                    key={user.id}>{user.username}</option>
        )
    }
    
    if(props.role == "TRIADOR"){
        return(
            <div className="pendentes">
                <Grid cols= "12 7 8">
                    <select id={props.processo} defaultValue="default" onChange={props.handleChangeSelectUser} className="form-control  select-redirecionar" >
                        <option disabled value="default">Direcionar para:</option>
                        {renderUsers()}
                    </select>
                </Grid>

                <Grid cols= "12 5 4">
                    <IconButton style='primary'
                                icon='share' 
                                onClick={props.handleRedirecionar} />
                </Grid>
         </div>  
        )
    }else{
        return(<div></div>)
    }
}