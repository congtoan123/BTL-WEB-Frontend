import axios from "axios";

export const uploadComment = (data,id) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: "http://localhost:5000/comment/",
            url: `/upload/${id}`,
            data: data,
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "POST_COMMENT",
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

export const getComment = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: "http://localhost:5000/comment/",
            url: `${id}`,
            headers: {
                "x-access-token": localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: "GET_COMMENT",
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
