import React, { useState, useEffect } from "react";
import axios from 'axios';


function App() {

  const [data,setData] = useState(null);
  const [quotes,setQuotes] = useState(null);
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');

  //Get data from app
  function RetrieveData(){
      axios.get('/api')
        .then(res => res.data)
        .then((data) => setData(data.message))
        .catch(err => console.log(err.data))
    
      axios.get('/quotes')
        .then(res => res.data)
        .then((data) => {setQuotes(data)});
  }

  useEffect(() => {
    RetrieveData()
  }, [])
  
  

  //send data to api
  function sendPost(e, post){
    e.preventDefault();
      axios.post('/post', post)
      .then(response => response.data)
      .then(data => console.log(data))
      .then(RetrieveData())
      .catch(err => console.log(err.data))
      
    setQuote('');
    setName('');
  }

  function removeQuote(e, quote){
    e.preventDefault();
    console.log('Removing');
    axios.delete(`/remove:${quote}`)
    .then(response => console.log(response.data))
    .then(RetrieveData())
    .catch(err => console.log(err.data))
    
    
  }
  

  const printQuotes = () => {
    let output =[];
    quotes.forEach(quote => {
      output.push(<p key={quote._id}>{quote.name}: {quote.quote} <input type='button' value='X' onClick={(event) => removeQuote(event, quote.quote)} /> </p>);
    });
    return output;
  }

  
 
  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <form onSubmit={(event) => sendPost(event, {name: name, quote: quote})}>
          <input type='text' value={name} onChange={((e) => {setName(e.target.value)})} />
          <input type='text' value={quote} onChange={((e) => {setQuote(e.target.value)})} />
          <input type='submit' value="Submit" />
        </form>
        
        {!quotes ? 'Loading...' : printQuotes()}
      </header>
    </div>
  );
}

export default App;
