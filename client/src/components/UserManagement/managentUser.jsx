import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Modal,TableContainer,Table,TableCell,TableHead,TableRow,TableBody } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    document: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    salary: Yup.number().required('Required'),
    birth_date: Yup.date().required('Required'),
})

const UserTable = () => {
    const [users, setUsers] = useState([])
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5173/employee')
            setUsers(response.data)
        }
        fetchUsers()
    }, [])

    const handleCreateClick = () => {
        setCreateModalOpen(true)
    }

    const handleCreateClose = () => {
        setCreateModalOpen(false)
    }

    const handleEditClick = (user) => {
        setCurrentUser(user)
        setEditModalOpen(true)
    }

    const handleEditClose = () => {
        setEditModalOpen(false)
    }

    const handleCreate = async (values, actions) => {
        try {
            const response = await axios.post('http://localhost:5173/employee', values)
            setUsers([...users, response.data])
            handleCreateClose()
        } catch (error) {
            console.error(error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    const handleUpdate = async (values, actions) => {
        try {
            axios.put(`http://localhost:5173/employee/${currentUser.id}`, values)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.error(error))            
            handleEditClose()
            setUsers(users.map((u) => (u.id === currentUser.id ? { ...u, ...values } : u)))
        
        } catch (error) {
            console.error(error)
        } finally {
            actions.setSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5173/employee/${id}`)
            setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>

            <Modal open={createModalOpen} onClose={handleCreateClose}>
                <div>
                    <h2>Create User</h2>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            document: '',
                            phone: '',
                            salary: '',
                            birth_date: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleCreate}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <Field as={TextField} name="name" label="Name" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="name" />
                                </div>
                                <div>
                                    <Field as={TextField} name="email" label="Email" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field as={TextField} name="document" label="Document" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="document" />
                                </div>
                                <div>
                                    <Field as={TextField} name="phone" label="Phone" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="phone" />
                                </div>
                                <div>
                                    <Field as={TextField} name="salary" label="Salary" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="salary" />
                                </div>
                                <div>
                                    <Field as={TextField} name="birth_date" label="Birth Date" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="birth_date" />
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Create
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <Modal open={editModalOpen} onClose={handleEditClose}>
                <div>
                    <h2>Edit User</h2>
                    <Formik
                        initialValues={{
                            name: currentUser?.name,
                            email: currentUser?.email,
                            document: currentUser?.document,
                            phone: currentUser?.phone,
                            salary: currentUser?.salary,
                            birth_date: currentUser?.birth_date,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleUpdate}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <Field as={TextField} name="name" label="Name" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="name" />
                                </div>
                                <div>
                                    <Field as={TextField} name="email" label="Email" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field as={TextField} name="document" label="Document" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="document" />
                                </div>
                                <div>
                                    <Field as={TextField} name="phone" label="Phone" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="phone" />
                                </div>
                                <div>
                                    <Field as={TextField} name="salary" label="Salary" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="salary" />
                                </div>
                                <div>
                                    <Field as={TextField} name="birth_date" label="Birth Date" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="birth_date" />
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    Update
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Document</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.document}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.salary}</TableCell>
                                <TableCell>{user.birth_date}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEditClick(user)}>
                                    Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>
                                    Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create User
            </Button>
        </div>
    )
}

export default UserTable