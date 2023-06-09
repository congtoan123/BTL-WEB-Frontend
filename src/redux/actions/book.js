import axios from "axios";

export const GetAllBook = () => async dispatch => {
    try{
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: '/',
            // headers: {
            //     "x-access-token":  localStorage.getItem("token"),
            //     "Content-Type": "application/json" 
            // }
        })
        if(res.status == 200){
            dispatch({
                type: "GET_ALL",
                data: res.data
            })
        }
        else {
            dispatch({
                type: "ERROR",
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: "ERROR",
            data: null,
        })
    }
}

export const createBook = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: 'create',
            data: data,
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "POST",
                data: res.data
            })
        }
        else {
            dispatch({
                type: "ERROR",
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: "ERROR",
            data: null,
        })
    }
}

export const updateBook = (id, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `update/${id}`,
            data: data,
            headers: {
                "x-access-token":localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "UPDATE",
                data: res.data
            })
        }
        else {
            dispatch({
                type: "ERROR",
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: "ERROR",
            data: null,
        })
    }
}

export const deleteBook = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `delete/${id}`,
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "DELETE",
                data: res.data
            })
        }
        else {
            dispatch({
                type: "ERROR",
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: "ERROR",
            data: null,
        })
    }
}
export const getbook= (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `${id}`,
            headers: {
                "x-access-token":localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "GETONE",
                data: res.data
            })
        }
        else {
            dispatch({
                type: "ERROR",
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: "ERROR",
            data: null,
        })
    }
}