import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'


export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
        this.getBooks = this.getBooks.bind(this)
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks() {
        axios.get('http://127.0.0.1:5000/books/get')
        .then(response =>{
            this.setState({
                books: response.data
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    mapBooks() {
        return this.state.books.map(book => {
            return (
                <div className='book-wrapper' key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        <span>{book.title}</span>
                    </Link>
                    <img src={book.img} style={{ height: '150px', width: "110px"}} />
                    <span>{book.author}</span>
                    <span>${book.price}</span>
                </div>
            )
        })
    }


    render(){
        return (
            <div className='homepage-wrapper'>
                {this.mapBooks()}
            </div>
        )
    }
}