import React from 'react'
import IconButton from '../template/iconsButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
    
        return list.map( proc =>
            <ul key={proc.id}>
                <li >
                    {proc.title}
                </li>
                    <li>
                    <a href={`#/users/${proc.id}`}>
                        <span className="btn btn-default btn-sm glyphicon glyphicon-pencil"></span>
                    </a>
                </li>
                <li>
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => props.handleRemove(proc)} />
                </li>
                </ul>
            ) 
    }

    return(
        
        <div>
            {renderRows()}
        </div> 
    )

}