import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'


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
    }

    getSubTotal() {
        this.props.cart.forEach(book => {
            this.setState({
                subTotal: this.state.subTotal + book.price
            })
        })   
    }

    mapCartItems() {
        return this.props.cart.map(cartItem => {
            return(
                <div key={cartItem.id}>
                    <span>{cartItem.title}</span>
                    <span>{cartItem.price}</span>
                    <button onClick={() => this.props.removeItem(cartItem)}>Remove</button>
                </div>
            )
        })
    }


    render(){
        return(
            <div className='cart-wrapper'>
            <div className='left-side'>
                {this.mapCartItems()}
            </div>
            <div className='right-side'>
               <span>subtotal: {this.state.subTotal}</span>
            </div>
            </div>
        )
    }
}