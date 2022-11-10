export const reducer = (state, action) => {
  const { name = "", value = "", object = "" } = action?.payload;

  switch (action.type) {
    case "LOGIN":
      return { ...state, login: { ...state.login, [name]: value } };
    case "FORM_UPDATED":
      return { ...state, [object]: { ...state[`${object}`], [name]: value } };
    case "DIRECCION_ADDED":
      return { ...state, direcciones: [...state.direcciones, state.direccion], direccion: {} };
    case "STATE_CLEARED":
      return {};
    case "DIRECCION_DELETED":
      const direccionesCopy = state.direcciones || [];
      direccionesCopy.splice(action.payload.index, 1);
      return { ...state, direcciones: direccionesCopy };
    default:
      return state;
  }
}

export const handleDispatch = (dispatch, name, value, object) => {
  dispatch({
    type: "FORM_UPDATED",
    payload: { name, value, object }
  })
}

export const handleDireccionAdded = dispatch => {
  dispatch({
    type: "DIRECCION_ADDED",
    payload: {}
  })
}

export const handleDireccionDeleted = (dispatch, index) => {
  dispatch({
    type: "DIRECCION_DELETED",
    payload: { index }
  })
}

export const handleStateCleared = dispatch => {
  dispatch({
    type: "STATE_CLEARED",
    payload: {}
  })
}