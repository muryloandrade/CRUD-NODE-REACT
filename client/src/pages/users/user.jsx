import React from 'react'
import Navbar from '../../components/NavBar/navbar'
import UserTable from '../../components/UserManagement/managentUser'
// import Config from '../UserManagement/user'
function User () {
    return(
        <>
            <nav>
                <Navbar />                
            </nav>
            <h1>
                User Management
            </h1>
            <div>
                <UserTable />
            </div>

            
        </>

    )
}

export default User