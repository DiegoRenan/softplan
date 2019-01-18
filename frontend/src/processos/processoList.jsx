import React from 'react'
import IconButton from '../template/iconsButton'
import Grid from '../template/grid'

export default props => {

    const renderRows = () => {
        
        const list = props.list || []

        return list.map( proc =>
            
            <div className="list-group" key={proc.id}>
                <a href="#" className="list-group-item list-group-item-success">
                   {proc.title} 
                </a>
                
                <li href="#" className="list-group-item ">
                    {proc.body}
                </li>
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