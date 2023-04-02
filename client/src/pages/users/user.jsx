import React from 'react'
import Navbar from '../../components/NavBar/navbar'
import UserTable from '../../components/UserManagement/managentUser'
// import Config from '../UserManagement/user'
function User () {
    return(
        <>
            <Navbar />                
            <UserTable />
        </>

    )
}

export default User