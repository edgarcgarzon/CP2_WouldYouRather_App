export const AUTHED_USER = 'SET_AUTHER_USER'

export function setAuthedUser(id){
    return {
        type: AUTHED_USER,
        id,
    }
}