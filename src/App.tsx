// import { useState } from 'react'
// import { Task } from './Components/TodoItem'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import TodoList from './Components/TodoList'
import './index.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>📋 To-Do List</h1>
      <TodoList />
    </div>
  )
}

export default App