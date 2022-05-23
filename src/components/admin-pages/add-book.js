import React, { Component } from 'react'
import axios from 'axios'

export default class AddBook extends Component {
    constructor(){
        super()

        this.state = {
            title: '',
            author: '',
            genre: '',
            price: '',
            summary: '',
            img: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.addBook = this.addBook.bind(this)
    }

    addBook(event) {
        axios.post('http://127.0.0.1:5000/book/add', {
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre,
            price: this.state.price,
            img: this.state.img,
            summary: this.state.summary
        })
        .then(res => {
            console.log(res)
            this.setState({
                title: '',
                author: '',
                genre: '',
                price: '',
                summary: '',
                img: ''
            })
        })
        .catch(error => {
            console.log(error)
        })
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.addBook} className='form-wrapper'>
                    <input type="text" name='title' placeholder='Title' value={this.state.title} onChange={this.handleChange} />
                    <input type="text" name='author' placeholder='Author' value={this.state.author} onChange={this.handleChange} />
                    <input type="text" name='genre' placeholder='Genre' value={this.state.genre} onChange={this.handleChange} />
                    <input type="text" name='price' placeholder='Price' value={this.state.price} onChange={this.handleChange} />
                    <input type="text" name='img' placeholder='Image URL' value={this.state.img} onChange={this.handleChange} />
                    <textarea type='text' placeholder='Summary' name="summary" value={this.state.summary} onChange={this.handleChange}></textarea>
                    <button className='btn'>Save</button>
                </form>
            </div>
        )
    }
}