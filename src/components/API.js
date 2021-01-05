import React, { useState } from "react";
import $ from "jquery";
import AddIcon from "../imgs/add.png"
import LogoIcon from "../imgs/logo.png"
import "../App.css";

const API = () => {
  const [serverData, setServerData] = useState([]);
  const [inputString, setInputString] = useState("");
  let warData = [];
  let filteredElements = [];

  let favElements = [];
  const [fav, setFav] = useState(favElements);

  const [name, setName] = useState("");
  const [birth_year, setBirthYear] = useState("");
  const [eye_color, setEyeColor] = useState("");

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
          return warData.push(item);
        });
      }
    }
    filterElements();
  }

  function filterElements() {
    filteredElements = [...warData];
    filteredElements = filteredElements.filter((item) => {
      if (item.name.toLowerCase().includes(inputString)) return true;
      else if (item.birth_year.toLowerCase().includes(inputString)) return true;
      else if (item.eye_color.toLowerCase().includes(inputString)) return true;
      else return false;
    });
    return setServerData(filteredElements);
  }

  function addToFavorite(item) {
    let obj = {
      name: item.name,
      birth_year: item.birth_year,
      eye_color: item.eye_color,
    };
    setFav((favElements) => [...favElements, obj]);
  }

  const elmentsList = serverData.map((result, index) => {
    return (
      <fieldset id="war-box" key={result.name + index}>
        <legend>{result.name}</legend>
        <span id="favo" onClick={() => addToFavorite(result)}>
          ❤️
        </span>
        <h4>
          Eye color: <span>{result.eye_color}</span>
        </h4>
        <h4>
          Birth year: <span>{result.birth_year}</span>
        </h4>
      </fieldset>
    );
  });

  function removeFromFavorite(item) {
    setFav(fav.filter((fav) => fav.name !== item.name));
  }

  function favInit() {
    let obj = {
      name: name,
      birth_year: birth_year,
      eye_color: eye_color,
    };
    addToFavorite(obj);
    const el = document.getElementById("add-section");
    $(el).slideToggle();
  }

  const favs = fav.map((item) => {
    return (
      <fieldset id="fav-war-box" key={item.name}>
        <legend>{item.name}</legend>
        <span id="favo" onClick={() => removeFromFavorite(item)}>
          ❌
        </span>
        <h4>
          Eye color: <span>{item.eye_color}</span>
        </h4>
        <h4>
          Birth year: <span>{item.birth_year}</span>
        </h4>
      </fieldset>
    );
  });

  function handleToggle() {
    const el = document.getElementById("add-section");
    $(el).slideToggle();
  }

  return (
    <div className="container">
      <section className="search-box">
        <div id="logo">
          <img id="add-icon" src={LogoIcon} alt=""></img>
        </div>
        <div id="sub">
          <abbr title="type minimum 3 charachters">
            <input
              id="txt"
              value={inputString}
              onChange={(event) =>
                setInputString(event.target.value.toLowerCase())
              }
              type="search"
              placeholder="Enter valid search text"
            />
          </abbr>
          <button id="btn" onClick={getWars}>
            Search
          </button>
        </div>
        <span onClick={handleToggle}>
          <abbr title="Click to add your favorite"><img alt="" id="add-icon" src={AddIcon}></img></abbr>
        </span>
      </section>

      <div id="add-section">
        <table width="300">
          <caption>
            <h3 className="topic">Add your favorite starwar</h3>
          </caption>
          <tr>
            <td>Name: </td>
            <td>
              <input
                type="text"
                required
                onChange={(event) => setName(event.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Birth year: </td>
            <td>
              <input
                type="text"
                required
                onChange={(event) => setBirthYear(event.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Eye Color: </td>
            <td>
              <input
                type="text"
                required
                onChange={(event) => setEyeColor(event.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                id="submit-btn"
                onClick={favInit}
                disabled={name === "" || eye_color === "" || birth_year === ""}
              >
                Add
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div className="list-container">
        <div>
          <h2 className="topic">Main list</h2>
          {elmentsList}
        </div>
        <div>
          <h2 className="topic">Favorites list</h2>
          <div id="fav-reverse">{favs}</div>
        </div>
      </div>
    </div>
  );
};

export default API;
