import React, { useState } from "react";


const API = () => {
  const [serverData, setServerData] = useState([]);
  const [inputString, setInputString] = useState("");
  let warData = [];
  let filteredElements = [];


  async function getWars() {
    let url = `https://swapi.dev/api/people/?page=1`;
    let hasItems = true;

    while (hasItems) {
      const res = await fetch(url);
      const json = await res.json();
      if (!json.next) hasItems = false;
      if (hasItems) {
        url = json.next.replace("http", "https");
        json.results.map((item) => {
            return warData.push(item)
        })
      }
    }
    filterElements();
  };


  function filterElements() {
      filteredElements = [...warData];
      filteredElements = filteredElements.filter(item => {
          if (item.name.toLowerCase().includes(inputString)) return true;
          else if (item.birth_year.toLowerCase().includes(inputString)) return true;
          else if (item.eye_color.toLowerCase().includes(inputString)) return true;
          else return false;
      })
      return setServerData(filteredElements);
  };

  const elements = serverData.map((result, index) => {
    return (
      <div key={result.name + index}>
        <p>{result.name}</p>
        <span>fav</span>
        <p>Eye color: <span>{result.eye_color}</span></p>
        <p>Birth year: <span>{result.birth_year}</span></p>
      </div >
    )
  })

  return (
    <div className="search-bar">
      <input value={inputString} onChange={event => setInputString(event.target.value.toLowerCase())} type="text" placeholder="Enter valid srerch text" />
      <button onClick={getWars}>Search</button>
      <div>
        {elements}
      </div>
    </div>
  )
}

export default API;

