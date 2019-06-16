import { configure } from "mobx"

configure({
  // Forbids the access of any unobserved computed value
  computedRequiresReaction: true,
  // All state that is observed somewhere needs to be changed through actions
  enforceActions: "observed"
})
