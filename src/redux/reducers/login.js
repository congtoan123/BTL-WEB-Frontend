const initState = {
  data: {},
  error: false,
  success: false,
  message: "",
};
const loginReducers = (state = initState, payload) => {
  switch (payload.type) {
    case "LOGIN":
      return {
        ...state,
        data: payload.data,
        success: true,
        error: false,
      };
    case "NOT_FOUND":
      return {
        ...state,
        success: false,
        error: true,
        message: "Tài khoản không tồn tại",
      };
    case "Unauthorized":
      return {
        ...state,
        success: false,
        error: true,
        message: "sai mật khẩu",
      };
      case "Unprocessable_Entity":
        return {
          ...state,
          success: false,
          error: true,
          message: "Tài khoản đã tồn tại",
        };
    case "SIGNUP":
      return {
        ...state,
        data: payload.data,
        success: true,
        error: false,
        message:"đăng ký thành công"
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        data: {},
        success: false,
        error: true,
      };
    default:
      return state;
  }
};

export default loginReducers;
