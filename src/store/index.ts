import { AuthStore } from "./auth"
import { HttpStore } from "./http"
import { TodosStore } from "./todos"

export interface AppStoreStructure {
  auth: AuthStore
  http: HttpStore
  todos: TodosStore
}

export default class AppStore implements AppStoreStructure {
  auth: AuthStore
  http: HttpStore
  todos: TodosStore

  constructor() {
    this.auth = new AuthStore(this)
    this.http = new HttpStore(this)
    this.todos = new TodosStore(this)
  }
}
