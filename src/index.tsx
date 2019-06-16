import * as React from "react"
import * as ReactDOM from "react-dom"

import "store/config"
import AppUI from "ui"
import StoreContext, { Store } from "store/context"

const renderApp = (
  root: Element,
  _AppUI: typeof AppUI,
  _StoreContext: typeof StoreContext
) => {
  // @ts-ignore
  window.store = Store

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

  module.hot.accept("./store/context", function() {
    const StoreContext = require("./store/context")
    renderApp(root, AppUI, StoreContext)
  })
}
