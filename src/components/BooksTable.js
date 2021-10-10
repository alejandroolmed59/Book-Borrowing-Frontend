import React from 'react'
import {Table, Tag, Button} from 'antd'

const BooksTable = ({rawBooks, borrowBook}) => {

    const dataSource = rawBooks.map(book=>{
        return {
            "key":book.bookISBN,
            "isbn":book.bookISBN,
            "title":book.title,
            "year":book.year,
            "author":book.author,
            "genre":book.genreObj.genreType,
            "available":book.available
        }
    })
    const columns = [
        {
          title: 'ISBN',
          dataIndex: 'isbn'
        },
        {
          title: 'Titulo',
          dataIndex: 'title'
        },
        {
            title: 'Year',
            dataIndex: 'year'
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
        {
            title: 'Available?',
            dataIndex:'available',
            render: (available, record, index)=>(
                <>
                    {available?(
                        <Tag color="green">DISPONIBLE</Tag>
                    ):(
                        <Tag color="red">NO DISPONIBLE</Tag>
                    )}
                </>
            ),
            
        },
        {
            title: 'Borrow',
            dataIndex:'borrow',
            render:(text, record, index)=>{
                const estado = record.available; 
                return(
                    <Button type='primary' disabled={!estado} onClick={()=>borrowBook(record.isbn)}>Prestar {record.title}</Button>
                )
            }
        }

      ];

    return (
        <Table dataSource={dataSource} columns={columns}/>
    )
}

export default BooksTable

