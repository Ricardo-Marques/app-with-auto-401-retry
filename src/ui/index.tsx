import * as React from "react"

import TodoList from "./todoList"
import DemoTools from "./demoTools"
import LoginPrompt from "./loginPrompt"

export default function AppUI() {
  return (
    <>
      <TodoList />
      <DemoTools />
      <LoginPrompt />
    </>
  )
}
