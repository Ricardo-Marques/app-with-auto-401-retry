import * as React from "react"
import { observer } from "mobx-react"

import { StoreContext } from "store"
import { Todo } from "store/todos"

export default observer(function TodoList() {
  const { todos } = React.useContext(StoreContext)

  return todos.list.current().case({
    pending: staleValue => {
      // this will currently throw an error unless the type definition file is edited directly https://github.com/mobxjs/mobx-utils/pull/208
      return (
        <>
          <span>Loading todos...</span>
          {staleValue != null && <Todos todos={staleValue} />}
        </>
      )
    },
    fulfilled: todos => <Todos todos={todos} />,
    rejected: () => <span>Failed gettings todos :(</span>
  })
})

function Todos(props: { todos: Array<Todo> }) {
  return (
    <>
      {props.todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  )
}

function Todo(props: { todo: Todo }) {
  return <div>{props.todo.text}</div>
}
