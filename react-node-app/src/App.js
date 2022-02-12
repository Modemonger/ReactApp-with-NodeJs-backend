import React, { useState, useEffect } from "react";


function App() {

  const [data,setData] = useState(null);
  const [quotes,setQuotes] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [])
  
  useEffect(() => {
    fetch('/quotes')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data);
      });
  }, [])

  const printQuotes = () => {
    let output =[];
    quotes.forEach(quote => {
      output.push(<p>{quote.name}: {quote.quote}</p>);
    });
    return output;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        {!quotes ? 'Loading...' : printQuotes()}
      </header>
    </div>
  );
}

export default App;
