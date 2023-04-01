import React from 'react'
import { AppBar, Toolbar,Typography } from '@material-ui/core'
import Logo from '../../assets/logo-seven-white.png'
import Button from '@material-ui/core/Button'
import './navbar.scss'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  
    return (
        <div>
            <AppBar>
                <Toolbar className='toolBar'>
                    <div className='buttons'>
                        <NavLink to="/" className="nav-link">
                            <Button variant="contained" href="/">
                                <SupervisorAccountIcon/>
                            </Button>
                        </NavLink>
                        <NavLink to="/lixeira" className="nav-link">
                            <Button variant="contained" href="/lixeira">
                                <DeleteSweepIcon/>
                            </Button>
                        </NavLink>
                    </div>
                    <Typography variant="h6" className='logo-seven'>
                        <img src={Logo} alt="Logo" className="ico-small"/>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
  