import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'

import React from 'react'
import Processo from '../processos/processos'
import User from '../users/users'


export default props => (
    <div className='container'>
        <Processo />
        <User />
    </div>
)