import React, { createContext, useContext, useReducer, useState, useEffect, useRef } from 'react';

// Global State with useContext and useReducer
const StateContext = createContext();
const DispatchContext = createContext();

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// StateProvider: Cung cấp state toàn cục cho ứng dụng
export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext); // Trả về state từ context
}

export function useStateDispatch() {
  return useContext(DispatchContext); // Trả về dispatch từ context
}

// Parent Component (Sử dụng useReducer, useRef, useState, useEffect)
export default function Parent() {
  const dispatch = useStateDispatch(); // Dispatch các hành động để thay đổi state toàn cục
  const [count, setCount] = useState(0); // State cục bộ cho count
  const [inputValue, setInputValue] = useState(''); // State cục bộ cho input
  const inputRef = useRef(null); // Ref cho input field
  const [users, setUsers] = useState([]); // State cục bộ cho danh sách người dùng

  // Mô phỏng việc gọi API với useEffect
  useEffect(() => {
    console.log("Fetching data...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []); // Chạy một lần khi component mount

  // Xử lý sự thay đổi của input
  const handleInputChange = () => {
    setInputValue(inputRef.current.value);
  };

  const increment = () => {
    setCount(count + 1);
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    setCount(count - 1);
    dispatch({ type: "decrement" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Parent Component</h2>

      <div className="my-4">
        <button
          onClick={increment}
          className="bg-blue-500 text-white p-2 mr-4 rounded"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="bg-red-500 text-white p-2 rounded"
        >
          Decrement
        </button>
      </div>

      {/* Hiển thị count cục bộ */}
      <h1>Count (local state): {count}</h1>

      <h4>Text input (via useRef):</h4>
      <input
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        className="border p-2 rounded"
      />
      <p>Input Value: {inputValue}</p>

      <h2>Danh sách người dùng</h2>
      {/* Kiểm tra xem có người dùng không */}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <Child />
    </div>
  );
}

// Child Component (nhận giá trị và truyền lại cho Parent thông qua props)
function Child() {
  const [childValue, setChildValue] = useState('');

  const handleChange = (e) => {
    setChildValue(e.target.value);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg">Child Component</h3>
      <input
        type="text"
        value={childValue}
        onChange={handleChange}
        className="border p-2 rounded mb-4"
        placeholder="Type something in Child"
      />
      <p>Child Value: {childValue}</p>
    </div>
  );
}

// Wrap the app with StateProvider to provide global state
export function UseReducer() {
  return (
    <StateProvider>
      <Parent />
    </StateProvider>
  );
}
