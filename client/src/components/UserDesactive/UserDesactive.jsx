import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import './UserDesactive.scss'
const UserDesactive = () => {
    const [users, setUsers] = useState([])
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:2899/usersDesactive')
            .then((response) => {
                setUsers(response.data)
            })
    }, [])
    
    
    const handleUndo = (values) => {
        console.log(values)
        axios.post('http://localhost:5173/employee', values)
            .then(response => {
                setUsers(users.filter((u) => u.id !== response.id))
                handleDeleteClick(values.id)
            })
            .catch(error => console.error(error))
    } 

    
    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:2899/usersDesactive?id=${id}`)
            .then(() => {
                setUsers(users.filter((u) => u.id !== id))
            }
            )
            .catch(error => console.error(error))       
    }
    

    return (
        <>
            {users.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    {editingId === user.id ? (
                                        <TableCell>
                                            <Formik
                                                initialValues={{ name: user.name, email: user.email }}
                                                onSubmit={(values) => {
                                                    setUsers(
                                                        users.map((u) =>
                                                            u.id === user.id ? { ...u, name: values.name, email: values.email } : u
                                                        )
                                                    )
                                                    setEditingId(null)
                                                }}
                                            >
                                                <Form>
                                                    <Field as={TextField} name="name" />
                                                    <Field as={TextField} name="email" />
                                                    <Button type="submit">Save</Button>
                                                </Form>
                                            </Formik>
                                        </TableCell>
                                    ) : (
                                        <>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleUndo(user)}>Desfazer</Button>
                                                <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                
                <div className='no-users'>
                    <h1 style={{color:'white', display:'flex',font:'caption',fontSize:'1.5em'}}>Nenhum usuário excluído</h1>
                </div>
            )}

        </>

    )
}

export default UserDesactive