import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Modal,TableContainer,Table,TableCell,TableHead,TableRow,TableBody } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './userActive.scss'
import InfoIcon from '@material-ui/icons/Info'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import PhoneIcon from '@material-ui/icons/Phone'
import DescriptionIcon from '@material-ui/icons/Description'
import EmailIcon from '@material-ui/icons/Email'
import DateRangeIcon from '@material-ui/icons/DateRange'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
    formatDate,
    formatPhoneNumber,
    formatDocumentNumber,
    formatDateTable,
} from '../../utils/function-standards'




const validationSchema = Yup.object().shape({
    name: Yup.string().required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
    email: Yup.string().email('Invalid email').required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
    document: Yup.string().required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
    phone: Yup.string().required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
    salary: Yup.number().required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
    birth_date: Yup.date().required(<span style={{ color: 'red',alignItems:'center',display:'flex' }}><InfoIcon style={{marginBottom:'0.4%'}}/> Esse Campo é obrigatório!</span>),
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
        <div style={{width:'100%'}}>
            <Modal open={createModalOpen} onClose={handleCreateClose} aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description" className='modal'>
                <div className='modal-child'>
                    <h2 style={{alignItems:'center',justifyContent:'center',display:'flex'}}>Crie um Usuário</h2>
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
                        {({ isSubmitting,values,setFieldValue }) => (
                            <Form>
                                <div>
                                    <Field as={TextField} name="name" label="Nome" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="name" />
                                </div>
                                <div>
                                    <Field as={TextField} name="email" label="Email" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="document"
                                        label="CPF"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        onChange={(event) => {
                                            const formattedDocumentNumber = formatDocumentNumber(event.target.value)
                                            if (formattedDocumentNumber !== event.target.value) {
                                                event.target.value = formattedDocumentNumber
                                            }
                                            setFieldValue('document', formattedDocumentNumber)
                                        }}
                                    />
                                    <ErrorMessage name="document" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Telefone"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        onChange={(event) => {
                                            const formattedPhoneNumber = formatPhoneNumber(event.target.value)
                                            if (formattedPhoneNumber !== event.target.value) {
                                                event.target.value = formattedPhoneNumber
                                            }
                                            setFieldValue('phone', formattedPhoneNumber)
                                        }}
                                    />
                                    <ErrorMessage name="phone" />
                                </div>
                                <div>
                                    <Field as={TextField} name="salary" label="Salário" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="salary" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="birth_date"
                                        label="Data de Nascimento"
                                        format="dd/MM/yyyy"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: new Date().toISOString().slice(0, 10),
                                            },
                                            value: formatDate(values.birth_date),
                                            onChange: (event) => {
                                                const newValue = event.target.value
                                                    .replace(/[^0-9]/g, '')
                                                    .slice(0, 8)
                                                setFieldValue('birth_date', newValue)
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="birth_date" />
                                </div>
                                <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
                                    <Button type="submit" variant="contained" color="primary" size='large' disabled={isSubmitting}>
                                        Create
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <Modal open={editModalOpen} onClose={handleEditClose}>
                <div className='modal-child'>
                    <h2 style={{alignItems:'center',justifyContent:'center',display:'flex'}}>Edite o Usuário</h2>
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
                        {({ isSubmitting,setFieldValue,values }) => (
                            <Form>
                                <div>
                                    <Field as={TextField} name="name" label="Nome" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="name" />
                                </div>
                                <div>
                                    <Field as={TextField} name="email" label="Email" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="document"
                                        label="CPF"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        onChange={(event) => {
                                            const formattedDocumentNumber = formatDocumentNumber(event.target.value)
                                            if (formattedDocumentNumber !== event.target.value) {
                                                event.target.value = formattedDocumentNumber
                                            }
                                            setFieldValue('document', formattedDocumentNumber)
                                        }}
                                    />
                                    <ErrorMessage name="document" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="phone"
                                        label="Telefone"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        onChange={(event) => {
                                            const formattedPhoneNumber = formatPhoneNumber(event.target.value)
                                            if (formattedPhoneNumber !== event.target.value) {
                                                event.target.value = formattedPhoneNumber
                                            }
                                            setFieldValue('phone', formattedPhoneNumber)
                                        }}
                                    />
                                    <ErrorMessage name="phone" />
                                </div>
                                <div>
                                    <Field as={TextField} name="salary" label="Salário" variant="outlined" margin="normal" fullWidth />
                                    <ErrorMessage name="salary" />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="birth_date"
                                        label="Data de Nascimento"
                                        format="dd/MM/yyyy"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: new Date().toISOString().slice(0, 10),
                                            },
                                            value: formatDate(values.birth_date),
                                            onChange: (event) => {
                                                const newValue = event.target.value
                                                    .replace(/[^0-9]/g, '')
                                                    .slice(0, 8)
                                                setFieldValue('birth_date', newValue)
                                            },
                                        }}
                                    />
                                    <ErrorMessage name="birth_date" />
                                </div>
                                <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
                                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    Atualize
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            {users.length > 0 ? (
                <div>
                    <TableContainer style={{width:'100%', backgroundColor:'white'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' style={{color:'#f4b704', fontWeight:'700'}}>Nome</TableCell>
                                    <TableCell align='center'><EmailIcon style={{color:'#f4b704'}}/></TableCell>
                                    <TableCell align='center'><DescriptionIcon style={{color:'#f4b704'}}/></TableCell>
                                    <TableCell align='center'><PhoneIcon style={{color:'#f4b704'}}/></TableCell>
                                    <TableCell align='center'> <AttachMoneyIcon style={{ color: '#f4b704' }} /></TableCell>
                                    <TableCell align='center'><DateRangeIcon style={{color:'#f4b704'}}/></TableCell>
                                    <TableCell align='center' style={{color:'#f4b704',fontWeight:'700'}}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align='center'>{user.name}</TableCell>
                                        <TableCell align='center'>{user.email}</TableCell>
                                        <TableCell align='center'>{formatDocumentNumber(user.document)}</TableCell>
                                        <TableCell align='center'>{formatPhoneNumber(user.phone)}</TableCell>
                                        <TableCell align='center'>R${user.salary}</TableCell>
                                        <TableCell align='center'>{formatDateTable(user.birth_date)}</TableCell>
                                        <TableCell align='center'>                                                
                                            <Button variant="contained" style={{backgroundColor:'#22305a',color:'white'}} onClick={() => handleEditClick(user)}>
                                                <EditIcon />
                                            </Button>
                                            <Button variant="contained" style={{backgroundColor:'#f4b704',color:'white'}} onClick={() => handleDelete(user.id)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained" className='new-user-table' style={{backgroundColor:'#22305a',color:'white',fontWeight:'700'}} onClick={handleCreateClick}>
                        Crie um usuário
                    </Button>
                </div>

            ) : (
                <div className='no-user'>
                    <h2>Você não tem usuários</h2>
                    <Button variant="contained" color="primary" onClick={handleCreateClick}>
                        Crie um usuário
                    </Button>
                </div>
            )}

        </div>
    )
}

export default UserTable