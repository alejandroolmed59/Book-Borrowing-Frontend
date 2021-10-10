import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BooksTable from './components/BooksTable'
import ModalBorrow from './components/ModalBorrow'
import {Alert} from 'antd' 

function App() {
  const [booksArr, setBooksArr] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [modal, showModal] = useState(false);
  const [alert, showAlert] = useState([false, <></>]);

  async function fetchBooks() {
    let response = await axios.get("http://localhost:8081/v1/book/");
    response = await response.data;
    setBooksArr(response);
  }

  useEffect(() => {  
    fetchBooks();
    //eslint-disable-next-line
  }, [alert]);

  const borrowBook = (ISBN) =>{
    setIsbn(ISBN)
    showModal(true)
  }
  const closeModal=()=>{
    showModal(false)
  }
  const confirmBorrow = async(isbn, userId)=>{
    showModal(false)
    let response = await axios.post("http://localhost:8081/v1/borrow/borrow", {
      "bookObj": {
        "bookISBN": isbn,
      },
      "userObj": {
        "userId": userId,
      },
    });
    let alertMood;
    if(response.status===201){
       alertMood = <Alert message="Book borrowed succesfully!!" type="success" closable />
    }else{
       alertMood = <Alert message="An error while borrowing has ocurred" type="error" closable />
    }
    showAlert([true, alertMood]);
    setInterval(() => {
      showAlert(false)
    }, 5000);
  }

  return (
    <div className="App">
      <body>
          {alert[0]&&alert[1]}
          <BooksTable rawBooks={booksArr} borrowBook={borrowBook}/>
          <ModalBorrow visible={modal} isbn={isbn} closeModal={closeModal} confirmBorrow={confirmBorrow}/>
      </body>
    </div>
  );
}

export default App;
