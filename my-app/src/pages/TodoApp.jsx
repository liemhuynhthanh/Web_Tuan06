import React, { useState, useRef } from 'react';

function TodoApp() {
  // State for managing the list of to-dos
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);  // To track which item to edit
  const inputRef = useRef(null); // Reference for the input field

  // Add a new to-do
  const handleAdd = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, id: Date.now() }]);
      setInputValue('');  // Clear input field after adding
    }
  };

  // Delete a to-do
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing a to-do
  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setInputValue(todoToEdit.text);
    setEditIndex(id);  // Set the index of the item being edited
    inputRef.current.focus();  // Focus on the input when editing
  };

  // Save edited to-do
  const handleSaveEdit = () => {
    if (inputValue.trim()) {
      setTodos(todos.map(todo => 
        todo.id === editIndex ? { ...todo, text: inputValue } : todo
      ));
      setInputValue('');  // Clear input after saving
      setEditIndex(null);  // Reset edit index
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="todo-container">
      <h1 className="text-xl font-semibold">To-Do List</h1>
      
      {/* Input Section */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border p-2 rounded"
        placeholder="Enter a to-do"
      />

      <button 
        onClick={editIndex ? handleSaveEdit : handleAdd} 
        className="bg-blue-500 text-white p-2 ml-4 rounded"
      >
        {editIndex ? 'Save Edit' : 'Add Todo'}
      </button>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span>{todo.text}</span>
            
            {/* Edit and Delete Buttons */}
            <div>
              <button 
                onClick={() => handleEdit(todo.id)} 
                className="bg-yellow-500 text-white p-1 mr-2 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(todo.id)} 
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

export default TodoApp;
