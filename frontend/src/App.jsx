import "./App.css";
import Header from './components/Header/Header'
import Card from './components/Card/Card.jsx'
import Login from './components/Login/Login.jsx'



import { useState } from "react";
import { useAuth } from "./providers/authprovider";

function App() {

  const [auth, login, register, logout] = useAuth()

  if(auth.state === 'logged-in') {
    return(
      <main>
        <Header />
        <div className="search-container">
          <input placeholder="search for useless items here" className="card-search" type="text" />
        </div>
        
        <div className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
    </main>
    )
  } else {
    return(
      <main>
        <Login/>
      </main>
      
    )
    
  }
}

export default App;
