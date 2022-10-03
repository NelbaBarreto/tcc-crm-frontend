export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { name, value } = action.payload;
      return { ...state, login: { ...state.login, [name]: value }};
    default:
      return state;
  }
}