import React from 'react'
import IconButton from '../template/iconsButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map( user =>
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                    <a href={`#/users/${user.id}`}>
                        <span className="btn btn-default btn-sm glyphicon glyphicon-pencil"></span>
                    </a>
                </td>
                <td>
                    <IconButton style='danger' icon='trash-o'
                        onClick={() => props.handleRemove(user)} />
                </td>
            </tr>
        )
    }

    return(

         <table className='table'>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )

}