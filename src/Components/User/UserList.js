import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserList, deleteUser, resertProps} from '../../Action/userAction'

import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Button,
} from '@material-ui/core';

const UserList = (props) => {

    const [state, setState] = useState({
        userList: []
    })

    useEffect(()=>{
        props.getUserList()
    },[])

    useEffect(()=>{
        setState({
            ...state,
            userList: props.userList
        })
    },[props.userList])

    useEffect(()=>{
        if(props.userDeletedSuccess){
            var userList = state.userList;
            userList.splice(props.userDeletedSuccess, 1)
            setState({
                ...state,
                userList
            })
            localStorage.setItem('userList', JSON.stringify(state.userList))
            props.resertProps()
        }
    },[props.userDeletedSuccess])

    return(
        <>
            <Button 
                variant="contained" 
                onClick={()=>props.history.push(`/user/form`)}
            >
                Add User
            </Button>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Friends</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {state.userList && state.userList.length>0 ? state.userList.map((user, index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>
                                    {user.friendList && user.friendList.map((friend)=>{
                                        return(
                                            friend+', '
                                        )
                                    })}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" onClick={()=>props.history.push(`/user/form/${index}`)}>Edit</Button>
                                    <Button variant="contained" color="primary" onClick={()=>props.deleteUser(index)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}) :
                        <TableRow>
                            <TableCell colSpan={6} component="th" scope="row" align='center'>
                                No record found
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

function mapStateToProps(state){
    console.log(999, state.user)
    return{
        userList: state.user.userList,
        userDeletedSuccess: state.user.userDeletedSuccess
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getUserList,
        deleteUser,
        resertProps
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);