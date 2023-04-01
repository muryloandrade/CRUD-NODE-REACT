import React, { useEffect, useState } from 'react'
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
import axios from 'axios'



const UserTable = () => {
    const [editUser, setEditUser] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:5173/employee')
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        formik.setValues({
            name: editUser ? editUser.name : '',
            email: editUser ? editUser.email : '',
            phone: editUser ? editUser.phone : '',
            document: editUser ? editUser.document : '',
            birth_date: editUser ? editUser.birth_date : '',
            salary: editUser ? editUser.salary : '',
        })
    }, [editUser])

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
            name: '',
            email: '',
        },
        onSubmit: handleSaveEditModal,
    })

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Documento</TableCell>
                            <TableCell>Aniversário</TableCell>
                            <TableCell>Salario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.document}</TableCell>
                                <TableCell>{user.birth_date}</TableCell>
                                <TableCell>{user.salary}</TableCell>
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
                        <TextField
                            label="Phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Document"
                            name="document"
                            value={formik.values.document}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Birth Date"
                            name="birth_date"
                            value={formik.values.birth_date}
                            onChange={formik.handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Salary"
                            name="salary"
                            value={formik.values.salary}
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

