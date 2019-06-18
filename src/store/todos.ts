import {
  fromPromise,
  IPromiseBasedObservable,
  lazyObservable,
  ILazyObservable
} from "mobx-utils"

import { AppStore } from "./index"
import { Response } from "./http"

export class TodosStore {
  private _appStore: AppStore
  constructor(appStore: AppStore) {
    this._appStore = appStore
  }

  list: ILazyObservable<IPromiseBasedObservable<Todo[]>> = fromLazyPromise(
    () =>
      this._appStore.http
        .makeRequest({
          url: "todos",
          method: "GET",
          retry: this.list.refresh
        })
        .then((res: Response<Todo[]>) => res.data),
    () => this.list.current()
  )

  polledList = fromPolledLazyPromise(() => this.list, 2000)
}

export type Todo = {
  id: string
  done: boolean
  text: string
}

function fromLazyPromise<T>(
  fetch: () => PromiseLike<T>,
  oldPromiseFetch: () => IPromiseBasedObservable<T>
) {
  return lazyObservable<IPromiseBasedObservable<T>>(sink => {
    sink(fromPromise(fetch(), oldPromiseFetch()))
  })
}

function fromPolledLazyPromise<T>(
  lazyPromiseFetch: () => ILazyObservable<IPromiseBasedObservable<T>>,
  pollFrequency: number
) {
  return lazyObservable<IPromiseBasedObservable<T>>(sink => {
    setInterval(() => {
      lazyPromiseFetch().refresh()
      sink(lazyPromiseFetch().current())
    }, pollFrequency)
  })
}
