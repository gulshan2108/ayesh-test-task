import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser, getUser, updateUser} from '../../Action/userAction'

import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Grid 
} from '@material-ui/core';


const UserForm = (props) => {
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    const [state, setState] = useState({
        name: '',
        email: '',
        address: '',
        id: false,
        userList: [],
        friendList: []
    })

    const [id, setID] = useState(false)

    useEffect(()=>{
        var params = props.match.params;
        if(params.id){
            setID(params.id)
            props.getUser(params.id)
        }
    },[])
    
    useEffect(()=>{
        if(props.userAddedSuccess){
            var msg = 'User updated successfully';
            if(!id){
                msg = 'User added successfully'
                props.history.push('/')
            }
            alert(msg);
        }
        if(props.userDetails){
            var user = props.userDetails;
            setState({
                ...state,
                name: user.name,
                email: user.email,
                address: user.address,
                friendList: user.friendList
            })
        }
    },[props.userAddedSuccess, props.userDetails])

    useEffect(()=>{
        if(props.userList){
            setState({
                ...state,
                userList: props.userList
            })
        }
    },[props.userList])

    const handleValidation = () => {
        var validationError, nameError, emailError, addressError;
        if(!state.name || !state.email || !state.address){
            validationError = true;
            if(!state.name){
                nameError = true;
            }
            if(!state.email){
                emailError = true;
            }
            if(!state.address){
                addressError = true;
            }
        }
        setState({
            ...state,
            nameError,
            emailError,
            addressError
        })
        return validationError
    }

    const handleSave = async() => {
        if(await handleValidation()){return null}
        var body = {
            name: state.name,
            email: state.email,
            address: state.address,
            friendList: state.friendList
        }
        
        if(id){
            props.updateUser(id, body)
        }else{
            props.addUser(body)
        }
    }

    const handleChangeMultiple = (event) => {
        setState({
            ...state,
            friendList: event.target.value
        })
      };

    return(
        <form>
            <Grid container spacing={3} style={{marginTop: 20}}>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Name"
                        placeholder='Name'
                        variant="outlined" 
                        value={state.name}
                        helperText="Name field is requried"
                        error={state.nameError}
                        onChange={(e)=>setState({
                            ...state,
                            name: e.target.value,
                            nameError: false
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Email"
                        placeholder='Name'
                        variant="outlined" 
                        value={state.email}
                        helperText="Email field is requried"
                        error={state.emailError}
                        onChange={(e)=>setState({
                            ...state,
                            email: e.target.value,
                            emailError: false
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label='Address'
                        placeholder='Type in'
                        variant="outlined" 
                        value={state.address}
                        InputLabelProps={{ shrink: true }} 
                        helperText="Address field is requried"
                        error={state.addressError}
                        onChange={(e)=>setState({
                            ...state,
                            address: e.target.value,
                            addressError: false
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel fullWidth id="demo-mutiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple={true}
                            value={state.friendList}
                            onChange={handleChangeMultiple}
                            input={<Input />}
                        >
                            {names.map((name) => (
                                <MenuItem 
                                    key={name} 
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button 
                        variant="contained" 
                        onClick={()=>handleSave()}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
            
        </form>
    )
}

function mapStateToProps(state){
    return{
        userList: state.user.userList,
        userAddedSuccess: state.user.userAddedSuccess,
        userDetails: state.user.userDetails
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        addUser,
        updateUser,
        getUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserForm);