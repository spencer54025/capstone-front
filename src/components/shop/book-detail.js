import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-popup-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

export default class BookDetail extends Component {
    constructor(props){
        super(props)

        this.state ={
            book: {},
            setAlert: false,
            header: "added to cart",
            editMode: false,
            title: '',
            author: '',
            genre: '',
            price: '',
            summary: '',
            img: ''
        }


        this.getBook = this.getBook.bind(this)
        this.onCloseAlert = this.onCloseAlert.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.changeToEdit = this.changeToEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    changeToEdit() {
        this.setState({
            editMode: true,
            title: this.state.book.title,
            author: this.state.book.author,
            genre: this.state.book.genre,
            price: this.state.book.price,
            summary: this.state.book.summary,
            img: this.state.book.img
        })
    }

    saveEdit(event){
        axios({
            method: 'PUT',
            url: `https://svp-capstone-back.herokuapp.com/update/book/${this.state.book.id}`,
            data: {
                title: this.state.title,
                summary: this.state.summary,
                author: this.state.author,
                price: this.state.price,
                genre: this.state.genre,
                img: this.state.img,
            }
        })
        .then(res => {
            this.setState({
                editMode: false,
                title: this.state.title,
                author: this.state.author,
                genre: this.state.genre,
                price: this.state.price,
                summary: this.state.summary,
                img: this.state.img
            })
        })
        .catch(err => {
            console.log(err)
        })
        event.preventDefault()
    }


    deleteBook(book){
        axios.delete(`https://svp-capstone-back.herokuapp.com/book/delete/${book.id}`)
        .then(
            this.props.history.push('/')
        )
        .catch(err => {
            console.log(error)
        })
        this.props.removeFromBooks(book)
    }  

    addToCart(book){
        book['quantity'] = 1
        if(this.props.cart.includes(book)){
            book.quantity = book.quantity + 1
        }
        else{
            this.props.addToCart(book)
        }
    }

    onCloseAlert() {
        this.setState({
            setAlert: false,
        })
    }

    openAlert(){
        this.setState({
            setAlert: true
        })
    }

    getBook() {
        axios.get(`https://svp-capstone-back.herokuapp.com/book/get/${this.props.match.params.slug}`)
        .then(res => {
            this.setState({
                book: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getBook()
    }

    render() {
        const {
            id,
            title,
            summary,
            author,
            price,
            img,
            genre
        } = this.state.book

        return (
            <div className='single-book-wrapper'>
            {this.state.editMode === false ?
                <div className='book-detail-wrapper'>
                {this.props.userType === 'admin' ?
                <div>
                    <h1>{title}</h1>
                    <button onClick={() => this.deleteBook(this.state.book)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={() => this.changeToEdit()}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </div>
                :
                <h1>{title}</h1>
                }
                <h3>by: {author}</h3>
                <img src={img} />
                <h2>${price}</h2>
                <button onClick={() => {
                this.openAlert(),
                this.addToCart(this.state.book)}
                }
                >add to cart</button>
                <h2>{genre}</h2>
                <div className='summary-wrapper'>
                    <span>{summary}</span>
                </div>
                <div>
                <Alert 
                    header={this.state.header}
                    btnText='OK'
                    show={this.state.setAlert}
                    onClosePress={() => this.onCloseAlert()}                
                />
                </div>
                </div>
                :
                <div>
                    <form onSubmit={this.saveEdit} className='form-wrapper'>
                        <input type="text" name='title' placeholder='Title' value={this.state.title} onChange={this.handleChange} />
                        <input type="text" name='author' placeholder='Author' value={this.state.author} onChange={this.handleChange} />
                        <input type="text" name='genre' placeholder='Genre' value={this.state.genre} onChange={this.handleChange} />
                        <input type="text" name='price' placeholder='Price' value={this.state.price} onChange={this.handleChange} />
                        <input type="text" name='img' placeholder='Image URL' value={this.state.img} onChange={this.handleChange} />
                        <textarea type='text' placeholder='Summary' name="summary" value={this.state.summary} onChange={this.handleChange}></textarea>
                        <button className='btn'>Save</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}