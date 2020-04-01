import { GET_USERS, USERS_ERROR, GET_USER, USER_ERROR, DELETE_USER, UPDATE_USER } from './types'
import axios from 'axios'
import M from 'materialize-css/dist/js/materialize.min.js';

export const getAllUsers = () => async dispatch => {

    try {
        const res = await axios('/api/v1/users')

        dispatch({
            type: GET_USERS,
            payload: res.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USERS_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const getSingleUser = (id) => async dispatch => {

    try {
        const res = await axios(`/api/v1/users/${id}`)

        dispatch({
            type: GET_USER,
            payload: res.data.data
        })

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}

export const updateUser = (formData, id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/users/user/${id}`, formData, config)
        console.log(res.data);

        dispatch({
            type: UPDATE_USER,
            payload: res.data.data
        })


        if(res.data.success){
            M.toast({ html: res.data.msg })
        }

        dispatch(getSingleUser(id))

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }

}

export const deleteUser = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/v1/users/${id}`)

        dispatch({
            type: DELETE_USER
        })

        if(res.data.success){
            M.toast({ html: res.data.msg })
        }

        dispatch(getAllUsers())

    } catch (err) {
        console.error(err)
        if(err.response !== undefined){
            dispatch({
                type: USER_ERROR,
                payload: err.response.data.error
            })
        }
    }
    
}