import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import NotAuthorized from "./pages/401"
import './App.css';
import { useState } from "react";

function App() {
  const [ user, setUser ] = useState({})
  const loggedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  return (
    <Router>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" exact element={<Home user={user} setUser={setUser}/>}/>
        { loggedUser ?
          <Route path="/chat" element={<Chat />}/> :
          <Route path="/chat" element={<NotAuthorized />}/> 
        }
      </Routes>
    </Router>
  )
}

export default App;