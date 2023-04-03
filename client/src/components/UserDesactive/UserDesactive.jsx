import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import DeleteIcon from '@material-ui/icons/Delete'
import {UndoOutlined} from '@material-ui/icons'
import DescriptionIcon from '@material-ui/icons/Description'
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
                                <TableCell align='center' style={{color:'#f4b704', fontWeight:'700'}}>Nome</TableCell>
                                <TableCell align='center'><EmailIcon style={{color:'#f4b704'}}/></TableCell>
                                <TableCell align='center'><DescriptionIcon style={{color:'#f4b704'}}/></TableCell>
                                <TableCell align='center' style={{color:'#f4b704',fontWeight:'700'}}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
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
                                            <TableCell align='center'>{user.name}</TableCell>
                                            <TableCell align='center'>{user.email}</TableCell>
                                            <TableCell align='center'>{user.document}</TableCell>
                                            <TableCell align='center'>
                                                <Button onClick={() => handleUndo(user)} style={{backgroundColor:'#22305a',color:'white'}} variant="contained"><UndoOutlined/></Button>
                                                <Button onClick={() => handleDeleteClick(user.id)} style={{backgroundColor:'#f4b704',color:'white'}} variant="contained"><DeleteIcon /></Button>
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