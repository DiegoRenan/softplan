import React from 'react'

export default props => (
    <nav className='navbar navbar-inverse bg-inverse'>
        <div className='container'>
            <div className='navbar-header'>
                <a className='navbar-brand' href='#'>
                    <i className='fa fa-calendar-check-o'></i>
                    Softplan
                </a>
            </div>

            <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><a href="#/processos">Processos</a></li>
                    <li><a href="#/users">Users</a></li>
                </ul>
            </div>
        </div>
    </nav>
)