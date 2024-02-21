import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <DadoMalefico />
    </div>
  );
}

export default App;


//HOOK

//1) Quando un componente viene rigraficato la sua funzione viene eseguita
//2) Ci sono però azioni che non possono essere ripetute ogni volta che la funzione viene eseguita (inizializzazione di una variabile di STATO)
//3) Gli Hook sono funzioni che HANNO UN INTERAZIONE PARTICOLARE CON IL COMPONENTE, che vengono gestiti da REACT
//4) TUTTI GLI HOOK iniziano con USE
function DadoMalefico()
{
  const [counter,setCounter] = useState(0);
  //1) Non REINIZIALIZZO counter ad ogni esecuzione, ma solo una volta, poi mantiene il valore che aveva precedentemente
  //2) Ogni volta che il suo valore CAMBIA la funzione viene richiamata  (il componente viene refreshato, rigraficato)

  return(
   <>         
        <h1>{counter}</h1>
        <input type="button" value="aumenta di uno" onClick={()=>setCounter(counter+1)} />
    </>
  );
}