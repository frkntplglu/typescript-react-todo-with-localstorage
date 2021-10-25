import React, {ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import { getFromStorage, saveToStorage } from './helpers/storage';
import TodoItem from './TodoItem';
import ITodo from './interfaces';

function App(): JSX.Element {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    const todoList = getFromStorage("todoList");
    if(!todoList) return;

    setTodos(todoList);
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  }

  const handleClick = (): void => {
    const newTodo = {
      id: todos.length + 1,
      title: todo,
      isDone: false
    }
    
    setTodos(prevState => [...prevState, newTodo])
    saveToStorage("todoList", [...todos, newTodo]);
    setTodo("");
  }

  const handleTask = (id: number): void => {
    const newTodos = todos.map(todo => {
      if(todo.id === id){
        todo.isDone = true;
      }
      return todo
    });
    saveToStorage("todoList", newTodos);
    setTodos(newTodos);
    
  }

  const handleDelete = (id: number): void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveToStorage("todoList", newTodos);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <input type="text" placeholder="Type your todo" value={todo} onChange={handleChange} />
      <button onClick={handleClick}>ADD</button>


      <ul>
        {todos.map(todo => <TodoItem id={todo.id} key={todo.id} title={todo.title} isDone={todo.isDone} doneTask={handleTask} deleteTask={handleDelete} />)}
      </ul>
    </div>
  );
}

export default App;
