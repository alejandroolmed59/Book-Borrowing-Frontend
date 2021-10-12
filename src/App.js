import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BooksTable from './components/BooksTable'
import ModalBorrow from './components/ModalBorrow'
import {message, Layout} from 'antd' 

function App() {
  const [booksArr, setBooksArr] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [modal, showModal] = useState(false);
  const [alert, showAlert] = useState(false);

  async function fetchBooks() {
    let response = await axios.get("http://localhost:8081/v1/book/");
    response = await response.data;
    setBooksArr(response);
  }

  useEffect(() => {  
    fetchBooks();
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
    try{
      let response = await axios.post("http://localhost:8081/v1/borrow/borrow", {
        "bookObj": {
          "bookISBN": isbn,
        },
        "userObj": {
          "userId": userId,
        },
      });
      if(response.status=== 200 || response.status===201){
        message.success("Book borrowed succesfully!!")
      }
    }catch(e){
      message.error("Couldn't borrow, either book is borrowed, or max books per user has been reached")
    }
    showAlert(!alert);
  }

  return (
    <div className="App">
      <body>
          <h1 style={{marginTop:'4rem'}}>Book borrow API DEMO</h1>
          <BooksTable rawBooks={booksArr} borrowBook={borrowBook}/>
          <ModalBorrow visible={modal} isbn={isbn} closeModal={closeModal} confirmBorrow={confirmBorrow}/>
          <Layout.Footer style={{ position:'fixed', bottom:0,width:'100%', textAlign: "center" }}>
                Application Design project- Alejandro Olmedo
              </Layout.Footer>
      </body>
    </div>
  );
}

export default App;
