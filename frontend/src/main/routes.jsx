import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Processo from '../processos/processos'
import User from '../users/users'
import UserEdit from '../users/userEdit'

export default props => (

    <Router history={hashHistory}>
        <Route path='/processos' component={Processo} />
        <Route path='/users' component={User} />
        <Route path='/users/:id' component={UserEdit} />
        <Redirect from='*' to='/processos' />
    </Router>
)