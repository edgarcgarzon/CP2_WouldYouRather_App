import { logIn, logOut } from "../utils/api"
import { showLoading, hideLoading } from 'react-redux-loading'

export const AUTHED_USER = 'SET_AUTHER_USER'
export const LOG_OUT = 'LOG_OUT'

export function setAuthedUser(id){
    return {
        type: AUTHED_USER,
        id,
    }
}

export function handleSetAuthedUser(id){
    return (dispatch) =>{
        dispatch(showLoading())
        logIn(id)
            .then((id)=>{
                dispatch(setAuthedUser(id))
                dispatch(hideLoading())
            })
    }
}

export function handleLogOut(id){
    return (dispatch) =>{
        logOut(id)
            .then((id)=>{
                dispatch(logOut())
            })
    }
}

export function UnsetAuthedUser(){
    return {
        type: LOG_OUT
    }
}