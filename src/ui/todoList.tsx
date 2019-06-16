import * as React from "react"
import { observer } from "mobx-react"

import { StoreContext } from "store"

@observer
export default class TodoList extends React.Component {
  static contextType = StoreContext
  context!: React.ContextType<typeof StoreContext>

  componentDidMount() {
    const { todos } = this.context
    setInterval(() => todos.fetchTodos(), 2000)
  }

  render() {
    const { todos } = this.context

    if (todos.list == null) {
      return <div>Loading todos...</div>
    }

    return (
      <>
        {todos.list.map(todo => (
          <div key={todo.id}>
            <div>{todo.text}</div>
          </div>
        ))}
      </>
    )
  }
}
