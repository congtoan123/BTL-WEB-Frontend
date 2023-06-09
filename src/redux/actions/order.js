import axios from "axios";

export const createOrder = (data, username, BookId) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: "http://localhost:5000/order/",
      url: `/newOrder?username=${username}&BookId=${BookId}`,
      data: data,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      dispatch({
        type: "CREATE_ORDER",
        data: res.data,
      });
    } else {
      dispatch({
        type: "ERROR",
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      data: null,
    });
  }
};

export const getOrder = (username) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: "http://localhost:5000/order/",
      url: `${username}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      dispatch({
        type: "GET_ORDER",
        data: res.data,
      });
    } else {
      dispatch({
        type: "ERROR",
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      data: null,
    });
  }
};

export const DeleteOrder = (id) => async (dispatch) => {
  try {
    const res = await axios({
      method: "DELETE",
      baseURL: "http://localhost:5000/order/",
      url: `${id}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      dispatch({
        type: "DELETE_ORDER",
        data: res.data,
      });
    } else {
      dispatch({
        type: "ERROR",
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      data: null,
    });
  }
};
