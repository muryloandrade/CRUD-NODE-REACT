import React from 'react'
import Navbar from '../NavBar/navbar'
import UserTable from '../managentUser'
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