import React, { useEffect } from "react"
import { useState } from "react"
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { Footer } from "./Footer";
import "./styles.css"

export default function App() {
    const [todos , setNewTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEM")
        if (localValue == null) 
            return []
        return JSON.parse(localValue)
    })
    
    useEffect(() => {
        localStorage.setItem("ITEM", JSON.stringify(todos))
    }, [todos])

    function addTodo(title){
       setNewTodos((currentTodos) => {
            return (
            [...currentTodos, {id: crypto.randomUUID(), title, completed: false}]
        )})
    }
    function toggleTodo(id , completed){
        setNewTodos(currentTodos => {
            return currentTodos.map(todo => {
                if(todo.id === id) {
                    return {...todo, completed}
                }
                return todo
            })
        })
    }
    function deleteTodo(id) {
        setNewTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id != id)
        }) 
    }
    return (
      <>
       <NewTodoForm addTodo={addTodo}/>
        <h1 className="header">Todo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        <Footer />
      </>
    );
  }