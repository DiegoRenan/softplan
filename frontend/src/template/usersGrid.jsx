import React from 'react'
import userList from '../users/userList';
import { Certificate } from 'crypto';

export default props => {

    const userList = () => {
        const list = props.list || []
   
        return list.map( user =>
            <div className="user-grid" key={user.id}>
                <a href={`#/user/${user.id}/processos`} className="thumbnail">
                    <h3>{user.username}</h3>
                    Role: {user.role}
                </a>
            </div>
        )
    }
    
    
    return (
        
        <div className="row ">
            <center>{userList()}</center>
            
        </div>
    )
}