import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
        this.getBooks = this.getBooks.bind(this)
    }

    getBooks() {
        axios.get('https://svp-capstone-back.herokuapp.com/books/get')
        .then(response =>{
            this.setState({
                books: response.data
            })
    
        })
        .catch(error =>{
            console.log(error)
        })
    }

    componentDidMount() {
        this.getBooks()
        this.setState({
            books: this.props.books
        })
      }

    mapBooks() {
        return this.state.books.map(book => {
            book['quanity'] = 0
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