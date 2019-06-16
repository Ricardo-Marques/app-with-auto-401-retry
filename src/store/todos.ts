import { action, observable, computed } from "mobx"

import { AppStore } from "./index"
import { Response } from "./http"

export class TodosStore {
  _appStore: AppStore
  constructor(appStore: AppStore) {
    this._appStore = appStore
  }

  @observable _list: Todo[]

  @computed get list() {
    if (this._list == null) {
      this.fetchTodos()
    } else {
      return this._list
    }
  }

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
  @action setTodos(todos: Todo[]) {
    this._list = todos
  }
}

export type Todo = {
  id: string
  done: boolean
  text: string
}
