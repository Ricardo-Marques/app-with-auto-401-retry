import * as React from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

import { StoreContext } from "store"

@observer
export default class LoginPrompt extends React.Component {
  static contextType = StoreContext
  context!: React.ContextType<typeof StoreContext>

  @observable username = ""

  render() {
    const { http, auth } = this.context

    if (http.requestsFailedDueToAuthRequired.length > 0) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            border: "1px solid grey",
            padding: 20,
            width: 500,
            display: "flex"
          }}
        >
          <input
            placeholder={'Username (use "ok" to login)'}
            style={{ flex: 1 }}
            onChange={this.onInputChange}
            value={this.username}
          />
          <button onClick={() => auth.login(this.username)}> Login</button>
        </div>
      )
    }

    return null
  }

  @action.bound onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.username = e.target.value
  }
}
