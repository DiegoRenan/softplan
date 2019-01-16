import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconsButton'

export default props => (

    <div role='form' className='userForm'>

        <Grid cols= "12 5 6">
            <input id="username" className="form-control" placeholder="Username" 
            value={props.username} onChange={props.handleChangeUsername}/>
        </Grid>
        <Grid cols= "12 4 4">
            <input id="password" className="form-control password" placeholder="password" 
                value={props.password} onChange={props.handleChangePassword} />
        </Grid>
        <Grid cols= "12 3 2">
            <IconButton style='primary' icon='plus' onClick={props.handleAdd}></IconButton>
        </Grid>

    </div>

)