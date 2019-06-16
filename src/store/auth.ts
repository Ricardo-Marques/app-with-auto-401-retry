import { observable, action } from "mobx"

import AppStore from "./index"
import { Response } from "./http"

export class AuthStore {
  _appStore: AppStore

  constructor(appStore: AppStore) {
    this._appStore = appStore
  }

  @observable authenticatedUser: User = null

  @action login(username: string) {
    if (username !== "ok") {
      return Promise.reject()
    }

    this._appStore.http.toggleShouldFailRequests()

    this._appStore.http
      .makeRequest({
        url: "authenticate",
        method: "POST"
      })
      .then((res: Response<User>) => {
        this.setAuthenticatedUser(res.data)
        this._appStore.http.retryRequestsFailedDueToAuthRequired()
      })
  }

  @action setAuthenticatedUser(user: User) {
    this.authenticatedUser = user
  }
}

export type User = {
  id: string
  name: string
  avatar: string
}
