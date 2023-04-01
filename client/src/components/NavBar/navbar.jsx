import React from 'react'
import { AppBar, Toolbar,Typography } from '@material-ui/core'
import Logo from '../../assets/logo-seven-white.png'
import Button from '@material-ui/core/Button'
import './navbar.scss'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'

export default function Navbar() {
  
    return (
        <div>
            <AppBar >
                <Toolbar className='toolBar'>
                    <div className='buttons'>
                        <Button variant="contained" href="#contained-buttons">
                            <SupervisorAccountIcon/>
                        </Button>
                        <Button variant="contained" href="#contained-buttons">
                            <DeleteSweepIcon/>
                        </Button>

                    </div>
                    <Typography variant="h6" className='logo-seven'>
                        <img src={Logo} alt="Logo" className="ico-small"/>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
  