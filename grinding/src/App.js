import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  return (
    <div className="App">
      <ContatoreRef />
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



  function aggiornaContatore()
  {
    let temp = counter;
    temp++;
    if(temp==3)
      temp=100;
    setCounter(temp);//counter in memoria React vale 3
    //ma la funzione lo vedrà aggiornato solo dopo essere stata rigraficata
  }


  return(
   <>         
        <h1>{counter}</h1>
        <input type="button" value="aumenta di uno" onClick={aggiornaContatore} />
    </>
  );
}




function ContatoreRef()
{
  let counter = useRef(0);//variabile salvata in memoria react, con la differenza rispetto allo state che
  //il suo cambiamento non refresha la pagina

  
  function aggiornaContatore()
  {
    console.log(counter.current);
    counter.current++;
    console.log(counter.current);
    
  }
  
  let casellina = useRef(null);
  
  function stampaCasellina()
  {
    casellina.current.style.color="green";
    //casellina.current -> document.getElementById("id")      .value
  }


  return(
    <>         
         <h1>{counter.current}</h1>
         <input type="button" value="aumenta di uno" onClick={aggiornaContatore} />
          <br/><br/><br/>
          
         <input ref={casellina} style={{color:"red"}} type="text" />
         <input  type="button" value="stampa" onClick={stampaCasellina} />
     </>
   );
}

