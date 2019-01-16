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
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )

}