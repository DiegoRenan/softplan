import React from 'react'
import userList from '../users/userList';

export default props => {

    const userList = () => {
        const list = props.list || []
   
        return list.map( user =>
            <div className="col-xs-6 col-md-3" key={user.id}>
                <a href={`#/user/${user.id}/processos`} className="thumbnail">
                    <h3>{user.username}</h3>
                    Role: {user.role}
                </a>
            </div>
        )
    }
    
    
    return (
        
        <div className="row">
            {userList()}
        </div>
    )
}