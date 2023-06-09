import axios from "axios";

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: "http://localhost:5000",
      url: "auth/login",
      data: data,
    });
    if (res.status == 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("roles", res.data.roles);
      dispatch({
        type: "LOGIN",
        data: res.data,
      }); 
    // } else if (res.status == 404) {
    //   dispatch({
    //     type: "NOT_FOUND",
    //     data: null,
    //   });
    // } else if (res.status == 401) {
    //   dispatch({
    //     type: "Unauthorized",
    //     data: null,
    //   });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
        data: null,
      });
    }
  } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type:"Unauthorized",
                data:null
            })
        }
        if(error.response.status === 404 ){
            dispatch({
                type:"NOT_FOUND",
                data:null
            })
        }
    // dispatch({
    //   type: "LOGIN_ERROR",
    //   data: null,
    // });
  }
  return null;
};

export const signup = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_URL_LOGIN,
      url: "register",
      data: data,
    });

    if (res.status === 200) {
      dispatch({
        type: "SIGNUP",
        data: res.data,
      });
    } else {
      dispatch({
        type: "LOGIN_ERROR",
        data: null,
      });
    }
  } catch (error) {
    if(error.response.status === 422 ){
        dispatch({
            type:"Unprocessable_Entity",
            data:null
        })
    }
    // dispatch({
    //   type: "LOGIN_ERROR",
    //   data: null,
    // });
  }
  return null;
};
