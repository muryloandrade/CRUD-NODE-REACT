import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import Logo from '../../../public/logo-seven-white.png'
import './navbar.scss'
// import { Formik, Form } from 'formik'

export default function Navbar() {
  
    return (
        <div>
            <AppBar >
                <Toolbar className='toolBar'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className='logo-seven'>
                        <img src={Logo} alt="Logo" className="ico-small"/>
                    </Typography>
                    {/* <Formik
                        initialValues={{ search: '' }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Pesquisar"
                                    value={values.search}
                                    onChange={handleChange}
                                />
                                <button type="submit">Pesquisar</button>
                            </Form>
                        )}
                    </Formik> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}
  