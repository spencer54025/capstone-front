import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'


export default class Cart extends Component {
    constructor(props){
        super(props)

        this.state = {
            subTotal: 0,
            tax: 0,
            total: 0,
            localCart: []
        }

        this.mapCartItems = this.mapCartItems.bind(this)
        this.getSubTotal = this.getTotal.bind(this)
    }

    componentDidMount() {
        this.mapCartItems()
        this.getTotal()
        this.setState({
            cart: this.props.cart
        })
    }

    componentDidUpdate() {
        if(this.state.localCart != this.props.cart){
            this.getTotal()
            this.setState({
                localCart: this.props.cart
            })
        }
    }

    getTotal() {
        let priceOfBooks = 0
        this.props.cart.forEach(book => {
            priceOfBooks = priceOfBooks + book.price
        })
        if(priceOfBooks > 35 || priceOfBooks == 0){   
            this.setState({
                subTotal: priceOfBooks,
                tax: priceOfBooks * .08,
                shipping: 0,
                total: (priceOfBooks + (priceOfBooks * .08)).toFixed(2)
            })
        }
        else{
            this.setState({
                subTotal: priceOfBooks,
                tax: priceOfBooks * .08,
                shipping: 5.99,
                total: (priceOfBooks + 5.99 + (priceOfBooks * .08)).toFixed(2)
            })
        }
    }

    mapCartItems() {
        return this.props.cart.map(cartItem => {
            return(
                <div className='cart-item-wrapper' key={cartItem.key}>
                <div className='title-price-wrapper'>
                    <span>{cartItem.title}</span>
                    <br></br>
                    <span>{cartItem.price}</span>
                </div>
                    <button onClick={() => {
                        this.props.removeItem(cartItem)
                    }}>Remove</button>
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
                    <div className='cart-details-wrapper'>
                        <span>subtotal: ${this.state.subTotal.toFixed(2)}</span>
                        <span>tax: ${this.state.tax.toFixed(2)}</span> 
                        <span>shipping: ${this.state.shipping}</span>
                        <span>total: ${this.state.total}</span>
                        {this.state.total > 0 ?
                        <div className='checkout-wrapper'>
                            <Link to='/checkout'>
                                <button onClick={() => this.props.clearCart()}>Place Order</button>
                            </Link>
                        </div>
                        :
                        null
                        }
                    </div>

                </div>
            </div>
        )
    }
}