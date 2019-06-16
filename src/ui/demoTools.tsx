import * as React from "react"
import { observer } from "mobx-react"

import { StoreContext } from "store"

export default observer(function DemoTools() {
  const appStore = React.useContext(StoreContext)

  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        top: "0",
        bottom: "0",
        padding: 20,
        background: "teal"
      }}
    >
      <button onClick={() => appStore.http.toggleShouldFailRequests()}>
        {appStore.http.shouldFailRequests ? "Stop" : "Start"} failing requests
      </button>
    </div>
  )
})
