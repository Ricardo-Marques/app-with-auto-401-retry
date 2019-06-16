import * as React from "react"

import { AuthStore } from "./auth"
import { HttpStore } from "./http"
import { TodosStore } from "./todos"

export class AppStore {
  auth: AuthStore
  http: HttpStore
  todos: TodosStore

  constructor() {
    this.auth = new AuthStore(this)
    this.http = new HttpStore(this)
    this.todos = new TodosStore(this)
  }
}

export const Store = new AppStore()
export const StoreContext = React.createContext(Store)
