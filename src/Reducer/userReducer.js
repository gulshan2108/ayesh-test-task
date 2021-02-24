
var users = [];
if(localStorage.getItem('userList')){
    users = JSON.parse(localStorage.getItem('userList'))
}

export default function user(state={
    userList: users,
    userAddedSuccess: false,
    userDeletedSuccess: false,
    userDetails: false
}, action){
    switch(action.type){
        case 'RESET_USER_PROPS' :
            return Object.assign({}, state,{
                userDeletedSuccess: false
            })
        case 'GET_USER_SUCCESS' :
            return Object.assign({}, state,{
                userDetails: state.userList[action.payload],
            })
        case 'GET_USER_LIST_SUCCESS' :
            return Object.assign({}, state,{
                userList: state.userList,
                userAddedSuccess: false,
                userDeletedSuccess: false
            })
        case 'ADD_USER_SUCCESS' :
            state.userList.unshift(action.payload)
            localStorage.setItem('userList', JSON.stringify(state.userList))
            return Object.assign({}, state,{
                userList: state.userList,
                userAddedSuccess: true,
            })
        case 'UPDATE_USER_SUCCESS' :
            state.userList[action.payload.id] = action.payload.data
            localStorage.setItem('userList', JSON.stringify(state.userList))
            return Object.assign({}, state,{
                userList: state.userList,
                userAddedSuccess: true,
            })
        case 'DELETE_USER_SUCCESS' :
            return Object.assign({}, state, {
                userDeletedSuccess: action.payload.toString()
            })
    }
    return state;
}