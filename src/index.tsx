import * as React from "react"
import * as ReactDOM from "react-dom"

import "store/config"
import AppUI from "ui"
import { Store, StoreContext } from "store"

const renderApp = (
  root: Element,
  _AppUI: typeof AppUI,
  _StoreContext: typeof StoreContext
) => {
  ReactDOM.render(
    <_StoreContext.Provider value={Store}>
      <_AppUI />
    </_StoreContext.Provider>,
    root
  )
}

const root = document.getElementById("root")
renderApp(root, AppUI, StoreContext)

if (module.hot) {
  module.hot.accept("./ui", function() {
    const AppUI = require("./ui")
    renderApp(root, AppUI, StoreContext)
  })

  module.hot.accept("./store", function() {
    const { StoreContext } = require("./store")
    renderApp(root, AppUI, StoreContext)
  })
}
