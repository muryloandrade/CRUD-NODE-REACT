import React, { useState, useEffect } from 'react'
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
    IconButton,
    Modal,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
})

const UserTable = () => {
    const classes = useStyles()
    const [users, setUsers] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5173/employee')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error))
    }, [])

    const handleEditClick = (user) => {
        setCurrentUser(user)
        setEditModalOpen(true)
    }

    const handleEditClose = () => {
        setCurrentUser(null)
        setEditModalOpen(false)
    }

    const handleDeleteClick = (user) => {
        setCurrentUser(user)
        setDeleteModalOpen(true)
    }

    const handleDeleteClose = () => {
        setCurrentUser(null)
        setDeleteModalOpen(false)
    }

    const handleCreate = (values, { resetForm }) => {
        axios.post('http://localhost:5173/employee', values)
            .then(response => {
                setUsers([...users, response.data])
                resetForm()
            })
            .catch(error => console.error(error))
    }

    const handleUpdate = (values) => {
        axios.put(`http://localhost:5173/employee/${currentUser.id}`, values)
            .then(response => {
                setUsers(users.map(user => user.id === response.data.id ? response.data : user))
                setCurrentUser(null)
                setEditModalOpen(false)
            })
            .catch(error => console.error(error))
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:5173/employee/${currentUser.id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== currentUser.id))
                setCurrentUser(null)
                setDeleteModalOpen(false)
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Documento</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Salario</TableCell>
                            <TableCell>Aniversario</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.document}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.salary}</TableCell>
                                <TableCell>{user.birth_date}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleEditClick(user)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(user)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={editModalOpen}
                onClose={handleEditClose}
                aria-labelledby="edit-modal-title"
                aria-describedby="edit-modal-description"
            >
                <div className={classes.paper}>
                    <h2 id="edit-modal-title">Edit User</h2>
                    <Formik
                        initialValues={{
                            name: currentUser?.name,
                            email: currentUser?.email,
                            document: currentUser?.document,
                            phone: currentUser?.phone,
                            role: currentUser?.role,
                            salary: currentUser?.salary,
                            birth_date: currentUser?.birth_date,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdate}
                    >
                        {({ values, handleChange, handleBlur }) => (
                            <Form>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Name"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="document"
                                        label="Document"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Phone"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="salary"
                                        label="Salary"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="birth_date"
                                        label="Birth Date"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <FormControl variant="outlined" margin="normal" fullWidth>
                                        <InputLabel id="role-label">Role</InputLabel>
                                        <Field
                                            as={Select}
                                            name="role"
                                            labelId="role-label"
                                            label="Role"
                                            value={values.role}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="user">User</MenuItem>
                                        </Field>
                                    </FormControl>
                                    <ErrorMessage name="role" />
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary">
                                    Update
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteClose}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <div className={classes.paper}>
                    <h2 id="delete-modal-title">Delete User</h2>
                    <p id="delete-modal-description">Are you sure you want to delete this user?</p>
                    <Button onClick={handleDelete} variant="contained" color="primary">
                    Delete
                    </Button>
                </div>
            </Modal>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    role: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleCreate}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            <Field
                                as={TextField}
                                name="name"
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <ErrorMessage name="name" />
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <ErrorMessage name="email" />
                        </div>
                        <div>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Field
                                    as={Select}
                                    name="role"
                                    labelId="role-label"
                                    label="Role"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Field>
                            </FormControl>
                            <ErrorMessage name="role" />
                        </div>
                        <div>
                            <Button type="submit" variant="contained" color="primary">
                            Create
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default UserTable