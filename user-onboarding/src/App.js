import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import UserForm from "./Form";
import './App.css';

function App() {
  const [userList, setUserList] = useState([]);
  const addMember = member => {
    setUserList([...userList, member]);
  }
  return (
    <div className="App">
    <div className="formbox">
      <UserForm addMember={addMember}/>
    </div>
    <div className="user-list">
    {userList.map(user => {
      if (user.name) { return(
        <div className="user-card">
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Role: {user.role}</li>
            <li>Email: {user.email}</li>
          </ul>
        </div>
      )}
    })}
    </div>
    </div>
  );
}

export default App;
