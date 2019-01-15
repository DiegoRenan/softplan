import React from 'react'

export default props => (
    <nav className='navbar navbar-inverse bg-inverse'>
        <div className='container'>
            <div className='navbar-header'>
                
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" 
                    data-target="#navbar" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>

                <a className='navbar-brand' href='#'>
                    <i className='fa fa-calendar-check-o'></i>
                    Softplan
                </a>
            </div>

            <div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><a href="#/processos">Processos</a></li>
                    <li><a href="#/users">Users</a></li>
                </ul>
            </div>
        </div>
    </nav>
)