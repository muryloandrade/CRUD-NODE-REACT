import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Modal,
    TextField,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
})

const initialUsers = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
]

const UserTable = () => {
    const classes = useStyles()
    const [users, setUsers] = useState(initialUsers)
    const [selectedUser, setSelectedUser] = useState(null)

    const handleEditClick = (user) => {
        setSelectedUser(user)
    }

    const handleCloseModal = () => {
        setSelectedUser(null)
    }

    const handleSaveUser = (values) => {
        const updatedUsers = users.map((user) =>
            user.id === values.id ? { ...user, ...values } : user
        )
        setUsers(updatedUsers)
        setSelectedUser(null)
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Users table">
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
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditClick(user)}
                                    >
                    Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                className={classes.modal}
                open={Boolean(selectedUser)}
                onClose={handleCloseModal}
            >
                <div className={classes.paper}>
                    <Formik
                        initialValues={selectedUser}
                        onSubmit={handleSaveUser}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button type="submit" variant="contained" color="primary">
                  Save
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

export default UserTable
