import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconsButton'

export default props => (

    <div role='form' className='userForm'>

        <Grid cols= "12 4 5">
            <input id="username" className="form-control" placeholder="Username" 
            value={props.username} onChange={props.handleChangeUsername}/>
        </Grid>
        <Grid cols= "12 3 3">
            <input id="password" type="password" className="form-control" placeholder="password" 
                value={props.password} onChange={props.handleChangePassword} />
        </Grid>
        <Grid cols= "12 2 2">
            <select id="role" className="form-control" value={props.role} 
                onChange={props.handleChangeRole}>
                    <option className="form-control" value="ADMINISTRADOR">ADMINITRADOR</option>
                    <option className="form-control" value="TRIADOR">TRIADOR</option>
                    <option className="form-control" value="FINALIZADOR">FINALIZADOR</option>
            </select>
        </Grid>

        <Grid cols= "12 3 2">
            <IconButton style='primary' icon='plus' onClick={props.handleAdd}></IconButton>
        </Grid>

    </div>

)