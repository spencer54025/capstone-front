import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-popup-alert'

export default class BookDetail extends Component {
    constructor(props){
        super(props)

        this.state ={
            book: {},
            setAlert: false,
            header: "added to cart"
        }


        this.getBook = this.getBook.bind(this)
        this.onCloseAlert = this.onCloseAlert.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    addToCart(book){
        if(this.props.cart.includes(book)){
            this.setState({
                header: 'that is already in your cart'
            })
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
            text: 'Added to Cart',
            setAlert: true,
        })
    }
    

    getBook() {
        axios.get(`http://127.0.0.1:5000/book/get/${this.props.match.params.slug}`)
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
            <div className='book-detail-wrapper'>
                <h1>{title}</h1>
                <h3>by: {author}</h3>
                <img src={img} />
                <h2>${price}</h2>
                <button onClick={() => {
                this.openAlert(),
                this.addToCart(this.state.book)}
                }
                >add to cart</button>
                <h2>{genre}</h2>
                <span>{summary}</span>
                <div>
                <Alert 
                    header={this.state.header}
                    btnText='OK'
                    show={this.state.setAlert}
                    onClosePress={() => this.onCloseAlert()}                
                />
                </div>

            </div>    
        )
    }

}