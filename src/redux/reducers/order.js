const initState = {
  data: [],
  error: false,
  success: true,
};
const OrderReducers = (state = initState, payload) => {
  switch (payload.type) {
    case "CREATE_ORDER":
      return {
        ...state,
        success: true,
        error: false,
      };
    case "GET_ORDER":
      return {
        ...state,
        data: payload.data,
        success: true,
        error: false,
      };
    case "DELETE_ORDER":
      return {
        ...state,
        success: true,
        error: false,
      };
    case "ERROR":
      return {
        ...state,
        data: payload.data,
        success: false,
        error: true,
      };
    default:
      return state;
  }
};
export default OrderReducers;
