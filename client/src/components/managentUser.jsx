import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal,
    TextField,
    Button,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { useFormik } from 'formik'

const users = [
    { id: 1, name: 'Murylo', email: 'murylo@example.com' },
    { id: 2, name: 'adriely', email: 'adriely@example.com' },
    { id: 3, name: 'ana', email: 'ana@example.com' },
]

const UserTable = () => {
    const [editUser, setEditUser] = useState(null)

    const handleEditUser = (user) => {
        setEditUser(user)
    }

    const handleCloseEditModal = () => {
        setEditUser(null)
    }

    const handleSaveEditModal = (values) => {
        console.log(values)
        setEditUser(null)
    }

    const formik = useFormik({
        initialValues: {
            name: editUser ? editUser.name : '',
            email: editUser ? editUser.email : '',
        },
        onSubmit: handleSaveEditModal,
    })

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditUser(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={Boolean(editUser)} onClose={handleCloseEditModal}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
                    <h2>Edit User</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Save</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UserTable
