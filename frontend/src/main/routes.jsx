import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Home from '../main/index'
import Processo from '../processos/processos'
import ProcPendente from '../processos/pedentes'
import User from '../users/users'
import UserEdit from '../users/userEdit'

export default props => (

    <Router history={hashHistory}>
        <Route path='/index' component={Home} />
        <Route path='/user/:user_id/processos' component={Processo} />
        <Route path='/user/:user_id/processos/pendentes' component={ProcPendente} />
        <Route path='/user/:user_id/users' component={User} />
        <Route path='/user/:user_id/users/:id' component={UserEdit} />
        <Redirect from='*' to='/index' />
    </Router>
)