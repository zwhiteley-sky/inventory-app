import "./App.css";
import Header from './components/Header/Header'
import Card from './components/Card/Card.jsx'
import Login from './components/Login/Login.jsx'
import { useState } from "react";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if(isLoggedIn) {
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
