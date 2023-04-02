import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import Logo from '../../assets/logo-seven-white.png'
import Button from '@material-ui/core/Button'
import './navbar.scss'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  
    return (
        <div>
            <AppBar position="static" className="navbar">
                <Toolbar className='toolBar'>
                    <div className="buttons">
                        <NavLink to="/" className="link">
                            <Button className="button">
                                <SupervisorAccountIcon />
                                <h1>
                                    Usuários
                                </h1>
                            </Button>
                        </NavLink>
                        <NavLink to="/lixeira" className="link">
                            <Button className="button">
                                <DeleteSweepIcon />
                                <h1>
                                    Lixeira
                                </h1>
                            </Button>
                        </NavLink>
                    </div>
                    <div className='logo-seven'>
                        <img src={Logo} alt="logo" className="ico-small" />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
  