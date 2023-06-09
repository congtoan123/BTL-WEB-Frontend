const initState = {
    data: [],
    error: false,
    success: true,
  };
  const CommentReducers = (state = initState, payload) => {
    switch (payload.type) {
      case "POST_COMMENT":
        return {
          ...state,
          success: true,
          error: false,
        };
        case "GET_COMMENT":
        return {
          ...state,
          data: payload.data,
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
  export default CommentReducers;