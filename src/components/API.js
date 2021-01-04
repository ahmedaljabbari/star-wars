import React, { useState } from "react";
import "../App.css";


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

  const elmentsList = serverData.map((result, index) => {
    return (
      <div key={result.name + index}>
        <p>{result.name}</p>
        <span>❤️</span>
        <p>Eye color: <span>{result.eye_color}</span></p>
        <p>Birth year: <span>{result.birth_year}</span></p>
      </div >
    )
  })

  return (
    <div className="container">
      <section className="search-box">
        <div id="logo">
          Star Wars
        </div>
        <div id="sub">
          <input id="txt" value={inputString} onChange={event => setInputString(event.target.value.toLowerCase())} type="text" placeholder="Enter valid search text" />
          <button id="btn" onClick={getWars}>Search</button>
        </div>
        <span id="add-section">
          +
        </span>
      </section>

      <div className="list-container">
        <div>
          <h3>Main list</h3>
          {elmentsList}
        </div>
        <div>
          <h3>Favorites list</h3>
          
        </div>
      </div>
    </div>
  )
}

export default API;

