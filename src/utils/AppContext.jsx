import { createContext } from "react";

const AppContext = createContext({
  state: {},
  dispatch: null,
})

export default AppContext;