import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconsButton'

export default props => (

    <div role='form' className='processoForm'>

        <Grid cols= "12 3 3">
            <input id="titulo" className="form-control" placeholder="Titulo" value={props.titulo} 
                onChange={props.handleChangeTitulo}/>
        </Grid>
        <Grid cols= "12 6 7">
            <textarea id="body" className="form-control textarea" placeholder="Processo" value={props.body}
                onChange={props.handleChangeBody} />
        </Grid>
        <Grid cols= "12 3 2">
            <IconButton style='primary' icon='plus' onClick={props.handleAdd}></IconButton>
        </Grid>

    </div>

)