import React from 'react'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map( user =>
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
            </tr>
        )
    }

    return(

         <table className='table'>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )

}