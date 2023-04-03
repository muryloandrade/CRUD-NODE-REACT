import React from 'react'
import Navbar from '../../components/NavBar/navbar'
import UserTable from '../../components/UserManagement/managentUser'
function User () {
    return(
        <div style={{width:'100%'}}>
            <Navbar />                
            <UserTable />
        </div>

    )
}

export default User