export function addUser(data){
    return(dispatch)=>{
        return dispatch (addUserSuccess(data))
    }
}

export function getUserList(){
    return(dispatch)=>{
        return dispatch (getUserListSuccess())
    }
}

export function getUser(id){
    return(dispatch)=>{
        return dispatch (getUserSuccess(id))
    }
}

export function deleteUser(id){
    return(dispatch)=>{
        return dispatch (deleteUserSuccess(id))
    }
}

export function updateUser(id, data){
    return(dispatch)=>{
        return dispatch (updateUserSuccess(id, data))
    }
}

const getUserListSuccess = () => {
    return{
        type: 'GET_USER_LIST_SUCCESS'
    }
}

const addUserSuccess = (res) => {
    return{
        type: 'ADD_USER_SUCCESS',
        payload: res
    }
}

const getUserSuccess = (res) => {
    return{
        type: 'GET_USER_SUCCESS',
        payload: res
    }
}

const deleteUserSuccess = (res) => {
    return{
        type: 'DELETE_USER_SUCCESS',
        payload: res
    }
}

const updateUserSuccess = (id, data) => {
    return{
        type: 'UPDATE_USER_SUCCESS',
        payload: {id, data}
    }
}

export const resertProps = ()=>{
    return{
        type: 'RESET_USER_PROPS',
    }
}