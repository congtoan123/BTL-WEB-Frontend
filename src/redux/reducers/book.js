const initState = {
  data: [],
  book: {},
  error: false,
  success: true,
};
const BookReducers = (state = initState, payload) => {
  switch (payload.type) {
    case "GET_ALL":
      return {
        ...state,
        data: payload.data,
        success: true,
        error: false,
      };
    case "GETONE":
      return {
        ...state,
        data: payload.data,
        success: true,
        error: false,
      };
    case "DELETE":
      return {
        ...state,
        success: true,
        error: false,
      };
    case "POST":
      return {
        ...state,
        success: true,
        error: false,
      };
    case "UPDATE":
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
export default BookReducers;
