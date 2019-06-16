import { action, observable, computed } from "mobx"

import { Response } from "./http"
import AppStore from "./index"

export class TodosStore {
  _appStore: AppStore
  constructor(appStore: AppStore) {
    this._appStore = appStore
  }

  @observable _list: Todo[]

  @action fetchTodos() {
    return this._appStore.http
      .makeRequest({
        url: "todos",
        method: "GET"
      })
      .then((res: Response<Todo[]>) => {
        this.setTodos(res.data)
      })
  }
  @action addTodo(text: string) {
    const todoId = String(new Date().valueOf())

    this.list.push({
      id: todoId,
      done: false,
      text
    })
  }
  @action setTodos(todos: Todo[]) {
    this._list = todos
  }
  @action markTodoAsDone(id: string) {
    this.list.find(todo => todo.id === id).done = true
  }

  @computed get list() {
    if (this._list == null) {
      this.fetchTodos()
    } else {
      return this._list
    }
  }
}

export type Todo = {
  id: string
  done: boolean
  text: string
}
