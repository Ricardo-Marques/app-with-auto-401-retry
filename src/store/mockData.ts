let todos = [generateTodo(1), generateTodo(2), generateTodo(3)]

function generateTodo(id: number) {
  return {
    id,
    done: false,
    text: `Program ${id}`
  }
}

let todoId = 4

export default function getMockData(url: string) {
  if (url === "authenticate") {
    return {
      id: "mockUserID",
      name: "Ricardo",
      avatar: "https://fillmurray.com/200/300"
    }
  } else if (url === "todos") {
    todos = todos.concat(generateTodo(todoId))
    todoId++
    return todos
  }
}
