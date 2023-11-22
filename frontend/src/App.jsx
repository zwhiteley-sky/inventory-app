import "./App.css";
import Header from './components/Header'
import Card from './components/Card'

function App() {
  return (
    <main>
      <Header />
      <input placeholder="search for useless items here" class="card-search" type="text" />
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
    
  );
}

export default App;
