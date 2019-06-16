import * as React from "react"

import _Store from "./index"

export const Store = new _Store()

export default React.createContext(Store)
