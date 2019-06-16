import { action, observable, computed } from "mobx"

import { AppStore } from "./index"
import getMockData from "./mockData"

let requestId: string

export class HttpStore {
  _appStore: AppStore
  constructor(appStore: AppStore) {
    this._appStore = appStore
  }

  @observable failedRequests: {
    [requestId: string]: {
      request: Request
      response: Response<any>
      resolver: (value: any) => void
    }
  } = {}
  @observable shouldFailRequests: boolean = false

  @computed get requestsFailedDueToAuthRequired() {
    return Object.keys(this.failedRequests).filter(requestId => {
      return this.failedRequests[requestId].response.status === 401
    })
  }

  makeRequest(request: Request) {
    requestId = String(new Date().valueOf())

    return new Promise((res, rej) => {
      setTimeout(() => {
        if (this.shouldFailRequests) {
          const response = { status: 401, error: "Please authenticate." }
          this.setFailedRequest(request, response, res)
        } else {
          const data = getMockData(request.url)
          if (data != null) {
            res({ status: 200, data })
          } else {
            throw Error("No response set for this url.")
          }
        }
      }, 200)
    })
  }

  @action retryRequestsFailedDueToAuthRequired() {
    this.requestsFailedDueToAuthRequired.forEach(requestId => {
      this.makeRequest(this.failedRequests[requestId].request).then(
        action(response => {
          this.failedRequests[requestId].resolver(response)

          this.clearFailedRequest(requestId)
        })
      )
    })
  }
  @action setFailedRequest(
    request: Request,
    response: Response<any>,
    resolver: () => void
  ) {
    this.failedRequests[requestId] = { request, response, resolver }
  }
  @action clearFailedRequest(requestId: string) {
    delete this.failedRequests[requestId]
  }
  @action toggleShouldFailRequests() {
    this.shouldFailRequests = !this.shouldFailRequests
  }
}

export type Request = {
  url: string
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE"
  body?: any
}

export type Response<Data> = {
  status: number
  data?: Data
  error?: string
}
