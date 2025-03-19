import React, { useReducer, useState, useEffect, useCallback } from 'react';

// Define action types
const ACTIONS = {
  SET_TODOS: 'set_todos',
  ADD_TODO: 'add_todo',
  UPDATE_TODO: 'update_todo',
  DELETE_TODO: 'delete_todo',
  SET_LOADING: 'set_loading',
};

// Reducer function to handle actions
const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload, loading: false };
    case ACTIONS.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  todos: [],
  loading: false,
};

function TodoApp2() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: ACTIONS.SET_LOADING });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        dispatch({ type: ACTIONS.SET_TODOS, payload: data });
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Handle input change
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Add a new to-do
  const handleAddTodo = async () => {
    if (!inputValue.trim()) return;

    const newTodo = {
      title: inputValue,
      completed: false,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: ACTIONS.ADD_TODO, payload: data });
      setInputValue('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Edit an existing to-do
  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setInputValue(todo.title);
  };

  // Save the edited to-do
  const handleSaveEdit = async () => {
    if (!inputValue.trim()) return;

    const updatedTodo = {
      ...state.todos.find(todo => todo.id === editId),
      title: inputValue,
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: ACTIONS.UPDATE_TODO, payload: data });
      setInputValue('');
      setEditId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a to-do
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle key press to trigger add or edit
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editId) {
        handleSaveEdit();
      } else {
        handleAddTodo();
      }
    }
  };

  return (
    <div className="todo-container">
      <h1 className="text-xl font-semibold">To-Do List</h1>

      {/* Input Section */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="border p-2 rounded"
        placeholder="Enter a to-do"
      />

      <button
        onClick={editId ? handleSaveEdit : handleAddTodo}
        className="bg-blue-500 text-white p-2 ml-4 rounded"
      >
        {editId ? 'Save Edit' : 'Add Todo'}
      </button>

      {/* Loading indicator */}
      {state.loading && <p>Loading...</p>}

      {/* Todo List */}
      <ul className="mt-4">
        {state.todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span>{todo.title}</span>

            {/* Edit and Delete Buttons */}
            <div>
              <button
                onClick={() => handleEditTodo(todo)}
                className="bg-yellow-500 text-white p-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp2;
