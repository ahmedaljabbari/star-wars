import {React, Component} from "react";
import API from "./components/API";
import './App.css';

class App extends Component{

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <API /> 
        </header>
      </div>
    );
  }
}

export default App;
