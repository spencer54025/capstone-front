import React, { Component } from 'react'
import { v4 } from 'uuid'


export default class Cart extends Component {
    constructor(props){
        super(props)

        this.state = {
            subTotal: 0,
            cartItemNumber: 0
        }

        this.mapCartItems = this.mapCartItems.bind(this)
        this.getSubTotal = this.getSubTotal.bind(this)
    }

    componentDidMount() {
        this.getSubTotal()
        this.mapCartItems()
    }

    getSubTotal() {
        let priceOfBooks = 0
        this.props.cart.forEach(book => {
            priceOfBooks = priceOfBooks + book.price
        })   
        this.setState({
            subTotal: priceOfBooks
        })
    }

    mapCartItems() {
        return this.props.cart.map(cartItem => {
            var key = v4()
            cartItem['key'] = key
            return(
                <div key={cartItem.key}>
                    <span>{cartItem.title}</span>
                    <span>{cartItem.price}</span>
                    <button onClick={() => this.props.removeItem(cartItem)}>Remove</button>
                </div>
            )
        })
    }


    render(){
        const tax = this.state.subTotal * .08
        var shipping = 0
        {this.state.subTotal > 35 || this.state.subTotal === 0 ? shipping = 0 : shipping = 5.99}
        const total = (this.state.subTotal + shipping + tax).toFixed(2)
        return(
            <div className='cart-wrapper'>
                <div className='left-side'>
                    {this.mapCartItems()}
                </div>
                <div className='right-side'>
                    <span>subtotal: ${this.state.subTotal.toFixed(2)}</span>
                    <span>tax: ${tax.toFixed(2)}</span> 
                    <span>shipping: ${shipping}</span>
                    <span>total: ${total}</span>
                </div>
            </div>
        )
    }
}