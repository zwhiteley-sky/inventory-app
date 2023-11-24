import "./App.css";
import Header from './components/Header/Header'
import Card from './components/Card/Card.jsx'
import Login from './components/Login/Login.jsx'



import { useEffect, useState } from "react";
import { useAuth } from "./providers/authprovider";

function App() {

  const [auth, login, register, logout] = useAuth()

  const [cards, setCards] = useState([])

  const [search, setSearch] = useState("")

  async function refresh() {
    const response = await fetch('http://localhost:4000/product')
    const body = await response.json()
    setCards(body)
  }

  useEffect( () => {
    refresh()
  }, [])

  if(auth.state === 'logged-in') {
    return(
      <main>
        <Header onRefresh={refresh} />
        <div className="search-container">
          <input onChange={(e) => setSearch(e.currentTarget.value)} value={search} placeholder="search for useless items here" className="card-search" type="text" />
        </div>
        
        <div className="card-container">

          {cards.filter(card => (card.name.toLowerCase().includes(search.toLowerCase()))).map(card => (<Card key={card.id} card={card} onRefresh={refresh} />))}
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
