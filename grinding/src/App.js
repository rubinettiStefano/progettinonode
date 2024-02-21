import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { atom, useAtom } from 'jotai';

const valore = atom(10);

function App() {

  function funzioneRestituisceCiao()
  {
    return "CIAOOOOOOOO!!!!!";
  }

  let propsDaPassare =
  {
    propsNumero1:"ciao",    
    propsNumero2:"addio",
    propsNumero3:{funzioneRestituisceCiao}
  };

  // let propsNumero3 = funzioneRestituisceCiao;
  // propsNumero3(); 
  //esegue  funzioneRestituisceCiao
  //per il figlio scrivere props.propsNumero3() === nel padre scrivere funzioneRestituisceCiao()

  return (
    <div className="App">  
      <DadoMalefico />                                               {/*propsNumero3="CIAOOOOOOOO!!!!!" */}
      <CompConProps funzioneACaso={()=>console.log("ciao")}   {...propsDaPassare}  />
      {/* <CompConProps   propsNumero1="ciao " propsNumero2="addio"  propsNumero3={funzioneRestituisceCiao} /> */}
    </div>
  );                 //{...propsDaPassare}  SINTASSI DI SPREAD
                    //EQUIVALENTE A SCRIVERE propsNumero1="ciao " propsNumero2="addio"  propsNumero3={funzioneRestituisceCiao}
}

//VALORE DELLA FUNZIONE
// ƒ funzioneRestituisceCiao() {   return "CIAOOOOOOOO!!!!!";} 
//VALORE DELLA FUNZIONE+()
// ƒ funzioneRestituisceCiao() {   return "CIAOOOOOOOO!!!!!";} ()


export default App;

//props è una MAPPA
//che ha le chiavi passate dal padre collegate ai valori passati dal padre
//chiavi              valori
//propsNumero1        "ciao"
//propsNumero2        "addio"
/*function CompConProps(props)*/function CompConProps({propsNumero1,propsNumero2,propsNumero3})
{

  const [valGlobale,setValGlobale] = useAtom(valore);
  //per accedere ad una chiave di una mappa (attributi di un oggetto)
  //SINTASSI STATICA, con il punto
  //onsole.log(props.propsNumero3()); 
  //SINTASSI DINAMICA, (sintassi di mappa), con le quadre
  // props["propsNumero1"];//riga 24 e 26 sono EQUIVALENTI

  //le props sono MAPPE IMMUTABILI CONTENENTI VALORI IMMUTABILI
  //è di sola lettura

  let mappaNormale = {};//mappa vuota, oggetto vuoto
  mappaNormale.a = "aaaaa";//aggiunta chiave a collegata a valore "aaaaaa"
  mappaNormale["b"] = "bbbbbbbb";//aggiunta chiave b collegata a valore "bbbbbbbb"
  mappaNormale.a = "ccccccccccc";//modificato valore collegato alla chiave "a"
 
  return(
    <>
      <h1 style={{color:"red"}}>{valGlobale}</h1>
    </>
  );
}

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

  const [valoreGlobale,setValoreGlobale] = useAtom(valore);
  
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
        <h1>{valoreGlobale}</h1>  
        <input type='button' value="aggiungi 1 al valore globale" onClick={()=>setValoreGlobale(valoreGlobale+1)} />
    </>
  );
}




function ContatoreRef()
{
  let counter = useRef(0);//variabile salvata in memoria react, con la differenza rispetto allo state che
  //il suo cambiamento non refresha la pagina
  let [a,setA] = useState(0)

  let [people,setPeople] = useState([]);

  //viene in realtà più spesso che non, utilizzato per INIZIALIZZARE il componente
  useEffect(
    function()
    {
      //MANDIAMO UNA REQUEST AL BACKEND per ricevere i dati da graficare
      setPeople([{name:"stefano"},{name:"alessandro"}]);//tramite request
     // axios.get("/people").then(()=>setPeople([{name:"stefano"},{name:"alessandro"}]))
    },
    []
  );

  useEffect(
    function()
    {
      console.log(a)
    },
    [a]
  );
  
  function aggiornaContatore()
  {
    counter.current++;
  }
  
  let casellina = useRef(null);
  
  function stampaCasellina()
  {
    casellina.current.style.color="green";
    //casellina.current -> document.getElementById("id")      .value
  }

  function callbackDiOnclick()
  {
    setA(a+1)
  }
  return(
    <>         
         {/* <h1>{counter.current}</h1>
         <input type="button" value="aumenta di uno" onClick={aggiornaContatore} /> */}
         <h1>{a}</h1>
         <input type="button" value="aumenta di uno" onClick={callbackDiOnclick}  />
         <input type="button" value="aumenta di uno" onClick={function(){setA(a+1)} } />
         <input type="button" value="aumenta di uno" onClick={() =>setA(a+1) } />
          <br/><br/><br/>

         <input ref={casellina} style={{color:"red"}} type="text" />
         <input  type="button" value="stampa" onClick={stampaCasellina} />
         <br/><br/><br/>
         {people.map(p=> <h1>{p.name}</h1>)}

     </>
   );
}

