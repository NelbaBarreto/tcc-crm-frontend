export const reducer = (state, action) => {
  const { name, value, object } = action.payload;

  switch (action.type) {
    case "LOGIN":
      return { ...state, login: { ...state.login, [name]: value } };
    case "FORM_UPDATED":
      return { ...state, [object]: { ...state[`${object}`], [name]: value } };
    default:
      return state;
  }
}