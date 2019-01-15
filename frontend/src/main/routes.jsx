import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Processo from '../processos/processos'
import User from '../users/users'

export default props => (

    <Router history={hashHistory}>
        <Route path='/processos' component={Processo} />
        <Route path='/users' component={User} />
        <Redirect from='*' to='/processos' />
    </Router>
)