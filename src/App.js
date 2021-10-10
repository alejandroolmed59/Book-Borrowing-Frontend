import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BooksTable from './components/BooksTable'

function App() {
  const [booksArr, setBooksArr] = useState([]);
  const [updated, setUpdated] = useState(0);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get("http://localhost:8081/v1/book/");
      response = await response.data;
      setBooksArr(response);
    }
    fetchMyAPI();
    //eslint-disable-next-line
  }, [updated]);
  const borrowBook = (ISBN) =>{
    console.log("callback: "+ISBN);
  }
/*
  const postReservation = async () => {
    let response = await axios.post("http://localhost:8081/v1/borrow/testis", {
      "bookObj": {
        "bookISBN": "0192861891",
      },
      "userObj": {
        "userId": "00032104",
      },
    });
    console.log(response)
    setUpdated(val=>val++)
  };*/

  return (
    <div className="App">
      <body>  
          <BooksTable rawBooks={booksArr} borrowBook={borrowBook}/>
      </body>
    </div>
  );
}

export default App;
