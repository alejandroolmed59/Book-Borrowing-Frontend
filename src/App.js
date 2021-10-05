import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [bedTypesArr, setBedTypesArr] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get(
        "http://localhost:8080/v1/bedTypes/bedTypes2"
      );
      response = await response.data;
      setBedTypesArr(response);
    }
    fetchMyAPI();
    console.log(bedTypesArr.toString());
  //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {bedTypesArr.map((el, id) => {
            return (
              <li key={id}>
                <h1>{el.name}</h1>
                <h1>{el.size}</h1>
              </li>
            );
          })}
        </ul>
        Learn React
      </header>
    </div>
  );
}

export default App;
