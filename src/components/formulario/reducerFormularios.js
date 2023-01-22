export const reducer = (state, action) => {
  const { name = "", value = "", object = "" } = action?.payload;

  switch (action.type) {
    case "LOGIN":
      return { ...state, login: { ...state.login, [name]: value } };
    case "FORM_UPDATED":
      return { ...state, [object]: { ...state[`${object}`], [name]: value } };
    case "RECORD_LOADED":
      return { ...state,  [object]: value };      
    case "DIRECCION_ADDED":
      return { ...state, direcciones: [...state.direcciones || [], state.direccion], direccion: {} };
    case "TELEFONO_ADDED":
      return { ...state, telefonos: [...state.telefonos || [], state.telefono], telefono: {} };
    case "STATE_CLEARED":
      return { select: {} };
    case "DIRECCION_DELETED":
      const direccionesCopy = state.direcciones || [];
      direccionesCopy.splice(action.payload.index, 1);
      return { ...state, direcciones: direccionesCopy };
    case "TELEFONO_DELETED":
      const telefonosCopy = state.telefonos || [];
      telefonosCopy.splice(action.payload.index, 1);
      return { ...state, telefonos: telefonosCopy };
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

export const handleDispatchEdit = (dispatch, value, object) => {
  dispatch({
    type: "RECORD_LOADED",
    payload: { value, object }
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

export const handleTelefonoAdded = dispatch => {
  dispatch({
    type: "TELEFONO_ADDED",
    payload: {}
  })
}

export const handleTelefonoDeleted = (dispatch, index) => {
  dispatch({
    type: "TELEFONO_DELETED",
    payload: { index }
  })
}

export const handleStateCleared = dispatch => {
  dispatch({
    type: "STATE_CLEARED",
    payload: {},
  })
}