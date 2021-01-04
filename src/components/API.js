import React, { useState } from "react";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import "../App.css";

const API = () => {
  const [serverData, setServerData] = useState([]);
  const [inputString, setInputString] = useState("");
  let warData = [];
  let filteredElements = [];

  let favElements = [];
  const [fav, setFav] = useState(favElements)


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

  function addToFavorite(item) {
    let obj = {
        name: item.name,
        birth_year: item.birth_year,
        eye_color: item.eye_color
    }
    setFav(favElements => [...favElements, obj])
  };

  const elmentsList = serverData.map((result, index) => {
    return (
      <fieldset id="war-box" key={result.name + index}>
        <legend>{result.name}</legend>
        <span id="favo" onClick={() => addToFavorite(result)}>❤️</span>
        <h4>Eye color: <span>{result.eye_color}</span></h4>
        <h4>Birth year: <span>{result.birth_year}</span></h4>
      </fieldset >
    )
  })

  function removeFromFavorite(item) {
    setFav(fav.filter(fav => fav.name !== item.name))
  };

  /*
  function favInit() {
    let obj = {
        name: name,
        birth_year: birth_year,
        eye_color: eye_color
    }
    addToFavorite(obj)
  }
  */

  const favs = fav.map((item) => {
    return (
      <fieldset id="fav-war-box" key={item.name}>
        <legend>{item.name}</legend>
        <span id="favo" onClick={() => removeFromFavorite(item)} >❌</span>
        <h4>Eye color: <span>{item.eye_color}</span></h4>
        <h4>Birth year: <span>{item.birth_year}</span></h4>
      </fieldset >
    )
  })
  

  function handleToggle(){
    const el = document.getElementById("add-section");
    $(el).slideToggle();
  };


  return (
    <div className="container">
      <section className="search-box">
        <div id="logo">
          <img id="add-icon" src="/logo.png" ></img>
        </div>
        <div id="sub">
          <input id="txt" value={inputString} onChange={event => setInputString(event.target.value.toLowerCase())} type="text" placeholder="Enter valid search text" />
          <button id="btn" onClick={getWars}>Search</button>
        </div>
        <span onClick={handleToggle}>
          <img id="add-icon" src="/add.png" ></img>
        </span>
      </section>

      <div id="add-section">
        <h3>Add your favorite starwar</h3>
        <table>
          <tr>
            <td>Nmae: </td>
            <td><input type="text"></input></td>
          </tr>
          <tr>
            <td>Birth year: </td>
            <td><input type="text"></input></td>
          </tr>
          <tr>
            <td>Eye Color: </td>
            <td><input type="text"></input></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button>Add</button>
            </td>
          </tr>
        </table>

      </div>

      <div className="list-container">
        <div>
          <h3>Main list</h3>
          {elmentsList}
        </div>
        <div>
          <h3>Favorites list</h3>
          {favs}
        </div>
      </div>
    </div>
  )
}

export default API;

